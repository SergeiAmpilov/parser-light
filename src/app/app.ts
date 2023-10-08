import 'reflect-metadata';
import bodyParser from 'body-parser';
import express, { Express, NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../container/types';
import { HwController } from '../hello-world/hello.world.controller';
import { DownDetectorController } from '../downdetector/downdetector.controller';


@injectable()
export class App {

  app: Express;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
    @inject(TYPES.HwController) private readonly hwController: HwController,
    @inject(TYPES.DownDetectorController) private readonly downDetectorController: DownDetectorController,
  ) {
    this.app = express();
    this.port = process.env?.PORT ? Number(process.env.PORT) : 3000;
  }

  useBodyParse() {
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    this.app.use(bodyParser.json())
  }

  useRoutes() {
    this.app.use(this.hwController.router);
    this.app.use(this.downDetectorController.router);
  }

  public init() {

    this.useBodyParse();
    this.useRoutes();

    this.app.listen(
      this.port,
      () => this.loggerService.log('App', `Server has been started http://localhost:${this.port}`)
    )
  }

}