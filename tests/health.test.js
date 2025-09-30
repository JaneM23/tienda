const request = require('supertest');
const { createApp } = require('../app');

const app = createApp();

test('GET /health responde ok', async () => {
  const res = await request(app).get('/health');
  expect(res.status).toBe(200);
  expect(res.body.ok).toBe(true);
});