import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete ALTERA preview", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /ALTERA — Fashion Branding Concept Case \| VAZURI/i);
  assert.match(html, /FASHION/);
  assert.match(html, /ONE IDEA/);
  assert.match(html, /AFTER WATER/);
  assert.match(html, /rel="canonical"[^>]+vazuri-preview-liko-fashion-studio-public\//i);
  assert.match(html, /rel="(?:shortcut )?icon"[^>]+vazuri-preview-liko-fashion-studio-public\/favicon\.svg/i);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /Editorial branding translated into a digital experience/i);
  assert.match(html, /href="https:\/\/vazuri\.ru\/en#projects"/i);
  assert.match(html, /"isPartOf":\{"@type":"WebSite","name":"VAZURI"/i);
  assert.doesNotMatch(html, />\s*(Codex|ChatGPT|Your site is taking shape)\b/i);
});
