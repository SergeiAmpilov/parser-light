import 'reflect-metadata';
import express, { Express, NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';


@injectable()
export class App {

  app: Express;
  port: number;

  constructor() {
    this.app = express();
    this.port = process.env?.PORT ? Number(process.env.PORT) : 3000;
  }

  public init() {
    this.app.listen(
      this.port,
      () => console.log(`Server has been started http://localhost:${this.port}}`)
    )
  }

}