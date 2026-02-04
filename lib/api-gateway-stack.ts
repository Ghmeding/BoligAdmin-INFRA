import { Stack, StackProps } from "aws-cdk-lib";
import { Function } from "aws-cdk-lib/aws-lambda";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { ApplicationLoadBalancer } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { HttpApi, HttpMethod, VpcLink } from "aws-cdk-lib/aws-apigatewayv2";
import { HttpAlbIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";

export interface ApiGatewayStackProps extends StackProps {
  myLambda: Function;
  loadBalancer: ApplicationLoadBalancer;
  vpcLink: VpcLink;
}

export class ApiGatewayStack extends Stack {
  public readonly vpc: Vpc;

  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    const httpApi = new HttpApi(this, "BoligAdminHttpApi");

    const albIntegration = new HttpAlbIntegration(
      "AlbIntegration",
      props.loadBalancer.listeners[0],
      {
        vpcLink: props.vpcLink
      }
    );

    httpApi.addRoutes({
      path: "/{proxy+}",
      methods: [HttpMethod.ANY],
      integration: albIntegration,
    });
  }
}
