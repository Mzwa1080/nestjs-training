import { Song } from "../songs/song.entity";
import {  Users } from "../users/user.entity";
import { Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('artists')
export class Artists{

   @PrimaryGeneratedColumn()
   id: number;


   @OneToOne(()=> Users)
   @JoinColumn()
   user :Users


   @ManyToMany(()=> Song, (song) => song.artists)
   songs:Song[]
}