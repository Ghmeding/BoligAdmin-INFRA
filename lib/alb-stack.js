"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
const aws_elasticloadbalancingv2_1 = require("aws-cdk-lib/aws-elasticloadbalancingv2");
class AlbStack extends aws_cdk_lib_1.Stack {
    loadBalancer;
    loadBalancerListener;
    authTargetGroup;
    coreTargetGroup;
    albSecurityGroup;
    constructor(scope, id, props) {
        super(scope, id, props);
        // Create security group for ALB
        this.albSecurityGroup = new aws_ec2_1.SecurityGroup(this, 'ALBSecurityGroup', {
            vpc: props.vpc,
            description: 'Security group for Application Load Balancer',
            allowAllOutbound: true
        });
        this.loadBalancer = new aws_elasticloadbalancingv2_1.ApplicationLoadBalancer(this, 'ALB', {
            vpc: props.vpc,
            internetFacing: false,
            deletionProtection: false,
            securityGroup: this.albSecurityGroup,
            idleTimeout: aws_cdk_lib_1.Duration.seconds(4000)
        });
        this.loadBalancerListener = this.loadBalancer.addListener('Listener', {
            port: 80,
            protocol: aws_elasticloadbalancingv2_1.ApplicationProtocol.HTTP,
        });
        // Create a auth target group
        this.authTargetGroup = new aws_elasticloadbalancingv2_1.ApplicationTargetGroup(this, 'DefaultTargetGroup', {
            vpc: props.vpc,
            port: 8080,
            protocol: aws_elasticloadbalancingv2_1.ApplicationProtocol.HTTP,
            targetType: aws_elasticloadbalancingv2_1.TargetType.IP,
            healthCheck: {
                path: '/health',
                interval: aws_cdk_lib_1.Duration.seconds(30),
                healthyHttpCodes: '200'
            }
        });
        // attach the auth target to the listenet
        this.loadBalancerListener.addTargetGroups("authTargetGroup", {
            targetGroups: [this.authTargetGroup],
        });
        // add auth-routing to the listener
        this.loadBalancerListener.addAction('AuthRouting', {
            priority: 10,
            conditions: [aws_elasticloadbalancingv2_1.ListenerCondition.pathPatterns(['/auth/*'])],
            action: aws_elasticloadbalancingv2_1.ListenerAction.forward([this.authTargetGroup])
        });
        // listener.addAction('CoreRouting', {
        //     priority: 20,
        //     conditions: [ListenerCondition.pathPatterns(['/core/*'])],
        //     action: ListenerAction.forward([this.coreTargetGroup])
        // });
        new aws_cdk_lib_1.CfnOutput(this, 'AlbDnsName', {
            value: this.loadBalancer.loadBalancerDnsName,
            exportName: 'AlbDnsName'
        });
    }
}
exports.AlbStack = AlbStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxiLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxiLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFxRTtBQUNyRSxpREFBMEQ7QUFDMUQsdUZBQTRNO0FBTzVNLE1BQWEsUUFBUyxTQUFRLG1CQUFLO0lBQ2YsWUFBWSxDQUEwQjtJQUN0QyxvQkFBb0IsQ0FBc0I7SUFDMUMsZUFBZSxDQUF5QjtJQUN4QyxlQUFlLENBQXlCO0lBQ3hDLGdCQUFnQixDQUFnQjtJQUVoRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQTZCO1FBQ25FLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSx1QkFBYSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUNoRSxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7WUFDZCxXQUFXLEVBQUUsOENBQThDO1lBQzNELGdCQUFnQixFQUFFLElBQUk7U0FDekIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLG9EQUF1QixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDekQsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO1lBQ2QsY0FBYyxFQUFFLEtBQUs7WUFDckIsa0JBQWtCLEVBQUUsS0FBSztZQUN6QixhQUFhLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUNwQyxXQUFXLEVBQUUsc0JBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQ3RDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUU7WUFDbEUsSUFBSSxFQUFFLEVBQUU7WUFDUixRQUFRLEVBQUUsZ0RBQW1CLENBQUMsSUFBSTtTQUNyQyxDQUFDLENBQUM7UUFFSCw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLG1EQUFzQixDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUMxRSxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7WUFDZCxJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxnREFBbUIsQ0FBQyxJQUFJO1lBQ2xDLFVBQVUsRUFBRSx1Q0FBVSxDQUFDLEVBQUU7WUFDekIsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxTQUFTO2dCQUNmLFFBQVEsRUFBRSxzQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQzlCLGdCQUFnQixFQUFFLEtBQUs7YUFDMUI7U0FDSixDQUFDLENBQUM7UUFFSCx5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRTtZQUN6RCxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQ3ZDLENBQUMsQ0FBQztRQUVILG1DQUFtQztRQUNuQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRTtZQUMvQyxRQUFRLEVBQUUsRUFBRTtZQUNaLFVBQVUsRUFBRSxDQUFDLDhDQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDekQsTUFBTSxFQUFFLDJDQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ3pELENBQUMsQ0FBQztRQUVILHNDQUFzQztRQUN0QyxvQkFBb0I7UUFDcEIsaUVBQWlFO1FBQ2pFLDZEQUE2RDtRQUM3RCxNQUFNO1FBRU4sSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDOUIsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CO1lBQzVDLFVBQVUsRUFBRSxZQUFZO1NBQzNCLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQWxFRCw0QkFrRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZm5PdXRwdXQsIER1cmF0aW9uLCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHsgSVZwYywgU2VjdXJpdHlHcm91cCB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZWMyXCI7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbkxpc3RlbmVyLCBBcHBsaWNhdGlvbkxvYWRCYWxhbmNlciwgQXBwbGljYXRpb25Qcm90b2NvbCwgQXBwbGljYXRpb25UYXJnZXRHcm91cCwgTGlzdGVuZXJBY3Rpb24sIExpc3RlbmVyQ29uZGl0aW9uLCBQcm90b2NvbCwgVGFyZ2V0VHlwZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZWxhc3RpY2xvYWRiYWxhbmNpbmd2MlwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBMb2FkQmFsYW5jZXJTdGFja1Byb3BzIGV4dGVuZHMgU3RhY2tQcm9wcyB7XG4gIHZwYzogSVZwYztcbn1cblxuZXhwb3J0IGNsYXNzIEFsYlN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICAgIHB1YmxpYyByZWFkb25seSBsb2FkQmFsYW5jZXI6IEFwcGxpY2F0aW9uTG9hZEJhbGFuY2VyO1xuICAgIHB1YmxpYyByZWFkb25seSBsb2FkQmFsYW5jZXJMaXN0ZW5lcjogQXBwbGljYXRpb25MaXN0ZW5lcjtcbiAgICBwdWJsaWMgcmVhZG9ubHkgYXV0aFRhcmdldEdyb3VwOiBBcHBsaWNhdGlvblRhcmdldEdyb3VwO1xuICAgIHB1YmxpYyByZWFkb25seSBjb3JlVGFyZ2V0R3JvdXA6IEFwcGxpY2F0aW9uVGFyZ2V0R3JvdXA7XG4gICAgcHVibGljIHJlYWRvbmx5IGFsYlNlY3VyaXR5R3JvdXA6IFNlY3VyaXR5R3JvdXA7XG5cbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogTG9hZEJhbGFuY2VyU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAgICAvLyBDcmVhdGUgc2VjdXJpdHkgZ3JvdXAgZm9yIEFMQlxuICAgICAgICB0aGlzLmFsYlNlY3VyaXR5R3JvdXAgPSBuZXcgU2VjdXJpdHlHcm91cCh0aGlzLCAnQUxCU2VjdXJpdHlHcm91cCcsIHtcbiAgICAgICAgICAgIHZwYzogcHJvcHMudnBjLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZWN1cml0eSBncm91cCBmb3IgQXBwbGljYXRpb24gTG9hZCBCYWxhbmNlcicsXG4gICAgICAgICAgICBhbGxvd0FsbE91dGJvdW5kOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubG9hZEJhbGFuY2VyID0gbmV3IEFwcGxpY2F0aW9uTG9hZEJhbGFuY2VyKHRoaXMsICdBTEInLCB7XG4gICAgICAgICAgICB2cGM6IHByb3BzLnZwYyxcbiAgICAgICAgICAgIGludGVybmV0RmFjaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGRlbGV0aW9uUHJvdGVjdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBzZWN1cml0eUdyb3VwOiB0aGlzLmFsYlNlY3VyaXR5R3JvdXAsXG4gICAgICAgICAgICBpZGxlVGltZW91dDogRHVyYXRpb24uc2Vjb25kcyg0MDAwKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxvYWRCYWxhbmNlckxpc3RlbmVyID0gdGhpcy5sb2FkQmFsYW5jZXIuYWRkTGlzdGVuZXIoJ0xpc3RlbmVyJywge1xuICAgICAgICAgICAgcG9ydDogODAsXG4gICAgICAgICAgICBwcm90b2NvbDogQXBwbGljYXRpb25Qcm90b2NvbC5IVFRQLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDcmVhdGUgYSBhdXRoIHRhcmdldCBncm91cFxuICAgICAgICB0aGlzLmF1dGhUYXJnZXRHcm91cCA9IG5ldyBBcHBsaWNhdGlvblRhcmdldEdyb3VwKHRoaXMsICdEZWZhdWx0VGFyZ2V0R3JvdXAnLCB7XG4gICAgICAgICAgICB2cGM6IHByb3BzLnZwYyxcbiAgICAgICAgICAgIHBvcnQ6IDgwODAsXG4gICAgICAgICAgICBwcm90b2NvbDogQXBwbGljYXRpb25Qcm90b2NvbC5IVFRQLFxuICAgICAgICAgICAgdGFyZ2V0VHlwZTogVGFyZ2V0VHlwZS5JUCxcbiAgICAgICAgICAgIGhlYWx0aENoZWNrOiB7XG4gICAgICAgICAgICAgICAgcGF0aDogJy9oZWFsdGgnLFxuICAgICAgICAgICAgICAgIGludGVydmFsOiBEdXJhdGlvbi5zZWNvbmRzKDMwKSxcbiAgICAgICAgICAgICAgICBoZWFsdGh5SHR0cENvZGVzOiAnMjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBhdHRhY2ggdGhlIGF1dGggdGFyZ2V0IHRvIHRoZSBsaXN0ZW5ldFxuICAgICAgICB0aGlzLmxvYWRCYWxhbmNlckxpc3RlbmVyLmFkZFRhcmdldEdyb3VwcyhcImF1dGhUYXJnZXRHcm91cFwiLCB7XG4gICAgICAgICAgICB0YXJnZXRHcm91cHM6IFt0aGlzLmF1dGhUYXJnZXRHcm91cF0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGFkZCBhdXRoLXJvdXRpbmcgdG8gdGhlIGxpc3RlbmVyXG4gICAgICAgIHRoaXMubG9hZEJhbGFuY2VyTGlzdGVuZXIuYWRkQWN0aW9uKCdBdXRoUm91dGluZycsIHtcbiAgICAgICAgICAgIHByaW9yaXR5OiAxMCxcbiAgICAgICAgICAgIGNvbmRpdGlvbnM6IFtMaXN0ZW5lckNvbmRpdGlvbi5wYXRoUGF0dGVybnMoWycvYXV0aC8qJ10pXSxcbiAgICAgICAgICAgIGFjdGlvbjogTGlzdGVuZXJBY3Rpb24uZm9yd2FyZChbdGhpcy5hdXRoVGFyZ2V0R3JvdXBdKVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBsaXN0ZW5lci5hZGRBY3Rpb24oJ0NvcmVSb3V0aW5nJywge1xuICAgICAgICAvLyAgICAgcHJpb3JpdHk6IDIwLFxuICAgICAgICAvLyAgICAgY29uZGl0aW9uczogW0xpc3RlbmVyQ29uZGl0aW9uLnBhdGhQYXR0ZXJucyhbJy9jb3JlLyonXSldLFxuICAgICAgICAvLyAgICAgYWN0aW9uOiBMaXN0ZW5lckFjdGlvbi5mb3J3YXJkKFt0aGlzLmNvcmVUYXJnZXRHcm91cF0pXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ0FsYkRuc05hbWUnLCB7XG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5sb2FkQmFsYW5jZXIubG9hZEJhbGFuY2VyRG5zTmFtZSxcbiAgICAgICAgICAgIGV4cG9ydE5hbWU6ICdBbGJEbnNOYW1lJ1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=