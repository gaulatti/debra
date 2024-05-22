import { Stack } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';

const createBucket = (stack: Stack) => {
  const bucket = new Bucket(stack, `${stack.stackName}Bucket`, {
    versioned: true,
  });

  return bucket;
};

export { createBucket };
