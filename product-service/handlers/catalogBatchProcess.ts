import { SQSEvent, SQSHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';

export const catalogBatchProcess: SQSHandler = async (event: SQSEvent, _context, _callback) => {
    const { IMPORT_CATALOG_SNS_ARN } = process.env;

    try {
        const products = event.Records.map(({body}) => body);

        console.log(products);

        const sns = new AWS.SNS();

        if (products && products.length) {
            await sns
                .publish({
                    Subject: "Imported Products",
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
        return console.log(error);
    }
}
