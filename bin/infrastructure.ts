#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { RdsStack } from "../lib/rds-stack";
import { EcsStack } from "../lib/ecs-stack";
import { NetworkStack } from "../lib/network-stack";
import { AlbStack } from "../lib/alb-stack";
import { EcrStack } from "../lib/ecr-stack";
import { ApiGatewayStack } from "../lib/api-gateway-stack";

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
    vpc: networkStack.vpc
});

const apiGatewayStack = new ApiGatewayStack(app, "ApiGatewayStack", {
    vpcLink: networkStack.vpcLink,
    albListener: albStack.loadBalancerListener
});

rdsStack.addDependency(networkStack);
ecsStack.addDependency(networkStack);
albStack.addDependency(networkStack);
apiGatewayStack.addDependency(networkStack);
apiGatewayStack.addDependency(albStack);









