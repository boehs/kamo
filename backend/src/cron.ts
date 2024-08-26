import { sendEmail } from "./mailer";

export async function cron(env: Env) {
  const text = await (
    await fetch("https://store.kamalaharris.com/harris-walz-printed-camo-hat/")
  ).text();
  let status = await env.STATUS.get("inStock");
  let inStock =
    text.includes("<li>American made, union printed</li>") &&
    !text.includes("<span>Sold Out</span>");
  if (inStock && status !== "true") {
    await env.STATUS.put("inStock", "true");
    // get all subscribers
    const subscribers = await env.SUBSCRIBERS.prepare(
      "SELECT email,verificationKey FROM subscribers WHERE verified = 1 ORDER BY id ASC"
    ).all();
    // chunk into groups of 14
    const chunks = [];
    while (subscribers.results.length) {
      chunks.push(subscribers.results.splice(0, 14));
    }
    for (const chunk of chunks) {
      // send emails
      await sendEmail(
        chunk.map((s) => ({
          email: s.email as string,
          uuid: s.verificationKey as string,
        })),
        "KamalaCamoNotify",
        env
      );
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
  } else if (!inStock && status !== "false") {
    await env.STATUS.put("inStock", "false");
  }
}
