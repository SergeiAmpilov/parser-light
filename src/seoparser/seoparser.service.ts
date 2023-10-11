import { inject, injectable } from "inversify";
import { TYPES } from "../container/types";
import { PrismaService } from "../prisma/prisma.service";
import { SeoParserDto } from "./dto/seoparser.task.dto";
import { PageModel, SeoTaskModel, SitemapModel } from "@prisma/client";
import axios from "axios";
import { parseString } from "xml2js";
import { ILogger } from "../logger/logger.interface";
import { ISiteMap } from "./interfaces/sitemap.interface";


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

  public async parseSitemaps( url: string, taskid: number ): Promise<void> {

    const baseUrl = `${url}sitemap.xml`;

    const { data } = await axios.get(baseUrl);

    parseString(data, async (err, result) => {
      if (err) {
        this.loggerService.error('[SeoParserService]', err)
      } else {

        const sitemapList: ISiteMap[] = result?.sitemapindex?.sitemap.map(
          (cSitemap: { loc: any[]; lastmod: any[]; }) => {
            return {
              loc: cSitemap.loc[0],
              lastmod: cSitemap.lastmod[0],
            }
          }
        );

        for (const cSitemap of sitemapList) {

          await this.prismaService.client.sitemapModel.create({
            data: {
              taskid,
              url: cSitemap.loc,
              lastmod: cSitemap.lastmod ?? '',
            }
          });

        }
        
      }
    });


  }

  public async getSeoTaskList(): Promise<SeoTaskModel[]> {
    return this.prismaService.client.seoTaskModel.findMany({
      orderBy: [
        { id: 'desc' },
        { createdAt: 'desc' }
      ]
    });
  }

  public async getSitemapListByTaskId(taskid: number): Promise<SitemapModel[]> {
    return this.prismaService.client.sitemapModel.findMany({
      where: { taskid }
    });
  }

  public async parsePages(url: string, id: number) {
    
    const { data } = await axios.get(url);

    parseString(data, async (err, result) => {
      if (err) {
        this.loggerService.error('[SeoParserService]', err)
      } else {
        if (result.hasOwnProperty('urlset')) {
          if (result.urlset.hasOwnProperty('url') && typeof result.urlset.url == 'object') {
            for (const { loc } of result.urlset.url) {
              
              await this.prismaService.client.pageModel.create({
                data: {
                  url: loc[0],
                  sitemap: url,
                  taskid: id
                }
              });              
            }
          }
        }
      }
    })


  }

  public async getPagesBySitemap(sitemap: string, taskid: number): Promise<PageModel[]> {
    return this.prismaService.client.pageModel.findMany({
      where: {
        taskid,
        sitemap,
      }
    });
  }
}