import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { buildAristonTriggerLambda } from './functions/trigger';
import { buildAristonApi } from './network/api';
import { createSecrets } from './secrets/figma';
/**
 * Represents the EleniStack class that extends the Stack class.
 * This class is responsible for building the Eleni stack and its resources.
 */
class AristonStack extends Stack {
  constructor(scope: Construct, uuid: string, props?: StackProps) {
    super(scope, uuid, props);

    const { figmaToken } = createSecrets(this);
    const { triggerLambda, lambdaIntegration } = buildAristonTriggerLambda(this, figmaToken);

    /**
     * Grant the Lambda function read access to the Figma secrets.
     */
    figmaToken.grantRead(triggerLambda);

    /**
     * Build the API Gateway.
     */
    const { endpoint } = buildAristonApi(this);

    /**
     * Integrate the Lambda with the API Gateway
     */
    const triggerResource = endpoint.root.addResource('trigger');
    triggerResource.addMethod('POST', lambdaIntegration);
  }
}

export { AristonStack };
