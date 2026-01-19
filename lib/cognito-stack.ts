import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class CognitoStack extends Stack {
  public readonly userPool: UserPool;
  public readonly userPoolClient: UserPoolClient;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id);

    this.userPool = new UserPool(this, "bolig-admin-userpool", {
      userPoolName: "bolig-admin-userpool",
      signInAliases: { email: true },
      selfSignUpEnabled: false,
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    this.userPoolClient = this.userPool.addClient("AppClient", {
        userPoolClientName: "bolig-admin-userpool-client",
      authFlows: { userPassword: true },
    });


  }
}
