import { CfnOutput, Stack, RemovalPolicy, StackProps, SecretValue, Duration } from 'aws-cdk-lib';
import { Vpc, SecurityGroup, Port, Peer, SubnetType, InstanceType, InstanceClass, InstanceSize } from 'aws-cdk-lib/aws-ec2';
import { DatabaseInstance, DatabaseInstanceEngine, Credentials, PostgresEngineVersion } from 'aws-cdk-lib/aws-rds';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export interface RdsStackProps extends StackProps {
    vpc: Vpc;
}

export class RdsStack extends Stack {

    public readonly dbSecret: ISecret;
    
    constructor(scope: Construct, id: string, props: RdsStackProps) {
        super(scope, id, props);

        const vpc = props.vpc;
        const engine = DatabaseInstanceEngine.postgres({ version: PostgresEngineVersion.VER_16 });
        const instanceType = InstanceType.of(InstanceClass.T3, InstanceSize.MICRO);
        const port = 5432;
        const dbName = "BA_CORE_DB";
        const credentials = Credentials.fromGeneratedSecret('ba_admin');

        const dbSg = new SecurityGroup(this, 'RdsSecurityGroup', {
            securityGroupName: "BA_CORE_DB_SG",
            vpc: vpc
        });


        dbSg.addIngressRule(
            Peer.ipv4(vpc.vpcCidrBlock),
            Port.tcp(port),
            `Allow port ${port} for database connection from only within the VPC (${vpc.vpcId})`
        );

        // create RDS instance (PostgreSQL)
        const db = new DatabaseInstance(this, "ba_core_db", {
            vpc: vpc,
            vpcSubnets: { subnetType: SubnetType.PRIVATE_ISOLATED },
            instanceType,
            engine,
            port,
            securityGroups: [dbSg],
            databaseName: dbName,
            credentials: credentials,
            backupRetention: Duration.days(0),
            deleteAutomatedBackups: true,
            removalPolicy: RemovalPolicy.DESTROY
        });

        this.dbSecret = db.secret!;

        new CfnOutput(this, 'BA_CORE_DB_ENDPOINT', {
            value: db.dbInstanceEndpointAddress,
            description: 'Database endpoint (host)'
        });

        new CfnOutput(this, 'BA_CORE_DB_PORT', {
            value: db.dbInstanceEndpointPort,
            description: 'Database port'
        });

        new CfnOutput(this, 'BA_CORE_VPC', {
            value: vpc.vpcArn,
            description: 'VPC ARN'
        });
    }
}
