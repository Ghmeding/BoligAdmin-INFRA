"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_apigatewayv2_1 = require("aws-cdk-lib/aws-apigatewayv2");
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
class NetworkStack extends aws_cdk_lib_1.Stack {
    vpc;
    vpcLink;
    constructor(scope, id, props) {
        super(scope, id, props);
        // Create VPC that will be shared between Redis and Fargate
        this.vpc = new aws_ec2_1.Vpc(this, "SharedVpc", {
            maxAzs: 2,
            natGateways: 1,
            subnetConfiguration: [
                {
                    name: 'public',
                    subnetType: aws_ec2_1.SubnetType.PUBLIC
                },
                {
                    name: 'private',
                    subnetType: aws_ec2_1.SubnetType.PRIVATE_WITH_EGRESS
                },
                {
                    name: 'isolated',
                    subnetType: aws_ec2_1.SubnetType.PRIVATE_ISOLATED
                }
            ]
        });
        this.vpcLink = new aws_apigatewayv2_1.VpcLink(this, 'AlbVpcLink', {
            vpc: this.vpc
        });
        // Output the VPC ID for cross-stack references
        new aws_cdk_lib_1.CfnOutput(this, 'VpcId', {
            value: this.vpc.vpcId,
            exportName: 'SharedVpcId'
        });
    }
}
exports.NetworkStack = NetworkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5ldHdvcmstc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQTJEO0FBQzNELG1FQUF1RDtBQUN2RCxpREFBc0Q7QUFHdEQsTUFBYSxZQUFhLFNBQVEsbUJBQUs7SUFDckIsR0FBRyxDQUFNO0lBQ1QsT0FBTyxDQUFVO0lBRWpDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsMkRBQTJEO1FBQzNELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxhQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUNwQyxNQUFNLEVBQUUsQ0FBQztZQUNULFdBQVcsRUFBRSxDQUFDO1lBQ2QsbUJBQW1CLEVBQUU7Z0JBQ25CO29CQUNJLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRSxvQkFBVSxDQUFDLE1BQU07aUJBQ2hDO2dCQUNEO29CQUNJLElBQUksRUFBRSxTQUFTO29CQUNmLFVBQVUsRUFBRSxvQkFBVSxDQUFDLG1CQUFtQjtpQkFDN0M7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLFVBQVUsRUFBRSxvQkFBVSxDQUFDLGdCQUFnQjtpQkFDMUM7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSwwQkFBTyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDN0MsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsK0NBQStDO1FBQy9DLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQzNCLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUs7WUFDckIsVUFBVSxFQUFFLGFBQWE7U0FDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBckNELG9DQXFDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBDZm5PdXRwdXQgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBWcGNMaW5rIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXl2Mic7XG5pbXBvcnQgeyBTdWJuZXRUeXBlLCBWcGMgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWMyJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5leHBvcnQgY2xhc3MgTmV0d29ya1N0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBwdWJsaWMgcmVhZG9ubHkgdnBjOiBWcGM7XG4gIHB1YmxpYyByZWFkb25seSB2cGNMaW5rOiBWcGNMaW5rO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gQ3JlYXRlIFZQQyB0aGF0IHdpbGwgYmUgc2hhcmVkIGJldHdlZW4gUmVkaXMgYW5kIEZhcmdhdGVcbiAgICB0aGlzLnZwYyA9IG5ldyBWcGModGhpcywgXCJTaGFyZWRWcGNcIiwge1xuICAgICAgbWF4QXpzOiAyLFxuICAgICAgbmF0R2F0ZXdheXM6IDEsXG4gICAgICBzdWJuZXRDb25maWd1cmF0aW9uOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdwdWJsaWMnLFxuICAgICAgICAgICAgc3VibmV0VHlwZTogU3VibmV0VHlwZS5QVUJMSUNcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3ByaXZhdGUnLFxuICAgICAgICAgICAgc3VibmV0VHlwZTogU3VibmV0VHlwZS5QUklWQVRFX1dJVEhfRUdSRVNTXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdpc29sYXRlZCcsXG4gICAgICAgICAgICBzdWJuZXRUeXBlOiBTdWJuZXRUeXBlLlBSSVZBVEVfSVNPTEFURURcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgdGhpcy52cGNMaW5rID0gbmV3IFZwY0xpbmsodGhpcywgJ0FsYlZwY0xpbmsnLCB7XG4gICAgICB2cGM6IHRoaXMudnBjXG4gICAgfSk7XG5cbiAgICAvLyBPdXRwdXQgdGhlIFZQQyBJRCBmb3IgY3Jvc3Mtc3RhY2sgcmVmZXJlbmNlc1xuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ1ZwY0lkJywge1xuICAgICAgdmFsdWU6IHRoaXMudnBjLnZwY0lkLFxuICAgICAgZXhwb3J0TmFtZTogJ1NoYXJlZFZwY0lkJ1xuICAgIH0pO1xuICB9XG59XG4iXX0=