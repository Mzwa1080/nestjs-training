import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name)


    // @Cron('5 * * * * * ') //This executes the debug code after 5 seconds
    // myCronTask() {
    //     this.logger.debug('Called when the current second is 5')
    // }
}   
