#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkStack } from '../lib/aws_cdk-stack';
import { AWSSMSStack } from '../stacks/AWSSMSStack';
import { pexipMicroServiceProps } from '../config/aws.sms.config';

const app = new cdk.App();
new AWSSMSStack(app, 'AWSSMSStack', {});