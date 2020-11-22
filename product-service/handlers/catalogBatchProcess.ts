import { SQSEvent, SQSHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';

export const catalogBatchProcess: SQSHandler = async (event: SQSEvent, _context, _callback) => {

    try {
        const products = event.Records.map(({body}) => body);

        console.log(products);

        const sns = new AWS.SNS({ region: REGION });

        if (products && products.length) {
        await sns
            .publish({
                Subject: "Imported Products",
                Message: JSON.stringify(products),
                TopicArn: SNS_ARN,
                MessageAttributes: {
                    dataValidity: {
                    DataType: "String",
                    StringValue: "valid",
                    },
                },
                })
            .promise()
            .then((data) => {
                console.log(
                    `Message ${JSON.stringify(books)} sent to the topic ${SNS_ARN}`
                );
                console.log("MessageID is " + data.MessageId);
                })
            .catch((err) => {
                console.error(err, err.stack);
            });
        }
    } catch (error) {
        return console.log(error);
    }


//   const productsService: ProductsService = new ProductsService();
//   const productModel: ProductModel  = JSON.parse(event.body);

//   return productsService.createProduct(productModel)
//     .then((product) => {
//         let resultStatusCode = 400;
//         let resultBody = `{ "message": "Could not create a Product. See the log file for details." }`;
  
//         if (product !== undefined) {
//           resultStatusCode = 201;
//           resultBody = JSON.stringify(product);
//         }
  
//         return {
//           statusCode: resultStatusCode,
//           headers: {
//             'Access-Control-Allow-Origin': '*'
//           },
//           body: resultBody
//         };
//     })
//     .catch((error) => {
//       console.log(error);
//       return {
//         statusCode: 500,
//         headers: {
//           'Access-Control-Allow-Origin': '*'
//         },
//         body: `{ "message": "Internal Server Error. See the log file for details." }`
//       };
//     });
}
