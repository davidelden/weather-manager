const createNewSubscriberSNSParams = (phone_number, zip_codes) => (
  {
    "Protocol": "sms",
    "TopicArn": process.env.AWS_SNS_TOPIC_ARN,
    "Attributes": {
      "FilterPolicy": `{ "zip_codes": [\"${zip_codes.join("\",\"")}\"] }`
    },
    "Endpoint": phone_number,
    "ReturnSubscriptionArn": true
  }
)

module.exports = createNewSubscriberSNSParams;
