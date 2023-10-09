
import { IsString, IsUrl, IsBoolean, IsBooleanString } from 'class-validator';

export class TaskDownDetectorDto {

  @IsString()
  @IsUrl()
  url: string;

  @IsString()
  feedback: string;

}