import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session';

declare const module : any;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()),
  app.use(cookieParser());
  app.use(
    session({
      secret : 'my-secret',
      resave: false,
      saveUninitialized:false
    })
  )
  
//===== SETTING UP SWAGGER ========
  const config = new DocumentBuilder()
  .setTitle('Spotify Clone')
  .setDescription('The spotify clone Api documentation')
  .setVersion('1.0')
  .addBearerAuth({
    type : 'http',
    scheme: 'bearer',
    bearerFormat:'JWT',
    name: 'JWT',
    description : 'Enter JWT token',
    in : 'header',
  },
  'JWT-auth',
)
  .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
// ========= CLOSE SWAGGER SETUP ============

// console.log(configService.get<string>('NODE_ENV'))
  // const seedService = app.get(SeedService)
  // await seedService.seed()
  const configService = app.get(ConfigService)

  await app.listen(configService.get<number>('port'));

  
  // ======== HOT.MODULE ============

  if(module.hot){
    module.hot.accept()
    module.
    hot.dispose(()=> app.close())
  }
  // ======= END OF HOT MODULE =======
}
bootstrap();
