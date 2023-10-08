import { inject, injectable } from "inversify";
import { BaseController } from "../baseController/base.controller";
import { TYPES } from "../container/types";
import { ILogger } from "../logger/logger.interface";
import { Request, Response, NextFunction } from "express";


@injectable()
export class DownDetectorController extends BaseController {
  
  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
  ) {
    
    super(loggerService);

    this.bindRoutes([
      {
        path: '/downdetector',
        method: "get",
        func: this.dd
      },
    ]);
  }

  dd(req: Request, res: Response, next: NextFunction) {
    return this.ok(res, 'downdetector');
  }
}