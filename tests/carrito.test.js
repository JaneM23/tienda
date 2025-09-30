const request = require('supertest');
const jwt = require('jsonwebtoken');
const { createApp } = require('../app');

const app = createApp();
const token = jwt.sign({ id: 1, username: 'test' }, process.env.JWT_SECRET || 'dev_secret');

it('POST /api/carrito/add agrega item y devuelve total', async () => {
  const res = await request(app)
    .post('/api/carrito/add')
    .set('Authorization', `Bearer ${token}`)
    .send({ productId: '4', cantidad: 1 }); 
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body.items)).toBe(true);
  expect(res.body.total).toBeGreaterThan(0);
});