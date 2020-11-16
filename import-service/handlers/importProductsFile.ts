import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';

const { HOT_FOLDERS_BUCKET_NAME } = process.env;

export const importProductsFile: APIGatewayProxyHandler = async (event, _context) => {
  console.log('event: ', event);

  const fileName = event.queryStringParameters === null ? false : event.queryStringParameters.name;

  if (!fileName) {
    return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: `{ "message": "Query parameter 'name' is missing." }`
    };      
  }

  const params = {
      Bucket: HOT_FOLDERS_BUCKET_NAME,
      Key: `uploaded/${fileName}`,
      Expires: 60,
      ContentType: 'text/csv'
  };

  const s3 = new AWS.S3({ region: 'eu-west-1' });

  return s3.getSignedUrlPromise('putObject', params)
    .then((signedUrl) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: signedUrl
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: `{ "message": "Internal Server Error. See the log file for details." }`
      };
    });
}
