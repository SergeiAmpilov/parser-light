import 'reflect-metadata';
import bodyParser from 'body-parser';
import express, { Express, NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../container/types';
import { HwController } from '../hello-world/hello.world.controller';
import { DownDetectorController } from '../downdetector/downdetector.controller';
import { PrismaService } from '../prisma/prisma.service';
import cors from 'cors';
import path from 'path';
import { engine } from 'express-handlebars';



@injectable()
export class App {

  app: Express;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
    @inject(TYPES.HwController) private readonly hwController: HwController,
    @inject(TYPES.DownDetectorController) private readonly downDetectorController: DownDetectorController,
    @inject(TYPES.PrismaService) private readonly prismaService: PrismaService,
  ) {
    this.app = express();
    this.port = process.env?.PORT ? Number(process.env.PORT) : 3000;
  }

  async usePrisma() {
    await this.prismaService.connect();
  }

  useBodyParse() {
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    this.app.use(bodyParser.json())
  }

  useCors() {
    this.app.use(cors())
  }

  useStatic() {
    this.app.use(
      express.static(
        path.join(
          path.dirname(path.dirname(__dirname)), 
          'public'
        )
      )
    );
  }

  useRender() {
    this.app.engine('hbs', engine({
      defaultLayout: 'main',
      extname: 'hbs'
    }));
    this.app.set('view engine', 'hbs');
    this.app.set('views', './views');
  }

  useRoutes() {
    this.app.use(this.hwController.router);
    this.app.use(this.downDetectorController.router);
  }

  public async init() {

    this.useCors();
    this.useBodyParse();
    this.useRoutes();
    this.useStatic();
    this.useRender();
    await this.usePrisma();

    this.app.listen(
      this.port,
      () => this.loggerService.log('[App]', `Server has been started http://localhost:${this.port}`)
    )
  }

}