import { Stack, StackProps } from "aws-cdk-lib";
import { Function } from 'aws-cdk-lib/aws-lambda';
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
export interface ApiGatewayStackProps extends StackProps {
    myLambda: Function;
}
export declare class ApiGatewayStack extends Stack {
    readonly vpc: Vpc;
    constructor(scope: Construct, id: string, props: ApiGatewayStackProps);
}
