import { AwsClient } from "aws4fetch";
const ENDPOINT =
  "https://email.us-east-2.amazonaws.com/v2/email/outbound-emails";
export const createClient = (env: {
  AWS_REGION: string;
  MAIL_KEY_ID: string;
  MAIL_SECRET: string;
}) => {
  return new AwsClient({
    region: env.AWS_REGION,
    accessKeyId: env.MAIL_KEY_ID,
    secretAccessKey: env.MAIL_SECRET,
  });
};
export const sendEmail = async (
  to: {
    email: string;
    uuid: string;
  }[],
  template: string,
  env: { AWS_REGION: string; MAIL_KEY_ID: string; MAIL_SECRET: string }
) => {
  const client = createClient(env);
  const command = {
    FromEmailAddress: '"Kamala Camo Notifications" <mailer@kamalacamo.org>',
    Content: {
      Template: {
        TemplateName: template,
        TemplateData: JSON.stringify({
          uuid: to[0].uuid,
        }),
        Headers: [
          {
            Name: "List-Unsubscribe",
            Value:
              "<https://kamalacamo.org/api/unsubscribe/" + to[0].uuid + ">",
          },
          {
            Name: "List-Unsubscribe-Post",
            Value: "List-Unsubscribe=One-Click",
          },
        ],
      },
    },
    Destination: {
      ToAddresses: [to[0].email],
    },
  };
  console.log(command);
  let res = await client.fetch(ENDPOINT, { body: JSON.stringify(command) });
  console.log(await res.text());
};
