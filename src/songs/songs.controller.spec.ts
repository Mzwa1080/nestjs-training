import { Test, TestingModule } from '@nestjs/testing';
import { SongsController } from './songs.controller';
import { Artists } from '../artists/artist.entity';
import { SongsService } from './songs.service';

describe('SongsController', () => {
  let controller: SongsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongsController],
      providers: [
        // SongsService,
        {
          provide : SongsService,
          useValue : {
            getSongs: jest.fn().mockResolvedValue([{id:1, title:'Dancing feet'}]),
          }
        }

      ]
    }).compile();

    controller = await module.resolve<SongsController>(SongsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get songs', ()=> {
    it('should fetch all the songs', async ()=>{
      const songs = await controller.getSongs()
      expect(songs).toEqual([{id:1, title:'Dancing feet'}])
    })
  })
  
});
