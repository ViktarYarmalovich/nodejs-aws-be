import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { ProductsService } from '../services/product.service';

export const getProductsList: APIGatewayProxyHandler = async () => {

  const productsService: ProductsService = new ProductsService();

  return {
    statusCode: 200,
    body: JSON.stringify(productsService.getList()),
  };
}
