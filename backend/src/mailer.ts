import { AwsClient } from "aws4fetch";
const ENDPOINT =
  "https://email.us-east-2.amazonaws.com/v2/email/outbound-bulk-emails";
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
    DefaultContent: {
      Template: {
        TemplateName: template,
        TemplateData: JSON.stringify({
          uuid: "0",
        }),
      },
    },
    BulkEmailEntries: to.map((t) => ({
      Destination: {
        ToAddresses: [t.email],
      },
      ReplacementEmailContent: {
        RepacementTemplate: {
          ReplacementTemplateData: JSON.stringify({
            uuid: t.uuid,
          }),
        },
      },
      ReplacementHeaders: [
        {
          Name: "List-Unsubscribe",
          Value: "<https://kamalacamo.org/api/unsubscribe/" + t.uuid + ">",
        },
        {
          Name: "List-Unsubscribe-Post",
          Value: "List-Unsubscribe=One-Click",
        },
      ],
    })),
  };
  console.log(command);
  let res = await client.fetch(ENDPOINT, { body: JSON.stringify(command) });
  console.log(await res.text());
};
