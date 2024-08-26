export async function unsubscribe(request: Request, env: Env) {
  const uuid = request.url.split("/")[2];
  const subscriber = await env.SUBSCRIBERS.prepare(
    "UPDATE TABLE subscribers SET verified = -1 WHERE verificationKey = ?"
  )
    .bind(uuid)
    .run();
  return Response.redirect("https://kamalacamo.org/unsubscribe");
}
