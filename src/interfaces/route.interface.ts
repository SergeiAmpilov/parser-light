import { Request, Response, NextFunction } from "express";
import { MiddlewareFunction } from "./middleware.function";
import { IMiddleware } from "./middleware.interface";

export interface IRoute {
  path: string;
  method: 'get' | 'post' | 'delete' | 'patch';
  func: MiddlewareFunction;
  middleware?: IMiddleware[];
}


