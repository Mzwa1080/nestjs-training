import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from '../common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artists } from '../artists/artist.entity';


const mockSongsService = {
  findAll(){
    return [{ id:1, title:'Feel good now', artist:['Moneybagg yo']}]
  },
};


@Module({
  imports : [TypeOrmModule.forFeature([Song, Artists])],
  controllers: [SongsController],
  providers: [SongsService,

    {

      provide:'CONNECTION',
      useValue : connection
    }
  ],
})


export class SongsModule {


    
}
