import { inject, injectable } from "inversify";
import { BaseController } from "../baseController/base.controller";
import { TYPES } from "../container/types";
import { ILogger } from "../logger/logger.interface";
import { Request, Response, NextFunction } from "express";
import { DownDetectorService } from "./downdetector.service";
import { TaskDownDetectorDto } from "./dto/task.downdetector.dto";
import { ValidateMiddleware } from "../validate/validate.middleware";


@injectable()
export class DownDetectorController extends BaseController {
  
  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
    @inject(TYPES.DownDetectorService) private readonly downDetectorService: DownDetectorService,
  ) {
    
    super(loggerService);

    this.bindRoutes([
      {
        path: '/downdetector',
        method: "get",
        func: this.dd
      },
      {
        path: '/downdetector/run',
        method: "post",
        func: this.run,
        middleware: [
          new ValidateMiddleware(TaskDownDetectorDto)
        ]
      },
    ]);
  }

  dd(req: Request, res: Response, next: NextFunction) {
    return this.ok(res, 'downdetector');
  }

  run({ body }: Request<{}, {}, TaskDownDetectorDto>, res: Response, next: NextFunction) {
    this.downDetectorService.run({ url: body.url })
    return this.ok(res, 'test was started');
  }
}