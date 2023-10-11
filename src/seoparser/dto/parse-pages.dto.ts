import { IsNumber, IsString, IsUrl } from 'class-validator';

export class ParsePagesDto {

  @IsString()
  @IsUrl()
  url: string;

  @IsNumber()
  taskid: number;
  
}