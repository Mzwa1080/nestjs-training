import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Artists } from "../src/artists/artist.entity";
import { Playlist } from "../src/playlists/playlist.entity";
import { Song } from "../src/songs/song.entity";
import { Users } from "../src/users/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {

    database: 'spotify_clone_03',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    // port : 3306
    username: 'postgres',
    password: 'root',
    // Regitstering entities
    entities: [Users, Playlist, Song, Artists],
    synchronize: false,
    migrations: ['dist/db/migrations/*.js']

}
// const dataSource = new DataSource(dataSourceOptions);
// export default dataSource;

export const typeOrmAsyncConfig : TypeOrmModuleAsyncOptions = {
    imports : [ConfigModule],
    inject : [ConfigService],

    useFactory:async (configService:ConfigService):Promise<TypeOrmModuleOptions> =>{
        const isProduction = process.env.NODE_ENV === 'production';

          return {
            type: 'postgres',
            host: isProduction ? configService.get<string>('DB_HOST') : 'localhost',
            port: isProduction ? +configService.get<number>('DB_PORT') : 5432,
            username: isProduction ? configService.get<string>('USERNAME') : 'postgres',
            password: isProduction ? configService.get<string>('PASSWORD') : 'root',
            database: isProduction ? configService.get<string>('DB_NAME') : 'spotify_clone_03',
            entities: [Users, Playlist, Song, Artists],
            synchronize: false,
            migrations: ['dist/db/migrations/*.js'],
        };
    }
}
