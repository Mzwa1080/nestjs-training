import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from '../../src/songs/song.entity';
import { SongsModule } from 'src/songs/songs.module';
import { CreateSongDTo } from 'src/songs/dto/create-song-dto';

describe('Songs - /songs', () => {
    let app: INestApplication;
  
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [
          AppModule,
          TypeOrmModule.forRoot({
            type: 'postgres',
            url: 'postgres://postgres:root@localhost:5432/spotify_clone_03',
            synchronize: true,
            entities: [Song],
            dropSchema: true,
          }),
          SongsModule,
        ],
      }).compile();
  
      app = moduleRef.createNestApplication();
      await app.init();
    });
  
    afterEach(async () => {
      const songsRepository = app.get('SongRepository');
      await songsRepository.clear();
      await app.close(); // Close the app to free up resources
    });
  
    const createSong = async (createSongDTO: CreateSongDTo): Promise<Song> => {
      const song = new Song();
      song.title = createSongDTO.title;
      song.artists = createSongDTO.artists; // Add these lines
      song.releasedDate = createSongDTO.releasedDate;
      song.duration = createSongDTO.duration;
      song.lyrics = createSongDTO.lyrics;
  
      const songRepo = app.get('SongRepository');
      return await songRepo.save(song);
    };
//   ########################################################################
    it('/GET songs', async () => {
      const newSong = await createSong({
        title: 'aaaa',
        artists: 'nnnn',
        releasedDate: '2020-02-20',
        duration: '02:02',
        lyrics: 'iiiiiiiiiiiiiiiiii',
      });
  
      const results = await request(app.getHttpServer()).get('/songs');
      expect(results.statusCode).toBe(200);
      expect(results.body).toHaveLength(1);
      expect(results.body[0]).toMatchObject({ 
        title: 'aaaa',
        artists: 'nnnn',
        releasedDate: '2020-02-20',
        duration: '02:02',
        lyrics: 'iiiiiiiiiiiiiiiiii',
      });
    });
  });
