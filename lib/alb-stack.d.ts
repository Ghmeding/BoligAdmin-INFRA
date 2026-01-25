import { Stack, StackProps } from "aws-cdk-lib";
import { IVpc, SecurityGroup } from "aws-cdk-lib/aws-ec2";
import { ApplicationListener, ApplicationLoadBalancer, ApplicationTargetGroup } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Construct } from "constructs";
export interface LoadBalancerStackProps extends StackProps {
    vpc: IVpc;
}
export declare class AlbStack extends Stack {
    readonly loadBalancer: ApplicationLoadBalancer;
    readonly loadBalancerListener: ApplicationListener;
    readonly authTargetGroup: ApplicationTargetGroup;
    readonly coreTargetGroup: ApplicationTargetGroup;
    readonly albSecurityGroup: SecurityGroup;
    constructor(scope: Construct, id: string, props: LoadBalancerStackProps);
}
