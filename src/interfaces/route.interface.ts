import { Router } from "express";
import { MiddlewareFunction } from "./middleware.function";
import { IMiddleware } from "./middleware.interface";

export interface IRouteController {
  path: string;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  func: MiddlewareFunction;
  middleware?: IMiddleware[];
}


