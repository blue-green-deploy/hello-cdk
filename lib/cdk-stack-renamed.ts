import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    console.log('✅ CDK Stack constructor running...');

    // ✅ Create the IAM Role for GitHub Actions OIDC
    new iam.Role(this, 'GitHubActionsOIDCRole', {
      roleName: 'GitHubActionsOIDCRole',
      assumedBy: new iam.WebIdentityPrincipal('token.actions.githubusercontent.com', {
        StringLike: {
          'token.actions.githubusercontent.com:sub': 'repo:blue-green-deploy/hello-cdk:*',
        },
      }),
      description: 'Role for GitHub Actions to access AWS via OIDC',

        managedPolicies: [
    iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
  ],
    });

    // Test output
    new cdk.CfnOutput(this, 'TestOutput', {
      value: 'CDK Synth Worked!',
    });
  }
}
