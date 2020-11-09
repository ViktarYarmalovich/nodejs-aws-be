import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ProductModel } from '../services/product.model';
import { ProductsService } from '../services/product.service';

export const createProduct: APIGatewayProxyHandler = async (event, _context) => {
  console.log('event: ', event);

  const productsService: ProductsService = new ProductsService();
  const productModel: ProductModel  = JSON.parse(event.body);

  return productsService.createProduct(productModel)
    .then((product) => {
        let resultStatusCode = 400;
        let resultBody = `{ "message": "Could not create a Product. See the log file for details." }`;
  
        if (product !== undefined) {
          resultStatusCode = 201;
          resultBody = JSON.stringify(product);
        }
  
        return {
          statusCode: resultStatusCode,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: resultBody
        };
    })
    .catch((error) => {
      console.log(error);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: `{ "message": "Internal Server Error. See the log file for details." }`
      };
    });
}
