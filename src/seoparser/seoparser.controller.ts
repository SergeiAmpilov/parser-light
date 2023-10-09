import { inject, injectable } from "inversify";
import { BaseController } from "../baseController/base.controller";
import { TYPES } from "../container/types";
import { ILogger } from "../logger/logger.interface";
import { Request, Response, NextFunction } from "express";




@injectable()
export class SeoParserController extends BaseController {
  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
  ) {
    super(loggerService);


    this.bindRoutes([
      {
        path: '/seoparser/render',
        method: 'get',
        func: this.render
      }
    ]);
  }


  render(req: Request, res: Response, next: NextFunction) {
    return res.render('seoparser');
  }
}