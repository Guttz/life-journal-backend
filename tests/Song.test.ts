import app from '../app';
import supertest from 'supertest';
import { getConnection } from 'typeorm';
const request = supertest(app);

console.log('AAAAAAAAAAAAAAAAAAAAA');


it('gets the test endpoint', async (done) => {
  
  const response = await request.post('/auth/login').send({
    username: 'gustavo',
    password: '1234',
  });
  let get = app._router.stack.filter(r => r.route && r.route.methods.get).map(r => r.route.path);
  let post = app._router.stack.filter((r) => r.route && r.route.methods.post).map((r) => r.route.path);
  console.log(get, post);
  //const response = await request.get('/test');
  console.log(response.text);
  expect(response.status).toBe(200);
  //expect(response.body.id).toBe(999);
  
  getConnection().close();
  // ...
  done();
});
