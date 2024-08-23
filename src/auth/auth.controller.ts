import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from '..//songs/dto/create-user.dto';
import { Users } from '..//users/user.entity';
import { UsersService } from '..//users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-guard';
import { Enable2FAType } from './types';
import { ValidateTokenDTO } from './dto/validate-token.dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(private userService: UsersService, private authService: AuthService) { }

    @Post('signup')
    @ApiOperation({summary: "register new user"})
    @ApiResponse({
        status : 201,
        description : 'It will return the user in the response',
    })
    signup(@Body() userDTO: CreateUserDTO,): Promise<Users> {
        return this.userService.create(userDTO)
    }

    @Post('login')
    @ApiOperation({summary: "login user"})
    @ApiResponse({
        status : 200,
        description : 'It will give you the access token in the response',
    })
    login(@Body() loginDTO: LoginDTO) {
        return this.authService.login(loginDTO)
    }

    @Get('enable-2fa')
    @UseGuards(JwtAuthGuard)
    enable2FA(@Request() req,): Promise<Enable2FAType> {
        console.log(req.user);
        return this.authService.enable2FA(req.user.userId)
    }

    @Post('validate-2fa')
    @UseGuards(JwtAuthGuard)
    validate2FA(@Request() req, @Body()ValidateDTO : ValidateTokenDTO,): Promise<{verified : boolean}>{
        return this.authService.validate2FAToken(req.user.userId,ValidateDTO.token,)
    }

    @Get('disable-2fa')
    @UseGuards(JwtAuthGuard)
    disable2FA(@Request() req,) : Promise<UpdateResult>{
        return this.authService.disable2FA(req.user.userId)
    }

    @Get('profile')
    @UseGuards(AuthGuard('bearer'))
    getProfile(@Request() req){
        delete req.user.password;
        return {
            msg : 'aunthenticated with api key',
            user : req.user,
        }
    }

    @Get('test')
    testEnvVariable(){
        return this.authService.getEnvVariable()
    }
}



