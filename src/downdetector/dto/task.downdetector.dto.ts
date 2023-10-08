
import { IsString, IsUrl, IsBoolean } from 'class-validator';

export class TaskDownDetectorDto {

  @IsString()
  @IsUrl()
  url: string;

  @IsBoolean()
  feedback: boolean;

}