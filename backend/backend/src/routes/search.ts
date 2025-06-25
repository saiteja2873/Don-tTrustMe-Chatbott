// routes/search.ts
import { Hono } from "hono";
import { askGemini } from "../utils/askGemini"; // ✅ correct path
import { cors } from "hono/cors";

const searchRoute = new Hono();
searchRoute.use("/*", cors());

searchRoute.post("/", async (c) => {
  const body = await c.req.json();
  const prompt = body.prompt || body.search;

  if (!prompt) {
    return c.json({ error: "Missing 'search' field" }, 400);
  }

  const reply = await askGemini(prompt);
  return c.json({ reply });
});

export default searchRoute;
