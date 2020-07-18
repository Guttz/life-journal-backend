import app from '../app-server';
import supertest from 'supertest';
import { getConnection } from 'typeorm';
import { createConnection } from 'typeorm';
import { Song } from '../db/entity/Song';

const request = supertest(app);
let JWTToken: string;

beforeAll(async () => {
  await createConnection().then(() => console.log('Connected to database!'));
});

afterAll(async () => getConnection().close());

describe('testing endpoint', () => {
  it(': /auth/login', async (done) => {
    const response = await request.post('/auth/login').send({
      username: 'gustavo',
      password: '1234',
    });
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(999);
    JWTToken = response.body.token;
    done();
  });

  it(': /spotify/spotify-search', async (done) => {
    const response = await request.post('/spotify/spotify-search').set('Authorization', JWTToken).send({
      queryTerm: 'amado',
    });
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.tracks).toBeDefined();
    done();
  });

  it(': /song/fetchSongs', async (done) => {
    const response = await request.post('/song/fetchSongs').set('Authorization', JWTToken);
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
    expect(new Song(response.body[0])).toBeInstanceOf(Song);
    done();
  });

  it(': /song/insertSong', async (done) => {
    const newSong: Song = {
      id: 'testid',
      name: 'The music history',
      artists: JSON.stringify(['Mc Anônimo']),
      timelineDate: new Date(),
      previewURL:
        'https://p.scdn.co/mp3-preview/6bca32671e4b4ad1ffd06098116156b25c2ecb03?cid=21dbe53cbabe4f03b2ad3090342a7bbc',
      imageURL: 'https://i.scdn.co/image/ab67616d00004851b6fc75952c040034b98be0d3',
      importance: 0.5,
      x: 150,
      y: 150,
    };
    const parsedSong = JSON.stringify(newSong);
    const response = await request.post('/song/insertSong').set('Authorization', JWTToken).send({ song: parsedSong });
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');

    // Testing for cosistency in data inserted
    const insertedSong = new Song(response.body);
    insertedSong.artists = JSON.parse(insertedSong.artists);
    insertedSong.timelineDate = new Date(insertedSong.timelineDate);
    expect(insertedSong).toBeInstanceOf(Song);
    expect(insertedSong).toMatchObject(newSong);

    done();
  });

  it(': /song/updateSong', async (done) => {
    const newSong: Song = {
      id: 'testid',
      name: 'The UPDATED music history',
      artists: JSON.stringify(['Mc Anônimo']),
      timelineDate: new Date(),
      previewURL:
        'https://p.scdn.co/mp3-preview/6bca32671e4b4ad1ffd06098116156b25c2ecb03?cid=21dbe53cbabe4f03b2ad3090342a7bbc',
      imageURL: 'https://i.scdn.co/image/ab67616d00004851b6fc75952c040034b98be0d3',
      importance: 0.5,
      x: 150,
      y: 150,
    };
    const parsedSong = JSON.stringify(newSong);
    const response = await request.post('/song/updateSong').set('Authorization', JWTToken).send({ song: parsedSong });
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');

    // Testing for cosistency in data updated
    const insertedSong = new Song(response.body);
    insertedSong.artists = JSON.parse(insertedSong.artists);
    insertedSong.timelineDate = new Date(insertedSong.timelineDate);
    expect(insertedSong).toBeInstanceOf(Song);
    expect(insertedSong).toMatchObject(newSong);

    done();
  });
});
