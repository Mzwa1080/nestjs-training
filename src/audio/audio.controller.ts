import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('audio')
export class AudioController {
    constructor(@InjectQueue('audio-queue') private readonly audioQueue:Queue){}0

    @Post('converter')
    async convert(){
        await this.audioQueue.add('convert', {
            file : 'sample.wav', 
            id : 1      
        })
    }

}
