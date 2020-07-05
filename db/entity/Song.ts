import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Song {

    constructor(song: Song){
      Object.assign(this, song);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 300})
    name: string;

    @Column()
    artists: string;

    @Column()
    timelineDate: Date;

    @Column()
    previewURL: string;

    @Column()
    imageURL: string;

    @Column()
    importance: number;

    @Column()
    x: number;

    @Column()
    y: number;
}
