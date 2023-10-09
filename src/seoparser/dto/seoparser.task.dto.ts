import { IsString, IsUrl } from 'class-validator';


export class SeoParserDto {
  
  @IsString()
  @IsUrl()
  url: string;
  
}