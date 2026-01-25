"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcrStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_ecr_1 = require("aws-cdk-lib/aws-ecr");
class EcrStack extends aws_cdk_lib_1.Stack {
    authEcrRepository;
    constructor(scope, id, props) {
        super(scope, id, props);
        // Create the ECR repository for Auth
        this.authEcrRepository = new aws_ecr_1.Repository(this, 'AuthRepository', {
            repositoryName: 'auth',
            imageScanOnPush: true,
            encryption: aws_ecr_1.RepositoryEncryption.KMS
        });
    }
}
exports.EcrStack = EcrStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNyLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWNyLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFnRDtBQUVoRCxpREFBdUU7QUFFdkUsTUFBYSxRQUFTLFNBQVEsbUJBQUs7SUFDZixpQkFBaUIsQ0FBYTtJQUU5QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQ3hELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxvQkFBVSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUM1RCxjQUFjLEVBQUUsTUFBTTtZQUN0QixlQUFlLEVBQUUsSUFBSTtZQUNyQixVQUFVLEVBQUUsOEJBQW9CLENBQUMsR0FBRztTQUN2QyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFiRCw0QkFhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBSZXBvc2l0b3J5LCBSZXBvc2l0b3J5RW5jcnlwdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1lY3InO1xuXG5leHBvcnQgY2xhc3MgRWNyU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gICAgcHVibGljIHJlYWRvbmx5IGF1dGhFY3JSZXBvc2l0b3J5OiBSZXBvc2l0b3J5O1xuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgRUNSIHJlcG9zaXRvcnkgZm9yIEF1dGhcbiAgICAgICAgdGhpcy5hdXRoRWNyUmVwb3NpdG9yeSA9IG5ldyBSZXBvc2l0b3J5KHRoaXMsICdBdXRoUmVwb3NpdG9yeScsIHtcbiAgICAgICAgICAgIHJlcG9zaXRvcnlOYW1lOiAnYXV0aCcsXG4gICAgICAgICAgICBpbWFnZVNjYW5PblB1c2g6IHRydWUsXG4gICAgICAgICAgICBlbmNyeXB0aW9uOiBSZXBvc2l0b3J5RW5jcnlwdGlvbi5LTVNcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19