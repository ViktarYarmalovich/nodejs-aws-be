import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    stage: 'dev'
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: '${self:custom.stage}',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      IMPORT_CATALOG_SNS_ARN: {
        Ref: 'ImportCatalogNotificationTopic',
      }
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: {
          Ref: 'ImportCatalogNotificationTopic',
        }
      },
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: '${cf:import-service-${self:custom.stage}.sqsArn}'
      }
    ]
  },
  resources: {
    Resources: {
      ImportCatalogNotificationTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'import-catalog-sns-topic',
        },
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'vyarmolovich@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'ImportCatalogNotificationTopic',
          },
        }
      }
    },
  },
  functions: {
    getProductsList: {
      handler: 'handler.getProductsList',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors: true,
          }
        }
      ]
    },
    getProductById: {
      handler: 'handler.getProductById',
      events: [
        {
          http: {
            method: 'get',
            path: 'products/{id}',
            cors: true,
            request: {
              parameters: {
                paths: {
                  id: true
                }
              }
            }
          }
        }
      ]
    },
    createProduct: {
      handler: 'handler.createProduct',
      events: [
        {
          http: {
            method: 'post',
            path: 'products',
            cors: true,
          }
        }
      ]
    },
    catalogBatchProcess: {
      handler: 'handler.catalogBatchProcess',
      events: [
        {
          sqs: {
            batchSize: 5,
            arn: '${cf:import-service-${self:custom.stage}.sqsArn}'
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
