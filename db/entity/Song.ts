import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Song {
  constructor(song: Song) {
    Object.assign(this, song);
    /*  this.id = song?.id ? song.id : 'toBeDefined';
    this.artists = song?.artists;
    this.imageURL = song?.imageURL;
    this.importance = song?.importance;
    this.name = song?.name;
    this.previewURL = song?.previewURL;
    this.timelineDate = song?.timelineDate;
    this.x = song?.x;
    this.y = song.y; */
  }

  @PrimaryColumn({ length: 25 })
  id: string;

  @Column({ length: 300 })
  name: string;

  @Column()
  artists: string;

  @Column()
  timelineDate: Date;

  @Column()
  previewURL: string;

  @Column()
  imageURL: string;

  @Column('double')
  importance: number;

  @Column()
  x: number;

  @Column()
  y: number;
}
