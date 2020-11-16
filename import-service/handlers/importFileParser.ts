import { S3Handler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import * as CSV from 'csv-parser';

const { HOT_FOLDERS_BUCKET_NAME } = process.env;

export const importFileParser: S3Handler = async (event, _context) => {
  console.log('event: ', event);

  const s3 = new AWS.S3({ region: 'eu-west-1' });  

  try {
    event.Records.forEach(record => {
        s3.getObject({
            Bucket: HOT_FOLDERS_BUCKET_NAME,
            Key: record.s3.object.key
            })
            .on('error', err => console.error(err))
            .createReadStream()
            .pipe(CSV())
            .on('error', err => console.error(err))
            .on('data', data => console.log(data))
            .on('end', async() => {
                console.log(`Copy from ${HOT_FOLDERS_BUCKET_NAME}/${record.s3.object.key}`);

                await s3.copyObject({
                    Bucket: HOT_FOLDERS_BUCKET_NAME,
                    CopySource: `${HOT_FOLDERS_BUCKET_NAME}/${record.s3.object.key}`,
                    Key: record.s3.object.key.replace('uploaded', 'parsed')
                }).promise();

                console.log(`Copied into ${HOT_FOLDERS_BUCKET_NAME}/${record.s3.object.key.replace('uploaded', 'parsed')}`)
            });

    });
  } catch (err) {
    console.error(err);
  }
}
