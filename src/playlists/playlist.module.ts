import { Module } from "@nestjs/common";
// import {PlayListsController} from './playlitst.controller'
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "./playlist.entity";
// import {PlayListsService} from './playlists.entity'
import { Song } from "../songs/song.entity";
import { Users } from "../users/user.entity";

@Module({
    imports : [TypeOrmModule.forFeature([Playlist, Song, Users])],
    // controllers : [PlayListsController],
    // providers:[PlayListsService],
})
export class PlayListModule{

} 