import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ProductsService } from '../services/product.service';

export const getProductById: APIGatewayProxyHandler = async (event, _context) => {
  const productsService: ProductsService = new ProductsService();
  const { id } = event.pathParameters;

  var resultStatusCode = 200;
  var resultBody ='';

  try {
    const result = productsService.getProductById(id);
    if (result === undefined) {
      resultStatusCode = 404;
      resultBody = `{ "message": "Product with id: ${id} is not found." }`;
    } else {
      resultBody = JSON.stringify(result);
    }
  } catch (error) {
    resultStatusCode = 500;
    resultBody = `{ "message": "${error}" }`;
  }

  return {
    statusCode: resultStatusCode,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: resultBody
  };
}
