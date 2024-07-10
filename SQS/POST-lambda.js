import { SQS } from '@aws-sdk/client-sqs';

const sqs = new SQS({ apiVersion: '2012-11-05' });
const sqsQueueUrl = "";

export const handler = async (event, context) => {
    const task = {
        "id": Date.now().toString(),
        "description": event.description,
        "targetDate": event.targetDate,
        "isCompleted": false
    };

    const result = await sqs.sendMessage({
        MessageBody: JSON.stringify(task),
        QueueUrl: sqsQueueUrl,
    });
    console.log("Message sent to SQS queue: ", result.MessageId);

    return task
};