#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { AristonStack } from '../lib/ariston';
import { NenaStack } from '../lib/nena';
import { PoopoStack } from '../lib/poopo';
import { AitanaStack } from '../lib/aitana';
import { ZoeStack } from '../lib/zoe';

/**
 * Represents the AWS Cloud Development Kit (CDK) app.
 */
const app = new cdk.App();

/**
 * Represents the Ariston stack (Figma to Code)
 */
new AristonStack(app, 'Ariston', { stackName: 'Ariston' });

/**
 * Represents the Nena stack (Experiments Website)
 */
new NenaStack(app, 'Nena', { stackName: 'Nena' });

/**
 * Represent the Poopo stack (Lighthouse Beaconing on Lambda)
 */
new PoopoStack(app, 'Poopo', { stackName: 'Poopo' });

/**
 * Represent the Aitana stack (Cognito Authentication with Chrome)
 */
new AitanaStack(app, 'Aitana', { stackName: 'Aitana' });

/**
 * Represent the Zoe stack (Lighthouse Beaconing on ECS/Fargate)
 */
new ZoeStack(app, 'Zoe', { stackName: 'Zoe' });