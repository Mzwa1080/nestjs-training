import { Injectable, Scope } from '@nestjs/common';
import { QueryBuilder, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTo } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { updateSongDTO } from './dto/update-song.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Artists } from '../artists/artist.entity';

// @Injectable(
//     {scope:Scope.TRANSIENT}
// )
export class SongsService {
    private readonly songs = []

    constructor(
        @InjectRepository(Song)
        private songsRepository : Repository<Song>,
        @InjectRepository(Artists)
        private artistsRepository : Repository<Artists>,
        
    ){}

   async create(songDTO : CreateSongDTo) : Promise<Song> {

        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        song.releasedDate = songDTO.releasedDate;

    //    find all the artists by their id
    const artists = await this.artistsRepository.findByIds(songDTO.artists)
    // set the relation with artist
    song.artists = artists

    return  this.songsRepository.save(song)
    }


    getSongs() :Promise<Song[]> {
        return this.songsRepository.find()
    }
// ######################### DO AT HOME PROPERLY ######################################################3

    getSong(id : string){
        // return this.songsRepository.findOneByOrFail({where:{id}})
    }
// ######################### DO AT HOME PROPERLY ######################################################3

    async remove(id:number) {
        return await this.songsRepository.delete(id)
    }

     update(id:number, updateSongDTO : updateSongDTO) : Promise<UpdateResult> {
        return  this.songsRepository.update(id, updateSongDTO)
    }

    async paginate(options : IPaginationOptions): Promise<Pagination<Song>>{
        const queryBuilder = this.songsRepository.createQueryBuilder('c')
        queryBuilder.orderBy('c.releasedDate', 'DESC')
        return paginate<Song>(queryBuilder, options)
    }
}
