import { APIGatewayTokenAuthorizerEvent, APIGatewayTokenAuthorizerHandler } from "aws-lambda";


export const basicAuthorizer: APIGatewayTokenAuthorizerHandler 
        = (event: APIGatewayTokenAuthorizerEvent, _context, callback) => {

    console.log('event: ', event);


    if (event.type !== 'TOKEN') {
        callback('Unauthorized');
      }
    
    try {
        const { authorizationToken, methodArn } = event;
    
        const token = authorizationToken.split(' ')[1];
        const encodedCreds = Buffer.from(token, 'base64');
        const [username, password] = encodedCreds.toString('utf-8').split(':');
    
        console.log(`Username: ${username}, password: ${password}`);
    
        const storedPassword = process.env[username];
        const effect =
          storedPassword && storedPassword === password ? 'Allow' : 'Deny';
    
        const policy = generatePolicy(token, methodArn, effect);
    
        callback(null, policy);
    } catch (e) {
        return callback(`Unauthorized: ${e.message}`);
    }
}

const generatePolicy = (principalId, resource, effect = 'Allow') => ({
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  });
