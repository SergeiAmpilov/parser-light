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
      }
    ]);
  }


  async render(req: Request, res: Response, next: NextFunction) {
    const list = await this.seoParserService.getSeoTaskList();
    return res.render('seoparser', { list });
  }

  async renderSitemap(req: Request, res: Response, next: NextFunction) {

    const list = await this.seoParserService.getSitemapListByTaskId(Number(req.params.id));
    return res.render('sitemap', {
      taskid: req.params.id,
      list,
    });
  }

  async run({ body }: Request<{}, {}, SeoParserDto>, res: Response, next: NextFunction) {
    
    const { id }: SeoTaskModel = await this.seoParserService.run(body);

    this.seoParserService.parseSitemaps(body.url, id);

    return res.send(`seoparser task has been started - ${ id }`);

  }

  async parsepages({ body }: Request<{}, {}, ParsePagesDto>, res: Response, next: NextFunction) {
    return this.seoParserService.parsePages(body.url, body.taskid);
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
}