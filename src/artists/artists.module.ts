import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artists } from './artist.entity';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Artists])],
    providers : [ArtistsService],
    controllers:[ArtistsController],
    exports: [ArtistsService]
})
export class ArtistsModule {}
