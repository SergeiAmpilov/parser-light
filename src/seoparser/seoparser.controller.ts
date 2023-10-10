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


  render(req: Request, res: Response, next: NextFunction) {
    return res.render('seoparser');
  }

  async run({ body }: Request<{}, {}, SeoParserDto>, res: Response, next: NextFunction) {


    /*
    
     мне нужны три таблички
      1 - сеопарсер таск - содержит список запущенных тасков - ид, дата старта, сайтмэпов спаршено, страниц спаршено
      2 - сеопарсер сайтмэп - список сайтмэпов в привязке к владельцу - таску - по ид
      3 - сеопарсер пейдж - собственно страница. точто так же в привязке к ид таска и ид сайтмэпа
             - содержит сначала тупо список страниц а потом страница обогащается данными о тегах тайтл х1 дескрипшен
    */
    
    const { id }: SeoTaskModel = await this.seoParserService.run(body);

    // после создания таска, запускаем в привязке к нему парсинг сайтмэпов
    this.seoParserService.getSitemaps(body.url, id);

    

    return res.send(`seoparser task has been started - ${ id }`);

  }
}