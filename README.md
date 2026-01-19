# BoligAdmin Infrastructure

AWS CDK infrastructure-as-code project for the BoligAdmin application. This repository defines cloud infrastructure using TypeScript and AWS CDK, including networking, containerized services, databases, authentication, and serverless functions.

## Overview

This project uses **AWS CDK** (Cloud Development Kit) to provision and manage AWS resources programmatically. The infrastructure is organized into modular stacks that can be deployed independently or in dependency order.

## Project Structure

```
.
├── bin/
│   └── infrastructure.ts          # CDK app entry point - orchestrates all stacks
├── lib/
│   ├── network-stack.ts           # VPC, subnets, and networking infrastructure
│   ├── ecr-stack.ts               # Elastic Container Registry for Docker images
│   ├── ecs-stack.ts               # ECS Fargate container orchestration
│   ├── alb-stack.ts               # Application Load Balancer
│   ├── rds-stack.ts               # RDS database
│   ├── api-gateway-stack.ts       # API Gateway for HTTP endpoints
│   ├── lambda-stack.ts            # Lambda functions
│   ├── cognito-stack.ts           # Cognito authentication and authorization
│   ├── ba-core-fargateservice-stack.ts  # Core Fargate service configuration
│   └── react-s3-stack.ts          # S3 bucket for React frontend (unused)
├── lambdas/
│   ├── main.go                    # Go Lambda function for API Gateway
│   ├── bootstrap                  # Bootstrap binary for Go Lambda
│   └── go.mod                     # Go module dependencies
├── cdk.json                       # CDK configuration
├── package.json                   # Node.js dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── jest.config.js                 # Jest testing configuration
```

## Infrastructure Stacks

### 1. **NetworkStack**
- Creates a VPC with 2 Availability Zones
- Configures public, private, and isolated subnets
- Sets up 1 NAT Gateway for egress
- Provides VPC Link for API Gateway integration
- **Outputs:** `vpc` for consumption by other stacks

### 2. **EcrStack**
- Creates an Elastic Container Registry (ECR) repository named `auth`
- Enables image scanning on push
- Configures KMS encryption for images
- **Outputs:** `authEcrRepository` for pushing Docker images

### 3. **RdsStack**
- Provisions RDS database instance
- Depends on: NetworkStack (uses VPC)

### 4. **EcsStack**
- Manages ECS Fargate clusters and services
- Depends on: NetworkStack (uses VPC)

### 5. **AlbStack**
- Sets up Application Load Balancer
- Routes traffic to ECS services
- Depends on: NetworkStack (uses VPC)

### 6. **LambdaStack**
- Deploys Go Lambda functions for API logic
- Exports `myLambda` for API Gateway integration

### 7. **CognitoStack**
- Configures AWS Cognito for user authentication
- Provides identity and access management

### 8. **ApiGatewayStack**
- Creates HTTP API endpoints
- Integrates with Lambda functions and ALB
- Depends on: NetworkStack, AlbStack

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- AWS CLI configured with credentials
- AWS CDK CLI: `npm install -g aws-cdk`
- TypeScript knowledge (optional, but helpful)

### Installation

```bash
# Install dependencies
npm install

# Compile TypeScript to JavaScript
npm run build

# Watch mode (auto-compile on file changes)
npm run watch
```

## Usage

### Synthesize CloudFormation Templates

Generate CloudFormation JSON templates without deploying:

```bash
npm run cdk -- synth
```

### Deploy Infrastructure

Deploy all stacks in order (respecting dependencies):

```bash
npm run cdk -- deploy --all
```

Deploy a specific stack:

```bash
npm run cdk -- deploy EcrStack
npm run cdk -- deploy NetworkStack
```

### Watch for Changes

Monitor TypeScript files and auto-synthesize on changes:

```bash
npm run watch
```

### Destroy Infrastructure

Remove all deployed resources:

```bash
npm run cdk -- destroy --all
```

## Testing

Run Jest tests:

```bash
npm test
```

## Lambda Functions

The `lambdas/` directory contains Go Lambda functions that handle API requests:

- **Location:** `lambdas/main.go`
- **Language:** Go with AWS Lambda Go library
- **Runtime:** AWS Lambda Go runtime
- **Handler:** Compiled binary from the bootstrap build

### Building Lambda Functions

The Go functions are automatically compiled and packaged by CDK during synthesis. The compiled assets are output to `cdk.out/`.

## Stack Dependencies

The stacks are deployed with the following dependency order:

1. **EcrStack** - No dependencies
2. **NetworkStack** - No dependencies
3. **RdsStack** → depends on NetworkStack
4. **EcsStack** → depends on NetworkStack
5. **AlbStack** → depends on NetworkStack
6. **LambdaStack** - No dependencies
7. **CognitoStack** - No dependencies
8. **ApiGatewayStack** → depends on NetworkStack, AlbStack

## Configuration

### cdk.json

The `cdk.json` file contains CDK context values and feature flags:

```json
{
  "app": "npx ts-node --prefer-ts-exts bin/infrastructure.ts",
  "context": {
    // AWS CDK feature flags for consistent behavior across versions
  }
}
```

### Environment Variables

Set AWS region and account:

```bash
export AWS_REGION=us-east-1
export AWS_ACCOUNT_ID=123456789012
```

## Development Workflow

1. **Make changes** to TypeScript files in `lib/` or `bin/`
2. **Run watch mode**: `npm run watch`
3. **Test locally**: `npm test`
4. **Synthesize**: `npm run cdk -- synth`
5. **Review outputs** in `cdk.out/`
6. **Deploy**: `npm run cdk -- deploy --all` or specific stacks

## Key AWS Services Used

- **EC2** - VPC, subnets, networking
- **ECR** - Docker image repository
- **ECS Fargate** - Containerized application deployment
- **RDS** - Managed relational database
- **ALB** - Application load balancing
- **Lambda** - Serverless compute
- **API Gateway** - HTTP API endpoints
- **Cognito** - Authentication and user management
- **KMS** - Encryption key management
- **CloudWatch** - Logging and monitoring

## Useful Commands

```bash
# Compile TypeScript
npm run build

# Watch and auto-compile
npm run watch

# Run tests
npm test

# Deploy all stacks
npm run cdk -- deploy --all

# Deploy specific stack
npm run cdk -- deploy NetworkStack

# View deployed stacks
npm run cdk -- list

# Get stack outputs
npm run cdk -- output

# Destroy all stacks
npm run cdk -- destroy --all

# View diff before deployment
npm run cdk -- diff
```

## Troubleshooting

### TypeScript Compilation Errors
- Ensure `npm install` was run
- Check TypeScript version in `package.json`
- Run `npm run build` to identify issues

### CDK Deployment Failures
- Verify AWS credentials: `aws sts get-caller-identity`
- Check AWS region configuration
- Review CloudFormation events in AWS Console
- Ensure dependencies between stacks are correct

### Lambda Build Issues
- Verify Go is installed (if modifying Lambda code)
- Check `lambdas/go.mod` for dependency issues
- Bootstrap binary should be in `lambdas/bootstrap`

## Contributing

1. Create a new branch for features
2. Make changes following TypeScript conventions
3. Run `npm run build` and `npm test`
4. Deploy to test environment with `cdk deploy`
5. Create a pull request with changes

## License

Internal project for BoligAdmin.

## Additional Resources

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [AWS CDK TypeScript API Reference](https://docs.aws.amazon.com/cdk/api/latest/)
- [AWS CloudFormation User Guide](https://docs.aws.amazon.com/cloudformation/)
