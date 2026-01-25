"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcsStack = exports.PREFIX = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_ecs_1 = require("aws-cdk-lib/aws-ecs");
exports.PREFIX = "BA_AUTH";
class EcsStack extends aws_cdk_lib_1.Stack {
    cluster;
    constructor(scope, id, props) {
        super(scope, id, props);
        const vpc = props.vpc;
        // Create ECS Cluster
        this.cluster = new aws_ecs_1.Cluster(this, 'EcsCluster', {
            vpc: vpc,
            clusterName: `${exports.PREFIX}-cluster`
        });
    }
}
exports.EcsStack = EcsStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNzLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWNzLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFpRDtBQUNqRCxpREFBOEM7QUFJakMsUUFBQSxNQUFNLEdBQUcsU0FBUyxDQUFDO0FBTWhDLE1BQWEsUUFBUyxTQUFRLG1CQUFLO0lBQ2YsT0FBTyxDQUFVO0lBRWpDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBb0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUV0QixxQkFBcUI7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUMzQyxHQUFHLEVBQUUsR0FBRztZQUNSLFdBQVcsRUFBRSxHQUFHLGNBQU0sVUFBVTtTQUVuQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFmRCw0QkFlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENsdXN0ZXIgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWNzJztcbmltcG9ydCB7IFZwYyB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1lYzInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBjb25zdCBQUkVGSVggPSBcIkJBX0FVVEhcIjtcblxuZXhwb3J0IGludGVyZmFjZSBFY3NTdGFja1Byb3BzIGV4dGVuZHMgU3RhY2tQcm9wcyB7XG4gICAgdnBjOiBWcGM7XG59XG5cbmV4cG9ydCBjbGFzcyBFY3NTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgY2x1c3RlcjogQ2x1c3RlcjtcblxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBFY3NTdGFja1Byb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgICAgIGNvbnN0IHZwYyA9IHByb3BzLnZwYztcblxuICAgICAgICAvLyBDcmVhdGUgRUNTIENsdXN0ZXJcbiAgICAgICAgdGhpcy5jbHVzdGVyID0gbmV3IENsdXN0ZXIodGhpcywgJ0Vjc0NsdXN0ZXInLCB7XG4gICAgICAgICAgICB2cGM6IHZwYyxcbiAgICAgICAgICAgIGNsdXN0ZXJOYW1lOiBgJHtQUkVGSVh9LWNsdXN0ZXJgXG5cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19