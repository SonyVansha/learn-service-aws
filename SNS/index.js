const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {
    const params = {
        Message: 'Ini adalah notifikasi dari Lambda',
        Subject: 'Notifikasi Lambda ke SNS',
        TopicArn: 'arn:aws:sns:us-east-1:221140254663:IoT'
    };

    try {
        const result = await sns.publish(params).promise();
        console.log('Notifikasi berhasil dikirim:', result);
        return {
            statusCode: 200,
            body: JSON.stringify('Notifikasi berhasil dikirim')
        };
    } catch (error) {
        console.error('Error mengirim notifikasi:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error mengirim notifikasi')
        };
    }
};
