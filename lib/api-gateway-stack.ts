import { Stack, StackProps } from "aws-cdk-lib";
import { Function } from 'aws-cdk-lib/aws-lambda';
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { CognitoUserPoolsAuthorizer, Cors, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

export interface ApiGatewayStackProps extends StackProps {
  myLambda: Function;
}

export class ApiGatewayStack extends Stack {

  public readonly vpc: Vpc;

  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const restApi = new RestApi(this, "BoligAdminApiGateway", {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token'],
        allowCredentials: true,
      }
    });

    const integration = new LambdaIntegration(props.myLambda) // go function here
    const testResource = restApi.root.addResource("test");
    testResource.addMethod("GET", integration)


    // const albIntegration = new AlbIntegration("AlbIntegration", props.albListener, {
    //   vpcLink: props.vpcLink
    // });

    // // Create Cognito Authorizer
    // const auth = new CognitoUserPoolsAuthorizer(this, 'CognitoAuthorizer', {
    //   cognitoUserPools: [props.userPool]
    // });
  }
}
