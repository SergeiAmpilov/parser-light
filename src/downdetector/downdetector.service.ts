import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../container/types";
import axios from 'axios';
import { TaskDownDetectorDto } from "./dto/task.downdetector.dto";
import { PrismaService } from "../prisma/prisma.service";
import { IDownDetectorTaskResult } from "./downdetector.taskresult.type";
import { DownDetectorTaskModel } from "@prisma/client";


@injectable()
export class DownDetectorService {

  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
    @inject(TYPES.PrismaService) private readonly prismaService: PrismaService,
  ) {}

  async run({ url, feedback }: TaskDownDetectorDto) {

    let result: any;


    try {
      const result = await axios.get(url);
      this.loggerService.log(`[DownDetectorService]`, result?.status, result?.statusText);

      if (feedback) {
        await this.makeFeedback();
      } else {
        await this.storeToDb({
          url, 
          issuccess: true,
          status: result.status,
          statusText: result.statusText,
        });
      }
    } catch (e) {
      this.loggerService.error(`[DownDetectorService]`, 'fall down' );

      if (feedback) {
        await this.makeFeedback();
      } else {
        await this.storeToDb({
          url, 
          issuccess: false,
          status: 0,
          statusText: 'fall down',
        });
      }
    }
    
  }


  async storeToDb(result: IDownDetectorTaskResult): Promise<DownDetectorTaskModel> {
    return this.prismaService.client.downDetectorTaskModel.create({
      data: {
        ...result,
      }
    });
  }

  async makeFeedback(): Promise<void> {
    // пока ничего не делаем. но это пока
  }

}


