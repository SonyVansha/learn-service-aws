import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const dynamodb = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async (event, context) => {
    for (const { messageId, body } of event.Records) {
        console.log('SQS message %s: %j', messageId, body)
        const task = JSON.parse(body);
        await dynamodb.send(new PutCommand({
            TableName: "data",
            Item: task
        }));
        console.log(`Task saved to DynamoDB: ${task.id}`);
    }
    return `Successfully processed ${event.Records.length} messages.`;
}