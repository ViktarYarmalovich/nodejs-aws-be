import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ProductsService } from '../services/product.service';

export const getProductById: APIGatewayProxyHandler = async (event, _context) => {
  const productsService: ProductsService = new ProductsService();
  const { id } = event.pathParameters;

  const result = productsService.getProductById(id);

  if (result === undefined) {
    return {
      statusCode: 404,
      body: `{ "message": "Product with id: ${id} is not found." }`,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
}
