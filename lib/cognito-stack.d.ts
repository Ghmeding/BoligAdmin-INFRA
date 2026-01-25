import { Stack, StackProps } from "aws-cdk-lib";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
export declare class CognitoStack extends Stack {
    readonly userPool: UserPool;
    readonly userPoolClient: UserPoolClient;
    constructor(scope: Construct, id: string, props?: StackProps);
}
