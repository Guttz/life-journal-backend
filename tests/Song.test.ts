import app from '../app-server';
import supertest from 'supertest';
import { getConnection } from 'typeorm';
import { createConnection } from 'typeorm';

const request = supertest(app);
let JWTToken: string;

beforeAll(async () => {
  await createConnection().then(() => console.log('Connected to database!'));
});

afterAll(async () => getConnection().close());

describe('endpoint', () => {
  it('tests: /auth/login', async (done) => {
    const response = await request.post('/auth/login').send({
      username: 'gustavo',
      password: '1234',
    });
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(999);
    JWTToken = response.body.token;
    done();
  });

  it('tests: /spotify/spotify-search', async (done) => {
    const response = await request
      .post('/spotify/spotify-search')
      .send({
        queryTerm: 'amado',
      })
      .set('Authorization', JWTToken)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body.tracks).toBeDefined();
    done();
  });
});
