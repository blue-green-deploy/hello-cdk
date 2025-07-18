import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Lambda function
    const helloLambda = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler',
    });

    // 2. API Gateway REST API
    const api = new apigateway.RestApi(this, 'HelloApi', {
      restApiName: 'Hello Service',
    });

    api.root.addMethod('GET', new apigateway.LambdaIntegration(helloLambda));

    // 3. Output the API endpoint URL
    new cdk.CfnOutput(this, 'MyLambdaApiEndpoint', {
      value: api.url,
      description: 'The API Gateway endpoint URL',
    });
  }
}

