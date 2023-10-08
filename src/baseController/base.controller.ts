import { Router, Response } from "express";
import { IBaseController } from "./base.controller.interface";
import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { IRouteController } from "../interfaces/route.interface";
import { MiddlewareFunction } from "../interfaces/middleware.function";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../container/types";
import { LoggerService } from "../logger/logger.service";

@injectable()
export abstract class BaseController implements IBaseController {

  private readonly _router: Router;

  constructor(
    private readonly logger: LoggerService,

  ) {
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

  protected bindRoutes(routes: IRouteController[]) {

    for (const route of routes) {

      this.logger.log(`[${route.method}] ${route.path}`);

      const middlewaresPipeline: MiddlewareFunction[] = route.middleware ? route.middleware.map( f => f.execute.bind(f) ) : [];

      this._router[route.method]( route.path, [...middlewaresPipeline, route.func.bind(this) ] );
      
    }
   
  }

  
} 