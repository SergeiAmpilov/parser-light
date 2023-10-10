import { inject, injectable } from "inversify";
import { TYPES } from "../container/types";
import { PrismaService } from "../prisma/prisma.service";
import { SeoParserDto } from "./dto/seoparser.task.dto";
import { SeoTaskModel } from "@prisma/client";
import axios from "axios";
import { parseString } from "xml2js";
import { ILogger } from "../logger/logger.interface";


@injectable()
export class SeoParserService {
  constructor(
    @inject(TYPES.PrismaService) private readonly prismaService: PrismaService,
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
  ) {}

  public async run({ url }: SeoParserDto): Promise<SeoTaskModel> {
    return this.prismaService.client.seoTaskModel.create({
      data: {
        url
      }
    });
  }

  public async getSitemaps( url: string, taskid: number ): Promise<void> {

    const baseUrl = `${url}sitemap.xml`;

    const { data } = await axios.get(baseUrl);

    parseString(data, (err, result) => {
      if (err) {
        this.loggerService.error('[SeoParserService]', err)
      } else {
        this.loggerService.log('[SeoParserService]', result)
      }
    });


  }
}