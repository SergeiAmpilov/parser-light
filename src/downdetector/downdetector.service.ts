import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../container/types";
import { DownDetectorTaskOptions } from "./downdetector.taskoptions.type";
import axios from 'axios';


@injectable()
export class DownDetectorService {

  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
  ) {}

  async run({ url }: DownDetectorTaskOptions) {
    try {
      const { status, statusText } = await axios.get(url);
      this.loggerService.log(`(DownDetectorService)`, status, statusText );
    } catch (e) {
      this.loggerService.error(`(DownDetectorService)`, 'fall down' );
    }
  }

}