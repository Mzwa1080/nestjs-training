import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Job } from "bull";


@Processor('audio-queue')
export class AudioProcessor{
    private logger = new Logger(AudioProcessor.name);
    constructor(private eventEmitter : EventEmitter2){}

    @Process('convert')
    handleConvert(job : Job){
        this.logger.debug('start converting wav file to mp3')
        this.logger.debug(job.data)
        this.logger.debug('File converted successfully')
        this.eventEmitter.emit('audio.converted', job.data)
    }

}