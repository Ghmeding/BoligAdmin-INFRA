"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_lambda_go_alpha_1 = require("@aws-cdk/aws-lambda-go-alpha");
class LambdaStack extends aws_cdk_lib_1.Stack {
    myLambda;
    constructor(scope, id, props) {
        super(scope, id, props);
        this.myLambda = new aws_lambda_go_alpha_1.GoFunction(this, "MyLambda", {
            entry: 'lambdas',
            architecture: aws_lambda_1.Architecture.ARM_64,
            runtime: aws_lambda_1.Runtime.PROVIDED_AL2023,
        });
    }
}
exports.LambdaStack = LambdaStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFtYmRhLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFnRDtBQUVoRCx1REFBeUU7QUFDekUsc0VBQTBEO0FBQzFELE1BQWEsV0FBWSxTQUFRLG1CQUFLO0lBQ2xCLFFBQVEsQ0FBVztJQUNuQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQ3hELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxnQ0FBVSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDN0MsS0FBSyxFQUFFLFNBQVM7WUFDaEIsWUFBWSxFQUFFLHlCQUFZLENBQUMsTUFBTTtZQUNqQyxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxlQUFlO1NBQ25DLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQVhELGtDQVdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5pbXBvcnQgeyBBcmNoaXRlY3R1cmUsIEZ1bmN0aW9uLCBSdW50aW1lIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7IEdvRnVuY3Rpb24gfSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhLWdvLWFscGhhJztcbmV4cG9ydCBjbGFzcyBMYW1iZGFTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgbXlMYW1iZGE6IEZ1bmN0aW9uO1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAgICB0aGlzLm15TGFtYmRhID0gbmV3IEdvRnVuY3Rpb24odGhpcywgXCJNeUxhbWJkYVwiLCB7XG4gICAgICAgICAgICBlbnRyeTogJ2xhbWJkYXMnLFxuICAgICAgICAgICAgYXJjaGl0ZWN0dXJlOiBBcmNoaXRlY3R1cmUuQVJNXzY0LFxuICAgICAgICAgICAgcnVudGltZTogUnVudGltZS5QUk9WSURFRF9BTDIwMjMsXG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=