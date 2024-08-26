/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { cron } from "./cron";
import { subscribe } from "./subscribe";
import { unsubscribe } from "./unsubscribe";
import { verify } from "./verify";

export default {
  async fetch(request, env, ctx): Promise<Response> {
    if (new URL(request.url).pathname.startsWith("/subscribe/")) {
      return subscribe(request, env);
    }
    if (new URL(request.url).pathname.startsWith("/verify/")) {
      return verify(request, env);
    }
    if (new URL(request.url).pathname.startsWith("/unsubscribe/")) {
      return unsubscribe(request, env);
    }
    return new Response("Not Found", { status: 404 });
  },
  async scheduled(event, env, ctx) {
    await cron(env);
  },
} satisfies ExportedHandler<Env>;
