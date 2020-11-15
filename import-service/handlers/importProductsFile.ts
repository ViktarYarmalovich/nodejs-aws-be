import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const importProductsFile: APIGatewayProxyHandler = async (event, _context) => {
  console.log('event: ', event);
  
    return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: `{ "message": "Internal Server Error. See the log file for details." }`
    };

}
