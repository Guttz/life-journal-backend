import { getRepository } from 'typeorm';
import { Service } from 'typedi';
import { Song } from '../db/entity/Song';

@Service()
export default class SongService {
  async fetchSongs(): Promise<Song[]> {
    const userRepository = getRepository(Song);
    return userRepository.find();
  }

  async insertSong(song: Song): Promise<Song> {
    const userRepository = getRepository(Song);
    const newSong = new Song(song);
    return userRepository.save(newSong);
  }

  async updateSong(song: Song): Promise<Song> {
    const userRepository = getRepository(Song);
    return userRepository.save(song);
  }
}
