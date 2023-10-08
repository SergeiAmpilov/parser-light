import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../container/types";
import axios from 'axios';
import { TaskDownDetectorDto } from "./dto/task.downdetector.dto";


@injectable()
export class DownDetectorService {

  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
  ) {}

  async run({ url, feedback }: TaskDownDetectorDto) {
    try {
      const { status, statusText } = await axios.get(url);
      this.loggerService.log(`(DownDetectorService)`, status, statusText );
    } catch (e) {
      this.loggerService.error(`(DownDetectorService)`, 'fall down' );
    }
  }

}