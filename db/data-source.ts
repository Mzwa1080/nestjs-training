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
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

export const typeOrmAsyncConfig : TypeOrmModuleAsyncOptions = {
    imports : [ConfigModule],
    inject : [ConfigService],

    useFactory:async (configService:ConfigService):Promise<TypeOrmModuleOptions> =>{
        return {
            type:'postgres',
            host : configService.get<string>('DB_HOST'),
            port : +configService.get<number>('DB_PORT'),
            username : configService.get<string>('USERNAME'),
            database : configService.get<string>('DB_NAME'),
            password : configService.get<string>('PASSWORD'),
            entities : [Users, Playlist, Song, Artists],
            synchronize : false,
            migrations: ['dist/db/migrations/*.js']


        }
    }
}