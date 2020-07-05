import { getRepository } from 'typeorm';
import { Service } from 'typedi';
import { Song } from "../db/entity/Song";

@Service()
export default class SongService {
  async fetchSongs() {
    const userRepository = getRepository(Song);
    const songs = await userRepository.find();
    return songs;
  }

  async insertSong(song: Song) {
    const userRepository = getRepository(Song);
    let newSong = new Song(song);
    console.log(newSong)
    // Create logger here to find out why not always saving newSong, probably due to artists array
    const songs = await userRepository.save(newSong);
    return 'success';
  }

  async updateSong(song: Song) {
    const userRepository = getRepository(Song);
    let songToUpdate = await userRepository.save(song); 
    return song;
  }

}