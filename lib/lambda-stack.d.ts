import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Function } from "aws-cdk-lib/aws-lambda";
export declare class LambdaStack extends Stack {
    readonly myLambda: Function;
    constructor(scope: Construct, id: string, props?: StackProps);
}
