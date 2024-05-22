#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { AristonStack } from '../lib/ariston';

/**
 * Represents the AWS Cloud Development Kit (CDK) app.
 */
const app = new cdk.App();

/**
 * Represents the Ariston stack (Figma to Code)
 */
new AristonStack(app, 'Ariston', { stackName: 'Ariston'});
