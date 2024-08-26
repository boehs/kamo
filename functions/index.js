export async function onRequest(context) {
  const { request, env } = context;
  const response = await env.ASSETS.fetch(request);
  const inStock = env.STATUS.get("inStock");
  return new HTMLRewriter()
    .on(".wrapper > span", {
      element(element) {
        if (inStock === "true") {
          element.setInnerContent("in stock now");
        }
      },
    })
    .on("body", {
      element(element) {
        if (inStock === "true") {
          // add the in stock class
          element.setAttribute("class", "inStock");
        }
      },
    })
    .transform(response);
}
