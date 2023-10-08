import 'reflect-metadata';
import express, { Express, NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../container/types';
import { HwController } from '../hello-world/hello.world.controller';


@injectable()
export class App {

  app: Express;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
    @inject(TYPES.HwController) private readonly hwController: HwController,
  ) {
    this.app = express();
    this.port = process.env?.PORT ? Number(process.env.PORT) : 3000;
  }

  useRoutes() {
    this.app.use(this.hwController.router);
  }

  public init() {

    this.useRoutes();

    this.app.listen(
      this.port,
      () => this.loggerService.log('App', `Server has been started http://localhost:${this.port}}`)
    )
  }

}