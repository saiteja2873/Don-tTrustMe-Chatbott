// index.ts
import { Hono } from 'hono';
import searchRoute from './routes/search';

const app = new Hono();

// Now accessible via POST /userinput
app.route('/userinput', searchRoute);

export default {
  port: 3000,
  fetch: app.fetch,
};
