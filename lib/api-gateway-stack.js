"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
class ApiGatewayStack extends aws_cdk_lib_1.Stack {
    vpc;
    constructor(scope, id, props) {
        super(scope, id, props);
        const restApi = new aws_apigateway_1.RestApi(this, "BoligAdminApiGateway", {
            defaultCorsPreflightOptions: {
                allowOrigins: aws_apigateway_1.Cors.ALL_ORIGINS,
                allowMethods: aws_apigateway_1.Cors.ALL_METHODS,
                allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token'],
                allowCredentials: true,
            }
        });
        const integration = new aws_apigateway_1.LambdaIntegration(props.myLambda); // go function here
        const testResource = restApi.root.addResource("test");
        testResource.addMethod("GET", integration);
        // const albIntegration = new AlbIntegration("AlbIntegration", props.albListener, {
        //   vpcLink: props.vpcLink
        // });
        // // Create Cognito Authorizer
        // const auth = new CognitoUserPoolsAuthorizer(this, 'CognitoAuthorizer', {
        //   cognitoUserPools: [props.userPool]
        // });
    }
}
exports.ApiGatewayStack = ApiGatewayStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWdhdGV3YXktc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcGktZ2F0ZXdheS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBZ0Q7QUFLaEQsK0RBQTBHO0FBTTFHLE1BQWEsZUFBZ0IsU0FBUSxtQkFBSztJQUV4QixHQUFHLENBQU07SUFFekIsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUEyQjtRQUNuRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLE9BQU8sR0FBRyxJQUFJLHdCQUFPLENBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFFO1lBQ3hELDJCQUEyQixFQUFFO2dCQUMzQixZQUFZLEVBQUUscUJBQUksQ0FBQyxXQUFXO2dCQUM5QixZQUFZLEVBQUUscUJBQUksQ0FBQyxXQUFXO2dCQUM5QixZQUFZLEVBQUUsQ0FBQyxjQUFjLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsc0JBQXNCLENBQUM7Z0JBQ2xHLGdCQUFnQixFQUFFLElBQUk7YUFDdkI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxJQUFJLGtDQUFpQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDLG1CQUFtQjtRQUM3RSxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RCxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUcxQyxtRkFBbUY7UUFDbkYsMkJBQTJCO1FBQzNCLE1BQU07UUFFTiwrQkFBK0I7UUFDL0IsMkVBQTJFO1FBQzNFLHVDQUF1QztRQUN2QyxNQUFNO0lBQ1IsQ0FBQztDQUNGO0FBOUJELDBDQThCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBGdW5jdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgVnBjIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1lYzJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5pbXBvcnQgeyBJVXNlclBvb2wgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNvZ25pdG9cIjtcbmltcG9ydCB7IENvZ25pdG9Vc2VyUG9vbHNBdXRob3JpemVyLCBDb3JzLCBMYW1iZGFJbnRlZ3JhdGlvbiwgUmVzdEFwaSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFwaUdhdGV3YXlTdGFja1Byb3BzIGV4dGVuZHMgU3RhY2tQcm9wcyB7XG4gIG15TGFtYmRhOiBGdW5jdGlvbjtcbn1cblxuZXhwb3J0IGNsYXNzIEFwaUdhdGV3YXlTdGFjayBleHRlbmRzIFN0YWNrIHtcblxuICBwdWJsaWMgcmVhZG9ubHkgdnBjOiBWcGM7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IEFwaUdhdGV3YXlTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCByZXN0QXBpID0gbmV3IFJlc3RBcGkodGhpcywgXCJCb2xpZ0FkbWluQXBpR2F0ZXdheVwiLCB7XG4gICAgICBkZWZhdWx0Q29yc1ByZWZsaWdodE9wdGlvbnM6IHtcbiAgICAgICAgYWxsb3dPcmlnaW5zOiBDb3JzLkFMTF9PUklHSU5TLFxuICAgICAgICBhbGxvd01ldGhvZHM6IENvcnMuQUxMX01FVEhPRFMsXG4gICAgICAgIGFsbG93SGVhZGVyczogWydDb250ZW50LVR5cGUnLCAnWC1BbXotRGF0ZScsICdBdXRob3JpemF0aW9uJywgJ1gtQXBpLUtleScsICdYLUFtei1TZWN1cml0eS1Ub2tlbiddLFxuICAgICAgICBhbGxvd0NyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgaW50ZWdyYXRpb24gPSBuZXcgTGFtYmRhSW50ZWdyYXRpb24ocHJvcHMubXlMYW1iZGEpIC8vIGdvIGZ1bmN0aW9uIGhlcmVcbiAgICBjb25zdCB0ZXN0UmVzb3VyY2UgPSByZXN0QXBpLnJvb3QuYWRkUmVzb3VyY2UoXCJ0ZXN0XCIpO1xuICAgIHRlc3RSZXNvdXJjZS5hZGRNZXRob2QoXCJHRVRcIiwgaW50ZWdyYXRpb24pXG5cblxuICAgIC8vIGNvbnN0IGFsYkludGVncmF0aW9uID0gbmV3IEFsYkludGVncmF0aW9uKFwiQWxiSW50ZWdyYXRpb25cIiwgcHJvcHMuYWxiTGlzdGVuZXIsIHtcbiAgICAvLyAgIHZwY0xpbms6IHByb3BzLnZwY0xpbmtcbiAgICAvLyB9KTtcblxuICAgIC8vIC8vIENyZWF0ZSBDb2duaXRvIEF1dGhvcml6ZXJcbiAgICAvLyBjb25zdCBhdXRoID0gbmV3IENvZ25pdG9Vc2VyUG9vbHNBdXRob3JpemVyKHRoaXMsICdDb2duaXRvQXV0aG9yaXplcicsIHtcbiAgICAvLyAgIGNvZ25pdG9Vc2VyUG9vbHM6IFtwcm9wcy51c2VyUG9vbF1cbiAgICAvLyB9KTtcbiAgfVxufVxuIl19