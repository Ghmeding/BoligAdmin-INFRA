import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Repository, RepositoryEncryption } from 'aws-cdk-lib/aws-ecr';

export class EcrStack extends Stack {
    public readonly baCoreEcrRepository: Repository;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Create the ECR repository for BA CORE
        this.baCoreEcrRepository = new Repository(this, 'bacorerepository', {
            repositoryName: 'bacorerepository',
            imageScanOnPush: true,
            encryption: RepositoryEncryption.KMS
        });
    }
}
