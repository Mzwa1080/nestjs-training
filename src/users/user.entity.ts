import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Playlist } from '../playlists/playlist.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'


@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @ApiProperty({
        example : 'Doe',
        description : 'Provide the lastName of the user',
    })
    @Column()
    lastName: string;

    @ApiProperty({
        example : 'Jane@gmail.com',
        description : 'Provide the email of the user',
    })
    @Column({ unique: true })
    email: string;


    @ApiProperty({
        description : 'Provide the lastName of the user'
    })
    @Column()
    @Exclude()
    password: string

    @Column({ nullable: true, type: 'text' })
    twoFASecret: string;


    @Column({ default: false, type: 'boolean' })
    enable2FA: boolean;


    @Column()
    apiKey:string;

    // @Column()
    // phone: string;
    @OneToMany(()=> Playlist, (playList)=>playList.user)
    playLists : Playlist[]

    // @ManyToOne(()=>Playlist, (playlist)=> playlist.song)
    // Playlist : Playlist


}