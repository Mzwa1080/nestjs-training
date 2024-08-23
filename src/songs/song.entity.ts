// import {Artist} from 'src/artists/artist.entity'
// import { Playlist } from 'src/playlists/playlist.entity';

import { Artists } from '../artists/artist.entity';
import { Users } from '../users/user.entity';
import{
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('songs')
export class Song{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title : string;
    
    // @Column('varchar',{array:true})
    // artists:string[]
    
    @Column('date')
    releasedDate: string;

    @Column('time')
    duration : string;

    @Column('text')
    lyrics : string;



    @ManyToMany(()=> Artists, (artist)=> artist.songs, {cascade:true})
    // Joining table and also renaming it
    @JoinTable({name : 'songs_artists'})
    artists: Artists[]

    @ManyToOne(() => Users, (user) => user.playLists)
    user: Users
}
