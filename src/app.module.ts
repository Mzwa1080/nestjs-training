import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './songs/song.entity';
import { Users } from './users/user.entity';
import { Playlist } from './playlists/playlist.entity';
import { PlayListModule } from './playlists/playlist.module';
import { DataSource } from 'typeorm';
import { Artists } from './artists/artist.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ArtistsService } from './artists/artists.service';
import { ArtistsModule } from './artists/artists.module';
import { dataSourceOptions, typeOrmAsyncConfig } from '../db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configurations from './config/configurations';
import { validate } from '../env.validation';
import { TaskService } from './task/task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AudioModule } from './audio/audio.module';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FileController } from './file/file/file.controller';

const devConfig = {port : 3000};
const proConfig = {port : 4000}

@Module({
  imports: [
    SongsModule,
    PlayListModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    TypeOrmModule.forRoot(typeOrmAsyncConfig),
    SeedModule,
    // 
    ConfigModule.forRoot({
      // envFilePath : ['.env.development', '.env.production'],
      envFilePath : [`${process.cwd()}/.env.development`, `${process.cwd()}/.env.production`],
      isGlobal : true,
      load:[configurations],
      validate : validate
    }),
    ScheduleModule.forRoot(),
    AudioModule,
    BullModule.forRoot({
      redis:{
        host : 'localhost',
        port : 6379
      }
    }),
   EventEmitterModule.forRoot()
  ],
  controllers: [AppController, FileController],
  providers: [AppService,
    {provide:DevConfigService,
      useClass : DevConfigService
    },
    {
      provide : 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      }
    },
    TaskService,
  ],
})

// CHECKING THE CONNECTION IF ITS CONNECTED
export class AppModule{
  constructor() { }

}
