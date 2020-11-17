import { importProductsFile } from "./importProductsFile";
import { APIGatewayProxyEvent } from "aws-lambda";

process.env.HOT_FOLDERS_BUCKET_REGION = 'eu-west-1';
process.env.HOT_FOLDERS_BUCKET_NAME = 'hot-folders';

const AWS = require("aws-sdk");

const event: APIGatewayProxyEvent = {
    resource: "/import",
    path: "/import",
    httpMethod: "GET",
    headers: {},
    multiValueHeaders: {},
    queryStringParameters: undefined,
    multiValueQueryStringParameters: undefined,
    pathParameters: null,
    stageVariables: null,
    requestContext: null,
    body: null,
    isBase64Encoded: false,
};

test("Should return status code 400 if there is missisng 'name' query parameter", async () => {

    event.queryStringParameters = {};

    const expected = {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: `{ "message": "Query parameter 'name' is missing." }`,
    };

    const response = await importProductsFile(event, null, null);

    expect(response).toEqual(expected);
});

test("Should return status code 500 in case of any internal error", async () => {

    process.env.HOT_FOLDERS_BUCKET_NAME = null;

    event.queryStringParameters = { name: "products_202011160333.csv" };

    const expected = {
        statusCode: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: `{ "message": "Internal Server Error. See the log file for details." }`,
    };

    const response = await importProductsFile(event, null, null);

    process.env.HOT_FOLDERS_BUCKET_NAME = 'hot-folders';

    expect(response).toEqual(expected);
});

test("Should return status code 200", async () => {

    event.queryStringParameters = { name: "products_202011160333.csv" };

    const SIGNED_URL_MOCK = "https://hot-folders.bla.bla.com";

    AWS.S3 = jest.fn().mockImplementation(() => ({
        getSignedUrlPromise: () => Promise.resolve(SIGNED_URL_MOCK),
    }));

    const expected = {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(SIGNED_URL_MOCK),
    };

    const response = await importProductsFile(event, null, null);

    expect(response).toEqual(expected);
});