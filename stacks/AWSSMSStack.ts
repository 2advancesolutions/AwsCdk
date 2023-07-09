import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { MicroService } from "@sylvesterllc/aws-constructs";
import { pexipMicroServiceProps } from "../config/aws.sms.config";

export class AWSSMSStack extends Stack {

    // define everty thing we want to create in this class
    // cloud related stack 

    constructor(scope: Construct, id: string, props: StackProps) {
        // required by cdk and libary
        super(scope, id, props);
        new MicroService(this, 'AWSSMSStack', pexipMicroServiceProps);

    }

}