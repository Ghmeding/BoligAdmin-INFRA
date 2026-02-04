import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";
import { VpcLink } from "aws-cdk-lib/aws-apigatewayv2";
import { SecurityGroup, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class NetworkStack extends Stack {
  public readonly vpc: Vpc;
  public readonly vpcLink: VpcLink;
  public readonly vpcLinkSecurityGroup: SecurityGroup;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create VPC that will be shared between  and Fargate
    this.vpc = new Vpc(this, "SharedVpc", {
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        {
          name: "public",
          subnetType: SubnetType.PUBLIC,
        },
        {
          name: "private",
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          name: "isolated",
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    this.vpcLinkSecurityGroup = new SecurityGroup(this, "VpcLinkSg", {
      vpc: this.vpc,
      description: "Security group for API Gateway VPC Link",
      allowAllOutbound: true, 
    });

    this.vpcLink = new VpcLink(this, 'AlbVpcLink', {
      vpc: this.vpc,
      securityGroups: [this.vpcLinkSecurityGroup], 
      subnets: {
        subnetType: SubnetType.PRIVATE_WITH_EGRESS 
      }
    });

    // Output the VPC ID for cross-stack references
    new CfnOutput(this, "VpcId", {
      value: this.vpc.vpcId,
      exportName: "SharedVpcId",
    });
  }
}
