import { Stack, StackProps } from 'aws-cdk-lib';
import { VpcLink } from 'aws-cdk-lib/aws-apigatewayv2';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
export declare class NetworkStack extends Stack {
    readonly vpc: Vpc;
    readonly vpcLink: VpcLink;
    constructor(scope: Construct, id: string, props?: StackProps);
}
