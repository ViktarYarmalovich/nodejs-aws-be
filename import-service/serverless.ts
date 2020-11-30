import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'import-service',
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
      SQS_IMPORT_CATALOG_URL: { Ref: 'ImportCatalogQueue' }
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: 'arn:aws:s3:::hot-folders/*'
      },
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: {
          'Fn::GetAtt': ['ImportCatalogQueue', 'Arn'],
        },
      }
    ]
  },
  resources: {
    Resources: {
      ImportCatalogQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'import-catalog-sqs-queue'
        }
      }
    },
    Outputs: {
      sqsArn: {
        Value: {
          'Fn::GetAtt': ['ImportCatalogQueue', 'Arn'],
        },
        Export: {
          Name: 'sqsArn',
        },
      },
    },
  },
  functions: {
    importProductsFile: {
      handler: 'handler.importProductsFile',
      events: [
        {
          http: {
            method: 'get',
            path: 'import',
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  name: true
                }
              }
            }
          }
        }
      ]
    },
    importFileParser: {
      handler: 'handler.importFileParser',
      events: [
        {
          s3: {
            bucket: 'hot-folders',
            event: 's3:ObjectCreated:*',
            rules: [
              { 
                prefix: 'uploaded/', 
                suffix: '.csv', 
              },
            ],
            existing: true
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
