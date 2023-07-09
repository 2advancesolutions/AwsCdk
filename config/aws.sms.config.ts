import { MicroserviceProps } from "@sylvesterllc/aws-constructs";
import { AttributeType, BillingMode, ProjectionType } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";

export const pexipMicroServiceProps: MicroserviceProps = {
    GLOBALS: {
        name: `sms-stack`,
        stackRuntime: Runtime.NODEJS_18_X,
        accountNumber: '',
        region: '',        
        prefix: `sms-stack`
    },
    API: {
        Name: `subscriptions`,
        Description: 'labmda for subscriptions',
    },
    RESOURCES: {
        LAMBDA: [
            {
                name: `createtopic`,
                codePath: './resources/lambdas/create.ts',
                handler: 'main',
                apiGateway: {
                    method: 'post',
                    secure: false,
                    route: '/topics'
                },
                environment: {  
                    TOPIC_ARN: 'arn:aws:sns:us-east-1:471353349456:ProvidersPMPMTotalSpend'            
                }
            }
        ],
        DYNAMO: {
            TABLES: [
                {
                    tableName: `sms`,
                    primaryKey: {
                        name: 'pk',
                        type: AttributeType.STRING,
                    },
                    sortKey: { 
                        name: 'sk',
                        type: AttributeType.STRING,
                     },
                    billingMode: BillingMode.PAY_PER_REQUEST,
                    indexes: [
                        {
                            indexName: 'gsi1',
                            partitionKey: {
                                name: 'GSI1pk', 
                                type:  AttributeType.STRING
                            },
                            sortKey: {
                                name: 'sk', 
                                type:  AttributeType.STRING
                            },
                            projectionType: ProjectionType.ALL
                        },
                    ]
                },
            ],
        },

    }
}; 