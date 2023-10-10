import { inject, injectable } from "inversify";
import { BaseController } from "../baseController/base.controller";
import { TYPES } from "../container/types";
import { ILogger } from "../logger/logger.interface";
import { Request, Response, NextFunction } from "express";
import { ValidateMiddleware } from "../validate/validate.middleware";
import { SeoParserDto } from "./dto/seoparser.task.dto";
import { SeoParserService } from "./seoparser.service";
import { SeoTaskModel } from "@prisma/client";




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
      }
    ]);
  }


  async render(req: Request, res: Response, next: NextFunction) {
    const list = await this.seoParserService.getSeoTaskList();
    return res.render('seoparser', { list });
  }

  async run({ body }: Request<{}, {}, SeoParserDto>, res: Response, next: NextFunction) {
    
    const { id }: SeoTaskModel = await this.seoParserService.run(body);

    this.seoParserService.parseSitemaps(body.url, id);
    

    return res.send(`seoparser task has been started - ${ id }`);

  }
}