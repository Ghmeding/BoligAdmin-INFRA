import { App } from "aws-cdk-lib";
import { RdsStack } from "../lib/rds-stack";
import { EcsStack } from "../lib/ecs-stack";
import { NetworkStack } from "../lib/network-stack";
import { AlbStack } from "../lib/alb-stack";
import { EcrStack } from "../lib/ecr-stack";
import { ApiGatewayStack } from "../lib/api-gateway-stack";

import { CognitoStack } from "../lib/cognito-stack";
import { LambdaStack } from "../lib/lambda-stack";
import { BaCoreFargateServicestack } from "../lib/ba-core-fargateservice-stack";

const app = new App();

const ecrStack = new EcrStack(app, "EcrStack");
const networkStack = new NetworkStack(app, "NetworkStack");
const rdsStack = new RdsStack(app, "RdsStack", {
    vpc: networkStack.vpc
});

const ecsStack = new EcsStack(app, "EcsStack", {
    vpc: networkStack.vpc
});

const albStack = new AlbStack(app, "AlbStack", {
    vpc: networkStack.vpc,
    vpcLinkSecurityGroup: networkStack.vpcLinkSecurityGroup
});

const baCoreFargateServiceStack = new BaCoreFargateServicestack(app, "BaCoreFargateServicestack", {
      vpc: networkStack.vpc,
      ecrRepository: ecrStack.baCoreEcrRepository,
      cluster: ecsStack.cluster,
      dbSecret: rdsStack.dbSecret,
      loadBalancer: albStack.loadBalancer,
      targetGroup: albStack.coreTargetGroup,
      securityGroup: albStack.albSecurityGroup,
});

const lambdaStack = new LambdaStack(app, "LambdaStack");

// const cognitoStack = new CognitoStack(
//     app,
//     "BoligAdminCognitoStack",
// );
    
const apiGatewayStack = new ApiGatewayStack(app, "ApiGatewayStack", {
    myLambda: lambdaStack.myLambda,
    loadBalancer: albStack.loadBalancer,
    vpcLink: networkStack.vpcLink
});

rdsStack.addDependency(networkStack);
ecsStack.addDependency(networkStack);
albStack.addDependency(networkStack);
apiGatewayStack.addDependency(networkStack);
apiGatewayStack.addDependency(albStack);










