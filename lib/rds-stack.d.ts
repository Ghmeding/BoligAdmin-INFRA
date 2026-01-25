import { Stack, StackProps } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
export interface RdsStackProps extends StackProps {
    vpc: Vpc;
}
export declare class RdsStack extends Stack {
    constructor(scope: Construct, id: string, props: RdsStackProps);
}
