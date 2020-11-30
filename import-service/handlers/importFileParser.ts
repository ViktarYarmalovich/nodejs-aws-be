import { S3Event, S3Handler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import * as csv from 'csv-parser';


export const importFileParser: S3Handler = (event: S3Event) => {
  const { HOT_FOLDERS_BUCKET_NAME, HOT_FOLDERS_BUCKET_REGION, SQS_IMPORT_CATALOG_URL } = process.env;
 
  console.log('event: ', event);
  
  const s3 = new AWS.S3({ region: HOT_FOLDERS_BUCKET_REGION });  

  try {

    event.Records.forEach((record) => {
        let fileName = record.s3.object.key;
        const sqs = new AWS.SQS();
    
        s3.getObject({
            Bucket: HOT_FOLDERS_BUCKET_NAME,
            Key: fileName,
          })
          .on('error', err => console.error(err))
          .createReadStream()
          .pipe(csv())
          .on("data", (data) => {
            console.log(data);

            sqs.sendMessage({
                QueueUrl: SQS_IMPORT_CATALOG_URL,
                MessageBody: JSON.stringify(data)
              }, (err, data) => {
                if (err) console.error(err, err.stack);
                else console.log(`Send to SQS ${SQS_IMPORT_CATALOG_URL}: `, data);
              }
            );
          })
          .on("end", async () => {
            console.log(`Copy from ${HOT_FOLDERS_BUCKET_NAME}/${fileName}`);
    
            await s3.copyObject({
                Bucket: HOT_FOLDERS_BUCKET_NAME,
                CopySource: `${HOT_FOLDERS_BUCKET_NAME}/${fileName}`,
                Key: fileName.replace("uploaded", "parsed"),
              })
              .promise();
    
            console.log(`Copied into ${HOT_FOLDERS_BUCKET_NAME}/${fileName.replace("uploaded", "parsed")}`);
    
            await s3.deleteObject({
                Bucket: HOT_FOLDERS_BUCKET_NAME,
                Key: fileName,
              })
              .promise();
    
            console.log(`Removed ${HOT_FOLDERS_BUCKET_NAME}/${fileName}`);
          });
      });

  } catch (err) {
    console.error(err);
  }
}
