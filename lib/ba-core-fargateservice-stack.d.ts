import { Stack, StackProps } from "aws-cdk-lib";
import { ISecurityGroup, Vpc } from "aws-cdk-lib/aws-ec2";
import { IRepository } from "aws-cdk-lib/aws-ecr";
import { ICluster } from "aws-cdk-lib/aws-ecs";
import { IApplicationLoadBalancer, IApplicationTargetGroup } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Construct } from "constructs";
export interface BaCoreFargateServiceStack extends StackProps {
    vpc: Vpc;
    ecrRepository: IRepository;
    loadBalancer: IApplicationLoadBalancer;
    targetGroup: IApplicationTargetGroup;
    cluster: ICluster;
    albSecurityGroup: ISecurityGroup;
}
export declare class BaCoreFargateServicestack extends Stack {
    constructor(scope: Construct, id: string, props: BaCoreFargateServiceStack);
}
