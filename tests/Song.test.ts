import app from '../app-server';
import supertest from 'supertest';
import { getConnection } from 'typeorm';
import { createConnection, useContainer } from 'typeorm';
import routes from './../routes';
import { Container } from 'typedi';

const request = supertest(app);

beforeAll(async () => {
  await createConnection().then(() => console.log('Connected to database!'));
});

afterAll(async () => getConnection().close());

it('gets the test endpoint', async (done) => {
  const response = await request.post('/auth/login').send({
    username: 'gustavo',
    password: '1234',
  });
  const get: any = app._router.stack.filter((r: any) => r.route && r.route.methods.get).map((r: any) => r.route.path);
  const post: any = app._router.stack.filter((r: any) => r.route && r.route.methods.post).map((r: any) => r.route.path);
  console.log(get, post);
  console.log(response.text);
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(999);
  done();
});
