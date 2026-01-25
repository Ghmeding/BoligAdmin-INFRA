import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Repository } from 'aws-cdk-lib/aws-ecr';
export declare class EcrStack extends Stack {
    readonly authEcrRepository: Repository;
    constructor(scope: Construct, id: string, props?: StackProps);
}
