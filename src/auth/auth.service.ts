import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '..//users/users.service';
import { LoginDTO } from './dto/login.dto';
// import { Users } from '..//users/user.entity';
import * as bcrypt from 'bcryptjs' 
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from '..//artists/artists.service';
import { Enable2FAType, PayloadType } from './types';
import * as speakeasy from 'speakeasy';
import { UpdateResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {

    constructor(private userService : UsersService, 
        private configService : ConfigService,
        
        private jwtService: JwtService, private artistService : ArtistsService){ }

// We are trying to find a user based on email
    async login(@Body() loginDto : LoginDTO) : Promise<{accessToken:string} | {validate2FA:string; message:string }>{
        const user = await this.userService.findOne(loginDto);

        const passwordMatched = await bcrypt.compare( loginDto.password, user.password)
    
        if(passwordMatched){
            delete user.password;
            // Send JWT token back into the response
            const payload:PayloadType = {email:user.email, userId:user.id}
            const artist = await this.artistService.findArtist(user.id)
            if(artist){
                payload.artistId = artist.id
            }if(user.enable2FA && user.twoFASecret){
                return {
                    validate2FA : 'http://localhost:3000/auth/validate-2fa',
                    message : " Please sends the one time password/token from your google authenticator app"
                }
            }
            return {

                accessToken:this.jwtService.sign(payload)
            }
        }else{
            throw new UnauthorizedException('Password does not match')
        }
    }

   async enable2FA(userId : number) : Promise<Enable2FAType>{
        const user = await this.userService.findById(userId)
        if(user.enable2FA){
            return { secret: user.twoFASecret}
        }
        const secret = speakeasy.generateSecret()
        console.log(secret);
        user.twoFASecret = secret.base32;
        await this.userService.updateSecretKey(user.id, user.twoFASecret)
        return {secret : user.twoFASecret}
        

    }
// IT ACCEPTS USER VALIDATION PIN - WHICH IS THE [ONE TIME PASSWORD FROM THE AUTHENTICATOR] 
    async validate2FAToken(  userId :number , token : string,):Promise<{verified : boolean}>{
      try {
        const user = await this.userService.findById(userId)

        const verified = speakeasy.totp.verify({
            secret : user.twoFASecret,
            token: token,
            encoding : 'base32'
        })

        if(verified){
            return {verified: true}
        } else{
            return {verified:false}
        }

      } catch (error) {
        throw new UnauthorizedException('Error verifyibg token')
      }
    }

    async disable2FA(userId:number):Promise<UpdateResult>{
        return this.userService.disbale2FA(userId)
    }

    async validateUserByApiKey(apiKey : string){
        return this.userService.findByApiKey(apiKey)
    }

    getEnvVariable(){
        return this.configService.get<number>('port')
    }

    
}
