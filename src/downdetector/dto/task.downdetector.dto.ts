
import { IsString, IsUrl } from 'class-validator';

export class TaskDownDetectorDto {

  @IsString()
  @IsUrl()
  url: string;

}