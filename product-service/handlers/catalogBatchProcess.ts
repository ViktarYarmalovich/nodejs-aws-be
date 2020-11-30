import { SQSEvent, SQSHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import { ProductModel } from '../services/product.model';
import { ProductsService } from '../services/product.service';

export const catalogBatchProcess: SQSHandler = async (event: SQSEvent, _context, _callback) => {
    console.log('event: ', event);

    const { IMPORT_CATALOG_SNS_ARN } = process.env;

    try {
        const products = event.Records.map(({body}) => body);

        console.log(products);
        
        const productsService: ProductsService = new ProductsService();
        const sns = new AWS.SNS();

        if (products && products.length) {
            
            products.forEach(product => {
                const productModel: ProductModel  = JSON.parse(product);

                productsService.createProduct(productModel)
                    .then((product) => {
                        console.log(`Product created: ${JSON.stringify(product)}`)
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });

            await sns
                .publish({
                    Subject: 'Imported Products',
                    Message: JSON.stringify(products),
                    TopicArn: IMPORT_CATALOG_SNS_ARN 
                })
                .promise()
                .then((data) => {
                    console.log(`Notification ${data.MessageId} sent to the topic ${IMPORT_CATALOG_SNS_ARN}`);
                })
                .catch((err) => {
                    console.error(err, err.stack);
                });
        }
    } catch (error) {
        return console.error(error);
    }
}
