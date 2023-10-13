import { IsNumber } from 'class-validator';


export class ParseTagsDto {

  @IsNumber()
  id: number;

}