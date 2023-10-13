import { inject, injectable } from "inversify";
import { BaseController } from "../baseController/base.controller";
import { TYPES } from "../container/types";
import { ILogger } from "../logger/logger.interface";
import { Request, Response, NextFunction } from "express";
import { ValidateMiddleware } from "../validate/validate.middleware";
import { SeoParserDto } from "./dto/seoparser.task.dto";
import { SeoParserService } from "./seoparser.service";
import { SeoTaskModel } from "@prisma/client";
import { ParsePagesDto } from "./dto/parse-pages.dto";
import { ParseTagsDto } from "./dto/parse-tags.dto";
import { ITag } from "./interfaces/tags.interface";




@injectable()
export class SeoParserController extends BaseController {
  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
    @inject(TYPES.SeoParserService) private readonly seoParserService: SeoParserService,
  ) {
    super(loggerService);


    this.bindRoutes([
      {
        path: '/seoparser/render',
        method: 'get',
        func: this.render
      },
      {
        path: '/seoparser/run',
        method: 'post',
        func: this.run,
        middleware: [
          new ValidateMiddleware(SeoParserDto)
        ]
      },
      {
        path: '/seoparser/parsepages',
        method: 'post',
        func: this.parsepages,
        middleware: [
          new ValidateMiddleware(ParsePagesDto)
        ]
      },
      {
        path: '/seoparser/renderpages',
        method: 'get',
        func: this.renderpages,
      },
      {
        path: '/seoparser/sitemaps/:id',
        method: 'get',
        func: this.renderSitemap
      },
      {
        path: '/seoparser/parsetags',
        method: 'post',
        func: this.parseTags,
        middleware: [
          new ValidateMiddleware(ParseTagsDto)
        ]
      }
    ]);
  }


  async render(req: Request, res: Response, next: NextFunction) {
    const list = await this.seoParserService.getSeoTaskList();
    const listParsed = list.map((el) => {
      return {
        ...el,
        date: new Date(el.createdAt).toLocaleDateString('ru-RU'),
      }
    });

    return res.render('seoparser', { list: listParsed });
  }

  async renderSitemap(req: Request, res: Response, next: NextFunction) {

    const list = await this.seoParserService.getSitemapListByTaskId(Number(req.params.id));
    const listParsed = list.map((el) => {
      return {
        ...el,
        date: new Date(el.lastmod).toLocaleString('ru-RU')
      };
    });
    return res.render('sitemap', {
      taskid: req.params.id,
      list: listParsed,
    });
  }

  async run({ body }: Request<{}, {}, SeoParserDto>, res: Response, next: NextFunction) {
    
    const { id }: SeoTaskModel = await this.seoParserService.run(body);

    await this.seoParserService.parseSitemaps(body.url, id);

    return res.json({ id });

  }

  async parsepages({ body }: Request<{}, {}, ParsePagesDto>, res: Response, next: NextFunction) {
    await this.seoParserService.parsePages(body.url, body.taskid);
    return res.status(200).json({ message: 'started parsing pages' });
  }

  async renderpages(req: Request, res: Response, next: NextFunction) {

    const { sitemap, taskid } = req.query;
    const list = await this.seoParserService.getPagesBySitemap(String(sitemap), Number(taskid));

    return res.render('pages', {
      sitemap,
      taskid,
      list
    });

  }

  async parseTags({ body }: Request<{}, {}, ParseTagsDto>, res: Response, next: NextFunction) {

    const result: ITag = await this.seoParserService.parseTagsByPage(body.id);
    
    return res.status(201).json({ ...result });
  }
}