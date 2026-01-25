import { Duration, Fn, Stack, StackProps } from "aws-cdk-lib";
import {
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
} from "aws-cdk-lib/aws-ecs";
import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { ISecret, Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { Secret as EcsSecret } from "aws-cdk-lib/aws-ecs";

export interface BaCoreFargateServiceStack extends StackProps {
  vpc: Vpc;
  ecrRepository: IRepository;
  cluster: ICluster;
  dbSecret: ISecret;
  // loadBalancer: IApplicationLoadBalancer;
  // targetGroup: IApplicationTargetGroup;
  // albSecurityGroup: ISecurityGroup;
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
      memoryLimitMiB: 512,
      cpu: 256,
    });

    // Create security group for Fargate tasks
    const fargateServiceSg = new SecurityGroup(this, 'FargateServiceSG', {
        vpc: vpc,
        description: 'Security group for Fargate Service',
        allowAllOutbound: true
    });

    // // Allow inbound port 8080 from ALB security group
    // fargateServiceSg.addIngressRule(
    //     Peer.securityGroupId(props.albSecurityGroup.securityGroupId),
    //     Port.tcp(8080),
    //     'Allow ALB health check and traffic'
    // );

    // Allow inbound from VPC for internal service-to-service calls
    fargateServiceSg.addIngressRule(
        Peer.ipv4(props.vpc.vpcCidrBlock),
        Port.tcp(8080),
        'Allow internal VPC traffic for service-to-service calls'
    );

    const container = taskDef.addContainer("AppContainer", {
      image: ContainerImage.fromEcrRepository(props.ecrRepository),
      memoryLimitMiB: 512,
      cpu: 256,
      //TODO: insert secrets dynamically
      secrets: {
        SPRING_DATASOURCE_URL: EcsSecret.fromSecretsManager(props.dbSecret, 'host'),
        SPRING_DATASOURCE_USERNAME: EcsSecret.fromSecretsManager(
          props.dbSecret,
          "username",
        ),
        SPRING_DATASOURCE_PASSWORD: EcsSecret.fromSecretsManager(
          props.dbSecret,
          "password",
        ),
      },
      healthCheck: {
        command: [
          "CMD-SHELL",
          "wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1",
        ],
        interval: Duration.seconds(30),
        timeout: Duration.seconds(10),
        retries: 3,
        startPeriod: Duration.seconds(90),
      },
    });

    const service = new FargateService(this, "Service", {
      cluster: cluster, 
      taskDefinition: taskDef,
      desiredCount: 1, 
      assignPublicIp: false, 
      securityGroups: [fargateServiceSg], 
    });
  }
}
