import { Body, Controller, Post } from "@nestjs/common";
import { PlayListsService } from "./playlists.service";
import { CreatePlayListDTO } from "../songs/dto/create-playlist.dto";



@Controller('Playlists')
export class PlayListsController{
    constructor(private playListService : PlayListsService){}

    // @Post()
    // create(@Body()  playlistDTO : CreatePlayListDTO, ):Promise<Playlist>{
    //     return this.playListService.create(playlistDTO)
    // }
}