import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Artists } from "../src/artists/artist.entity";
import { Playlist } from "../src/playlists/playlist.entity";
import { Song } from "../src/songs/song.entity";
import { Users } from "../src/users/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config'
const isProduction = process.env.NODE_ENV === 'production';
export const dataSourceOptions: DataSourceOptions = {

    type: 'postgres',
    host: isProduction ? process.env.DB_HOST : 'localhost',
    port: isProduction ? parseInt(process.env.DB_PORT, 10) : 5432, // Convert to number
    username: isProduction ? process.env.USERNAME : 'postgres',
    password: isProduction ? process.env.PASSWORD : 'root',
    database: isProduction ? process.env.DB_NAME : 'spotify_clone_03',
    entities: [Users, Playlist, Song, Artists],
    synchronize: false,
    migrations: ['dist/db/migrations/*.js']

}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;


// const dataSourceOptions: DataSourceOptions = {
//  ,
// };

// export const typeOrmAsyncConfig : TypeOrmModuleAsyncOptions = {
//     imports : [ConfigModule],
//     inject : [ConfigService],

//     useFactory:async (configService:ConfigService):Promise<TypeOrmModuleOptions> =>{
//         return {
//             type:'postgres',
//             host : configService.get<string>('DB_HOST'),
//             port : +configService.get<number>('DB_PORT'),
//             username : configService.get<string>('USERNAME'),
//             database : configService.get<string>('DB_NAME'),
//             password : configService.get<string>('PASSWORD'),
//             entities : [Users, Playlist, Song, Artists],
//             synchronize : false,
//             migrations: ['dist/db/migrations/*.js']


//         }
//     }
// }