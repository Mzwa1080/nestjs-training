import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "./playlist.entity";
import { Repository } from "typeorm";
import { Song } from "../songs/song.entity";
import { Users } from "../users/user.entity";
import { CreatePlayListDTO } from "../songs/dto/create-playlist.dto";

@Injectable()
export class PlayListsService{
    constructor(
        @InjectRepository(Playlist)
        private playListRepo : Repository<Playlist>,

        @InjectRepository(Song)
        private songsRepo : Repository<Song>,

        @InjectRepository(Users)
        private userRepo : Repository<Users>,
    ){}

//     async create(playListDTO : CreatePlayListDTO) : Promise<Playlist>{
//         const playList = new Playlist()
//         playList.name = playListDTO.name
//     }
// // songs will be an array of ids that we are getting from the DTO object
//     const songs = await this.songsRepo.findByIds(playlistDTO.songs);

// // set the relation for the songs with playlist entity
//     playList.songs = this.songs

//     const user = await this.userRepo.findOneBy({id:playListDTO.user});
//     playList.user = this.user
//     return this.playListRepo.save[playList]
}