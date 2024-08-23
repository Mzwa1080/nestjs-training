import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from './songs.service';
import { FindOneOptions, Repository } from 'typeorm';
import { Song } from './song.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSongDTo } from './dto/create-song-dto';
import { updateSongDTO } from './dto/update-song.dto';

describe('SongsService', () => {
  let service: SongsService;
  let repo: Repository<Song>;
  const oneSong = { id: "a uuid", title: "Lover" };
  const songArray = [{ id: "a uuid", title: "Lover" }];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongsService,
        {
        provide: getRepositoryToken(Song),
        useValue: {
        find: jest
        .fn()
        .mockImplementation(() => Promise.resolve(songArray)),
        findOneOrFail: jest
        .fn()
        .mockImplementation((options: FindOneOptions<Song>) => {
        return Promise.resolve(oneSong);
        }),
        create: jest
        .fn()
        .mockImplementation((createSongDTO: CreateSongDTo) => {
        return Promise.resolve(oneSong);
        }),
        save: jest.fn(),
        update: jest
        .fn()
        .mockImplementation(
        (id: string, updateSongDTO: updateSongDTO) => {
        return Promise.resolve(oneSong);
        },
        ),
        delete: jest
        .fn()
        .mockImplementation((id: string) =>
        Promise.resolve({ affected: 1 }),
        ),
        },
        },
        ],
    }).compile();

    service = module.get<SongsService>(SongsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
// ######################### DO AT HOME PROPERLY ######################################################3

//  
  // it("should give me the song by id", async () => {
  //   const song = await service.getSong("a uudi");
  //   const repoSpy = jest.spyOn(repo, "findOneOrFail");
  //   expect(song).toEqual(oneSong);
  //   expect(repoSpy).toBeCalledWith({ where: { id: "a uudi" } });
  //   });
//############################################################################################# 
    
});
