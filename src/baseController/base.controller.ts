import { Router, Response } from "express";
import { IBaseController } from "./base.controller.interface";
import 'reflect-metadata';
import { injectable } from "inversify";

@injectable()
export abstract class BaseController implements IBaseController {

  private readonly _router: Router;

  constructor() {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public send<T>(res: Response, code: number = 200, msg: T) {
    return res.status(code).json(msg);
  }

  public ok<T>(res: Response,  msg: T) {
    return this.send<T>(res, 200, msg);
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  protected bindRoutes() {}

  
} 