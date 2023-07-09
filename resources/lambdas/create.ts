
import * as AWS from 'aws-sdk';

export const main = async (event: any, context: any) => {

  const body = JSON.parse(event.body);

  let sns: AWS.SNS;

  sns = new AWS.SNS({ region: 'us-east-1' });

  const topicArn = process.env.TOPIC_ARN;
  const params = {
    Protocol: 'email',
    TopicArn: topicArn,
    Endpoint: body.email
  }

  try {

    const subscription = await sns.subscribe(params).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        result: subscription
      }),
    };
  } catch (error) {

    console.log('error subscribing to topic');
   
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        result: error
      }),
    }

  }

}