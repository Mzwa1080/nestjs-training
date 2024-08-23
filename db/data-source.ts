import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Artists } from "../src/artists/artist.entity";
import { Playlist } from "../src/playlists/playlist.entity";
import { Song } from "../src/songs/song.entity";
import { Users } from "../src/users/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {

    database: 'spotify_migration',
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
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

export const typeOrmAsyncConfig : TypeOrmModuleAsyncOptions = {
    imports : [ConfigModule],
    inject : [ConfigService],

    useFactory:async (configService:ConfigService):Promise<TypeOrmModuleOptions> =>{
        return {
            type:'postgres',
            host : configService.get<string>('dbHost'),
            port : configService.get<number>('dbPort'),
            username : configService.get<string>('username'),
            database : configService.get<string>('dbName'),
            password : configService.get<string>('password'),
            entities : [Users, Playlist, Song, Artists],
            synchronize : false,
            migrations: ['dist/db/migrations/*.js']


        }
    }
}