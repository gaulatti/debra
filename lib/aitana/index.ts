import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createCognitoPool } from './authorization';

class AitanaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    createCognitoPool(this);
  }
}

export { AitanaStack };