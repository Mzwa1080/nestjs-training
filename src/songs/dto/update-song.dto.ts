import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class updateSongDTO{
    @IsString()
    @IsOptional()
    readonly title : string

    @IsOptional()
    @IsArray()
    @IsNumber({}, {each:true})
    readonly artists;

    
    @IsOptional()
    @IsDateString()
    readonly releasedDate : string;


    @IsString()
    @IsOptional()
    readonly duration: string;

    @IsString()
    @IsOptional()
    readonly lyrics: string
}