import { sendEmail } from "./mailer";
import { em, verifyTemplate } from "./templates";

export async function subscribe(request: Request, env: Env) {
  // get email from body
  const json = await request.formData();
  const email = json.get("email");
  const match = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (match == null) {
    return new Response("Invalid Email — " + email, { status: 400 });
  }
  const { success } = await env.SIGNUP_RATELIMIT.limit({
    key: request.headers.get("cf-connecting-ip") || "",
  });
  if (!success) {
    return new Response("Try Again Later", { status: 429 });
  }
  const verificationKey = crypto.randomUUID().replaceAll("-", "");
  await env.SUBSCRIBERS.prepare(
    "INSERT INTO subscribers (email,verified,verificationKey) VALUES (?,false,?)"
  )
    .bind(email, verificationKey)
    .run();
  await sendEmail(
    [
      {
        email,
        uuid: verificationKey,
      },
    ],
    "KamalaCamoVerify",
    env
  );
  return new Response("Check Your Email For A Confirmation", { status: 200 });
}
