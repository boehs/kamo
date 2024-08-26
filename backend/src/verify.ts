export async function verify(request: Request, env: Env) {
  const uuid = new URL(request.url).pathname.split("/")[3];
  const subscriber = await env.SUBSCRIBERS.prepare(
    "UPDATE subscribers SET verified = 1 WHERE verificationKey = ?"
  )
    .bind(uuid)
    .run();
  return Response.redirect("https://kamalacamo.org/verify");
}
