import {
  Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, Req, Request, Res, Session, UploadedFile, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { User } from './user.decorator';
import { UserEntity } from './user.entity';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  loginUser(@Session() session: Record<string, any>){
    session.user = {id:1, username : 'Mzwamadoda Louw'}
      return `${session.user.username} has logged in!`;
    
  }

  // @Get('profile')
  // @UseGuards(JwtAuthGuard)

  @Get('profile')
  profile(@Session() session:Record<string, any>){
    const user =  session.user
    if(user){
      return `Hello , ${user.username}`
    }
    else{
      return 'Not logged in'
    }
  }


  // JWT 
  @ApiBearerAuth('JWT-auth')
  getProfile(@Request() request) {
    return request.user
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: any) {
    console.log(file)
  }



  @Post('upload-png')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/files',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFileWithValidation(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return {
      messge: 'file uploaded successfully!',
    };
  }

  @Get('/user/:id')
  findOne(
    @User()
    user: UserEntity,
  ) {
    console.log(user);
    return user;
  }




  @Get('set-cookie')
  setCookie(
    @Res({ passthrough: true })
    response: Response,
  ) {
    response.cookie('userID', '12232123');
    response.send('Cookie Saved Successfully');
  
  
  }



}
