import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ProductsService } from '../services/product.service';

export const getProductsList: APIGatewayProxyHandler = async (event, _context) => {
  console.log('event: ', event);
  
  const productsService: ProductsService = new ProductsService();

  return productsService.getList()
    .then((products) => {
      let resultStatusCode = 404;
      let resultBody = '{ "message": "No products found in the store." }';

      if (products?.length) {
        resultStatusCode = 200;
        resultBody = JSON.stringify(products);
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
