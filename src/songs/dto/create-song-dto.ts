import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSongDTo{

    @IsString()
    @IsNotEmpty()
    readonly title : string

    @IsNotEmpty()
    @IsArray()
    @IsNumber({},{each:true})
    readonly artists;

    @IsNotEmpty()
    @IsDateString()
    @IsOptional()
    readonly releasedDate : string;

    @IsString()
    @IsNotEmpty()
    readonly duration: string;

    @IsString()
    @IsOptional()
    readonly lyrics: string

}