import { describe, expect, it } from "vitest";
import { createClient } from "./client";
import { streamRender } from "./generated/renders/renders";

describe("generated render stream transport", () => {
  it("returns raw SSE text rather than claiming a parsed event", async () => {
    const frame = 'event: complete\ndata: {"outputUrl":null,"outputExpiresAt":null,"duration":null}\n\n';
    createClient({
      baseUrl: "https://api.example/v1",
      fetch: (async () => new Response(frame, {
        headers: { "content-type": "text/event-stream" },
      })) as typeof fetch,
    });
    const raw: string = await streamRender("project", "render");
    expect(raw).toBe(frame);
  });
});
