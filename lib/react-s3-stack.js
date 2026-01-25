"use strict";
// import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
// import { CloudFrontWebDistribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
// import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
// import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
// import { Construct } from "constructs";
Object.defineProperty(exports, "__esModule", { value: true });
// export class ReactS3Stack extends Stack {
//   constructor(scope: Construct, id: string, props?: StackProps) {
//     super(scope, id, props);
//     const reactBucket = new Bucket(this, "reactbucket", {
//       bucketName: `reactbucket-dev-${this.account}-${this.region}`,
//       blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
//       publicReadAccess: false,
//       removalPolicy: RemovalPolicy.DESTROY
//     });
//     const distribution = new CloudFrontWebDistribution(
//       this,
//       "ReactDeploymentDistribution",
//       {
//         originConfigs: [
//           {
//             s3OriginSource: {
//               s3BucketSource: reactBucket,
//               originAccessIdentity: new OriginAccessIdentity(this, 'OAI')
//             },
//             behaviors: [{ isDefaultBehavior: true }]
//           }
//         ],
//         errorConfigurations: [
//           {
//             errorCode: 404,
//             responsePagePath: "/index.html",
//             responseCode: 200,
//             errorCachingMinTtl: 10
//           }
//         ]
//       }
//     );
//     new BucketDeployment(this, "DeployReactApp", {
//       sources: [
//         Source.asset(
//           "/Users/gmeding/Documents/Repositories/BoligAdmin/services/frontend/build"
//         )
//       ],
//       destinationBucket: reactBucket,
//       distributionPaths: ["/*"],
//       distribution
//     });
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QtczMtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWFjdC1zMy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsa0VBQWtFO0FBQ2xFLGdHQUFnRztBQUNoRyxrRUFBa0U7QUFDbEUsNEVBQTRFO0FBQzVFLDBDQUEwQzs7QUFFMUMsNENBQTRDO0FBQzVDLG9FQUFvRTtBQUNwRSwrQkFBK0I7QUFFL0IsNERBQTREO0FBQzVELHNFQUFzRTtBQUN0RSx3REFBd0Q7QUFDeEQsaUNBQWlDO0FBQ2pDLDZDQUE2QztBQUM3QyxVQUFVO0FBRVYsMERBQTBEO0FBQzFELGNBQWM7QUFDZCx1Q0FBdUM7QUFDdkMsVUFBVTtBQUNWLDJCQUEyQjtBQUMzQixjQUFjO0FBQ2QsZ0NBQWdDO0FBQ2hDLDZDQUE2QztBQUM3Qyw0RUFBNEU7QUFDNUUsaUJBQWlCO0FBQ2pCLHVEQUF1RDtBQUN2RCxjQUFjO0FBQ2QsYUFBYTtBQUNiLGlDQUFpQztBQUNqQyxjQUFjO0FBQ2QsOEJBQThCO0FBQzlCLCtDQUErQztBQUMvQyxpQ0FBaUM7QUFDakMscUNBQXFDO0FBQ3JDLGNBQWM7QUFDZCxZQUFZO0FBQ1osVUFBVTtBQUNWLFNBQVM7QUFFVCxxREFBcUQ7QUFDckQsbUJBQW1CO0FBQ25CLHdCQUF3QjtBQUN4Qix1RkFBdUY7QUFDdkYsWUFBWTtBQUNaLFdBQVc7QUFDWCx3Q0FBd0M7QUFDeEMsbUNBQW1DO0FBQ25DLHFCQUFxQjtBQUNyQixVQUFVO0FBQ1YsTUFBTTtBQUNOLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBSZW1vdmFsUG9saWN5LCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuLy8gaW1wb3J0IHsgQ2xvdWRGcm9udFdlYkRpc3RyaWJ1dGlvbiwgT3JpZ2luQWNjZXNzSWRlbnRpdHkgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3VkZnJvbnRcIjtcbi8vIGltcG9ydCB7IEJsb2NrUHVibGljQWNjZXNzLCBCdWNrZXQgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLXMzXCI7XG4vLyBpbXBvcnQgeyBCdWNrZXREZXBsb3ltZW50LCBTb3VyY2UgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLXMzLWRlcGxveW1lbnRcIjtcbi8vIGltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5cbi8vIGV4cG9ydCBjbGFzcyBSZWFjdFMzU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4vLyAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuLy8gICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4vLyAgICAgY29uc3QgcmVhY3RCdWNrZXQgPSBuZXcgQnVja2V0KHRoaXMsIFwicmVhY3RidWNrZXRcIiwge1xuLy8gICAgICAgYnVja2V0TmFtZTogYHJlYWN0YnVja2V0LWRldi0ke3RoaXMuYWNjb3VudH0tJHt0aGlzLnJlZ2lvbn1gLFxuLy8gICAgICAgYmxvY2tQdWJsaWNBY2Nlc3M6IEJsb2NrUHVibGljQWNjZXNzLkJMT0NLX0FMTCxcbi8vICAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IGZhbHNlLFxuLy8gICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZXG4vLyAgICAgfSk7XG5cbi8vICAgICBjb25zdCBkaXN0cmlidXRpb24gPSBuZXcgQ2xvdWRGcm9udFdlYkRpc3RyaWJ1dGlvbihcbi8vICAgICAgIHRoaXMsXG4vLyAgICAgICBcIlJlYWN0RGVwbG95bWVudERpc3RyaWJ1dGlvblwiLFxuLy8gICAgICAge1xuLy8gICAgICAgICBvcmlnaW5Db25maWdzOiBbXG4vLyAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgczNPcmlnaW5Tb3VyY2U6IHtcbi8vICAgICAgICAgICAgICAgczNCdWNrZXRTb3VyY2U6IHJlYWN0QnVja2V0LFxuLy8gICAgICAgICAgICAgICBvcmlnaW5BY2Nlc3NJZGVudGl0eTogbmV3IE9yaWdpbkFjY2Vzc0lkZW50aXR5KHRoaXMsICdPQUknKVxuLy8gICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgIGJlaGF2aW9yczogW3sgaXNEZWZhdWx0QmVoYXZpb3I6IHRydWUgfV1cbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIF0sXG4vLyAgICAgICAgIGVycm9yQ29uZmlndXJhdGlvbnM6IFtcbi8vICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICBlcnJvckNvZGU6IDQwNCxcbi8vICAgICAgICAgICAgIHJlc3BvbnNlUGFnZVBhdGg6IFwiL2luZGV4Lmh0bWxcIixcbi8vICAgICAgICAgICAgIHJlc3BvbnNlQ29kZTogMjAwLFxuLy8gICAgICAgICAgICAgZXJyb3JDYWNoaW5nTWluVHRsOiAxMFxuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgXVxuLy8gICAgICAgfVxuLy8gICAgICk7XG5cbi8vICAgICBuZXcgQnVja2V0RGVwbG95bWVudCh0aGlzLCBcIkRlcGxveVJlYWN0QXBwXCIsIHtcbi8vICAgICAgIHNvdXJjZXM6IFtcbi8vICAgICAgICAgU291cmNlLmFzc2V0KFxuLy8gICAgICAgICAgIFwiL1VzZXJzL2dtZWRpbmcvRG9jdW1lbnRzL1JlcG9zaXRvcmllcy9Cb2xpZ0FkbWluL3NlcnZpY2VzL2Zyb250ZW5kL2J1aWxkXCJcbi8vICAgICAgICAgKVxuLy8gICAgICAgXSxcbi8vICAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiByZWFjdEJ1Y2tldCxcbi8vICAgICAgIGRpc3RyaWJ1dGlvblBhdGhzOiBbXCIvKlwiXSxcbi8vICAgICAgIGRpc3RyaWJ1dGlvblxuLy8gICAgIH0pO1xuLy8gICB9XG4vLyB9XG4iXX0=