import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ProductsService } from '../services/product.service';

export const getProductById: APIGatewayProxyHandler = async (event, _context) => {
  const productsService: ProductsService = new ProductsService();
  const { id } = event.pathParameters;

  return productsService.getProductById(id)
    .then((product) => {
      let resultStatusCode = 404;
      let resultBody = `{ "message": "Product with id: ${id} is not found." }`;

      if (product !== undefined) {
        resultStatusCode = 200;
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
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: `{ "message": "${error}" }`
      };
    });
}
