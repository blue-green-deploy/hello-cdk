#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack-renamed';

console.log('🔍 bin/cdk.ts: creating CDK app');

const app = new cdk.App();

console.log('🔨 bin/cdk.ts: about to create CdkStack');

new CdkStack(app, 'CdkStack', {
  env: {
    account: '176555461177',
    region: 'eu-west-2',
  },
});

console.log('✅ bin/cdk.ts: CdkStack created');
