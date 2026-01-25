import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Architecture, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { GoFunction } from '@aws-cdk/aws-lambda-go-alpha';
export class LambdaStack extends Stack {
    public readonly myLambda: Function;
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.myLambda = new GoFunction(this, "MyLambda", {
            entry: 'lambdas',
            architecture: Architecture.ARM_64,
            runtime: Runtime.PROVIDED_AL2023,
        });
    }
}