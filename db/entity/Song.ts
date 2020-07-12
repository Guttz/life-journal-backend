import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Song {

    constructor(song: Song){
      Object.assign(this, song);
    }

    @PrimaryColumn({length: 25})
    id: string;

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

    @Column("double")
    importance: number;

    @Column()
    x: number;

    @Column()
    y: number;
}
