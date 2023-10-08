import { inject, injectable } from "inversify";
import { BaseController } from "../baseController/base.controller";
import { TYPES } from "../container/types";
import { ILogger } from "../logger/logger.interface";
import { Request, Response, NextFunction } from "express";

@injectable()
export class HwController extends BaseController {

  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
  ) {
    
    super(loggerService);

    this.bindRoutes([
      {
        path: '/hw',
        method: "get",
        func: this.hw
      },
    ]);
  }


  hw(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'hello world');
  }
}