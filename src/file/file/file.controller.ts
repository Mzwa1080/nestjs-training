import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {


    // Use Get Rout to dowload the file


    @Get('stream-file')
    getFile1() : StreamableFile{
        const file = createReadStream(join(process.cwd(), 'package.json'))
        return new StreamableFile(file)
    }
// ============= downloading any file, by specifying the image content time=====
    @Get('stream-file-customize')
    getFileCustomizedResponse(@Res({passthrough : true}) res) : StreamableFile {
        const file = createReadStream(join(process.cwd(), 'package.json'))
        res.set({
            'Content-Type' : 'application/json',
            'Content-Disposition' : 'attachment; filename="package.json',
        })
        return new StreamableFile(file)
    }

}
