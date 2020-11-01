import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ProductsService } from '../services/product.service';

export const getProductsList: APIGatewayProxyHandler = async () => {
  const productsService: ProductsService = new ProductsService();

  var resultStatusCode = 200;
  var resultBody ='';

  try {
    resultBody = JSON.stringify(productsService.getList());
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
