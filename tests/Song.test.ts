import app from '../app';
import supertest from 'supertest';
import { getConnection } from 'typeorm';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';


console.log('AAAAAAAAAAAAAAAAAAAAA');

const request = supertest(app);

beforeAll(async () => {
  await createConnection().then(() => console.log('connected!!!!!!!!!!!!!!!!!!!'));
  //request = supertest(app);
});

it('gets the test endpoint', async (done) => {
  const response = await request.post('/auth/login').send({
    username: 'gustavo',
    password: '1234',
  });
  const get: any = app._router.stack.filter((r: any) => r.route && r.route.methods.get).map((r: any) => r.route.path);
  const post: any = app._router.stack.filter((r: any) => r.route && r.route.methods.post).map((r: any) => r.route.path);
  console.log(get, post);
  //const response = await request.get('/test');
  //console.log(response);
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(999);
  
  getConnection().close();
  // ...
  done();
});
