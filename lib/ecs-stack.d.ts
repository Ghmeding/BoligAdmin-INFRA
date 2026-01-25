import { Stack, StackProps } from 'aws-cdk-lib';
import { Cluster } from 'aws-cdk-lib/aws-ecs';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
export declare const PREFIX = "BA_AUTH";
export interface EcsStackProps extends StackProps {
    vpc: Vpc;
}
export declare class EcsStack extends Stack {
    readonly cluster: Cluster;
    constructor(scope: Construct, id: string, props: EcsStackProps);
}
