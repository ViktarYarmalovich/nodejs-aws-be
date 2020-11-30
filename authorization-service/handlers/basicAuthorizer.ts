import { APIGatewayTokenAuthorizerEvent, APIGatewayTokenAuthorizerHandler } from "aws-lambda";


export const basicAuthorizer: APIGatewayTokenAuthorizerHandler 
        = async (event: APIGatewayTokenAuthorizerEvent, _context, callback) => {

    console.log('event: ', event);

    callback('Unauthorized');
}
