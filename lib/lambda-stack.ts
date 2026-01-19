import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
 
export class LambdaStack extends Stack {
    public readonly myLambda: Function;
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.myLambda = new Function(this, "MyLambda", {
            code: Code.fromAsset("lambdas"),
            handler: "main",
            runtime: Runtime.PROVIDED_AL2023
        })
    }
}