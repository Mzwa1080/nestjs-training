import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, Req, Request, Scope, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTo } from './dto/create-song-dto';
import { Connection } from '../common/constants/connection';
import path from 'path';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { updateSongDTO } from './dto/update-song.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from '../auth/artists-jwt-guard';
import { request } from 'http';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Songs')
@Controller({ path: 'songs', scope: Scope.REQUEST })
export class SongsController {

    constructor(private songService: SongsService) {
    }

    @Post()
    @UseGuards(ArtistJwtGuard)
    create(@Body() CreateSongDTo: CreateSongDTo, @Request() req): Promise<Song> {
        console.log(req.user);
        
        return this.songService.create(CreateSongDTo)
    }

    // IMPLEMENTING PAGINATION
    // @Get()
    // findAll(
    //     @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    //     @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,): Promise<Pagination<Song>> {

    //     limit = limit > 100 ? 100 : limit
    //     return this.songService.paginate({
    //         page, limit
    //     })
    // }

    @Get()
    getSongs() : Promise<Song[]> {
        try {
        return  this.songService.getSongs()
        } 
        catch (error) {
            throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR,
                {
                    cause: error
                }
            )
        }
    }
//  ######## FIX
    // @Get(':id')
    // getSong(@Param('id', ParseIntPipe) id: string): Promise<Song> {
    //     return this.songService.getSong(id)
    // }
// 
    @Put(':id')
    updateSong(@Param('id', ParseIntPipe) id: number, @Body() updateDTO: updateSongDTO): Promise<UpdateResult> {
        return this.songService.update(id, updateDTO)
    }

    @Delete(':id')
    deleteSong(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.songService.remove(id)
    }


}
