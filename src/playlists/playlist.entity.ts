import {Users} from '../users/user.entity'

import{
    Column, 
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity('Playlist')
export class Playlist{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

// Eacg playlist will have multiple songs
    // @OneToMany(()=> Song,(song)=> song.artists)
    // song : Song[];



// Many playlist can belong to a single unique user

@ManyToOne(() => Users, (user)=> user.playLists)
    user : Users;


}