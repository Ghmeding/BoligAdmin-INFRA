import { Duration, Fn, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import {
    ISecurityGroup,
  Peer,
  Port,
  SecurityGroup,
  Vpc,
} from "aws-cdk-lib/aws-ec2";
import { IRepository } from "aws-cdk-lib/aws-ecr";
import {
  ContainerImage,
  FargateService,
  FargateTaskDefinition,
  ICluster,
  LogDriver,
  LogDrivers,
} from "aws-cdk-lib/aws-ecs";
import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { ISecret, Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { Secret as EcsSecret } from "aws-cdk-lib/aws-ecs";
import { IApplicationLoadBalancer, IApplicationTargetGroup } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";

export interface BaCoreFargateServiceStack extends StackProps {
  vpc: Vpc;
  ecrRepository: IRepository;
  cluster: ICluster;
  dbSecret: ISecret;
  loadBalancer: IApplicationLoadBalancer;
  targetGroup: IApplicationTargetGroup;
  securityGroup: ISecurityGroup;
}

export class BaCoreFargateServicestack extends Stack {
  constructor(scope: Construct, id: string, props: BaCoreFargateServiceStack) {
    super(scope, id, props);

    const cluster = props.cluster;
    const vpc = props.vpc;

    // TASK IAM ROLE
    const executionRole = new Role(this, "FargateExecutionRole", {
      assumedBy: new ServicePrincipal("ecs-tasks.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AmazonECSTaskExecutionRolePolicy",
        ),
      ],
    });

    // TASK DEFINITION
    const taskDef = new FargateTaskDefinition(this, "TaskDef", {
      executionRole: executionRole,
      memoryLimitMiB: 1024,
      cpu: 512,
    });

    // Create security group for Fargate tasks
    const fargateServiceSg = new SecurityGroup(this, 'FargateServiceSG', {
        vpc: vpc,
        description: 'Security group for Fargate Service',
        allowAllOutbound: true
    });

    // Allow inbound port 8080 from ALB security group
    fargateServiceSg.addIngressRule(
        Peer.securityGroupId(props.securityGroup.securityGroupId),
        Port.tcp(8080),
        'Allow ALB health check and traffic'
    );

    // Allow inbound from VPC for internal service-to-service calls
    fargateServiceSg.addIngressRule(
        Peer.ipv4(props.vpc.vpcCidrBlock),
        Port.tcp(8080),
        'Allow internal VPC traffic for service-to-service calls'
    );

    const logGroup = new LogGroup(this, 'AppLogGroup', {
      logGroupName: '/ecs/ba-core-service',
      retention: RetentionDays.ONE_WEEK,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const container = taskDef.addContainer("AppContainer", {
      image: ContainerImage.fromEcrRepository(props.ecrRepository),
      memoryLimitMiB: 1024,
      cpu: 512,
      secrets: {
          SPRING_DATASOURCE_USERNAME: EcsSecret.fromSecretsManager(props.dbSecret, 'username'),
          SPRING_DATASOURCE_PASSWORD: EcsSecret.fromSecretsManager(props.dbSecret, 'password'),
        },
        environment: {
          SPRING_DATASOURCE_URL: `jdbc:postgresql://${props.dbSecret.secretValueFromJson('host').unsafeUnwrap()}:${props.dbSecret.secretValueFromJson('port').unsafeUnwrap()}/${props.dbSecret.secretValueFromJson('dbname').unsafeUnwrap()}`,
          JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || ""
        },
      // healthCheck: {
      //   command: [
      //     "CMD-SHELL",
      //     "wget --no-verbose --tries=1 --spider http://localhost:8080/health/ping || exit 1",
      //   ],
      //   interval: Duration.seconds(30),
      //   timeout: Duration.seconds(10),
      //   retries: 3,
      //   startPeriod: Duration.seconds(90),
      // },
      logging: LogDrivers.awsLogs({
        streamPrefix: 'ba-core',
        logGroup: logGroup
      }),
    });

    // Add port mapping
    container.addPortMappings({
      containerPort: 8080,
    });

    const service = new FargateService(this, "Service", {
      cluster: cluster, 
      taskDefinition: taskDef,
      desiredCount: 1, 
      assignPublicIp: false, 
      securityGroups: [fargateServiceSg], 
      enableExecuteCommand: true
    });
    
    props.targetGroup.addTarget(service);
  }
}
