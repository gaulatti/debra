import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import Axios from 'axios';
const secretsManager = new SecretsManagerClient();

const main = async (event: any, _context: any, callback: any) => {
  /**
   * Get the Figma file and token from the AWS Secrets Manager.
   */
  const figmaToken = await secretsManager.send(new GetSecretValueCommand({ SecretId: process.env.FIGMA_TOKEN }));

  const body = JSON.parse(event.body);
  if (body.event_type == 'LIBRARY_PUBLISH') {
    const { fileKey, triggered_by, timestamp } = body;

    const { data } = await Axios.get(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        'X-FIGMA-TOKEN': figmaToken.SecretString,
      },
    });

    const { children } = data.document;
    console.log({ children });

    /**
     * TODO: Should we do this like on the TTS project where this triggers Step Functions?
     * Because Figma will wait for our response, and this might take a while depending
     * on the figma file size.
     */
    // TODO: store changes in s3
    // TODO: get file contents
    // TODO: Parse the file
    // TODO: Serialize the file
    // TODO: Send it to S3
    // TODO: Export the output
  }

  callback(null, {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: null,
  });

  return;
};

export { main };
