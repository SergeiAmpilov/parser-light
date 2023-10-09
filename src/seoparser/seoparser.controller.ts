import { inject, injectable } from "inversify";
import { BaseController } from "../baseController/base.controller";
import { TYPES } from "../container/types";
import { ILogger } from "../logger/logger.interface";
import { Request, Response, NextFunction } from "express";
import { ValidateMiddleware } from "../validate/validate.middleware";
import { SeoParserDto } from "./dto/seoparser.task.dto";
import { SeoParserService } from "./seoparser.service";




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


  render(req: Request, res: Response, next: NextFunction) {
    return res.render('seoparser');
  }

  async run({ url }: Request<{}, {}, SeoParserDto>, res: Response, next: NextFunction) {
    
    this.seoParserService.run(url);
    return 'seoparser task has been started';
    
  }
}