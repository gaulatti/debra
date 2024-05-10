import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { buildAppsyncApi } from './appsync';
import { buildAristonResources } from './modules/ariston';
/**
 * Represents the EleniStack class that extends the Stack class.
 * This class is responsible for building the Eleni stack and its resources.
 */
export class EleniStack extends Stack {
  constructor(scope: Construct, uuid: string, props?: StackProps) {
    super(scope, uuid, props);

    buildAristonResources(this);

    // const api = buildAppsyncApi(this, getLambda)
  }
}
