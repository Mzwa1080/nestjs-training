import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artists } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {

    constructor(
        @InjectRepository(Artists) private artistRepository : Repository<Artists>
    ){}

    findArtist(userId : number) : Promise<Artists>{
// find the artist based on the userID
        return this.artistRepository.findOneBy({user : {id:userId}})
    }
}
