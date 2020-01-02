const updateSubscriberSNSParams = (arn, zip_codes) => (
  {
    AttributeName: 'FilterPolicy',
    SubscriptionArn: arn,
    AttributeValue: `{ "zip_codes": [\"${zip_codes.join("\",\"")}\"] }`
  }
)

module.exports = updateSubscriberSNSParams;
