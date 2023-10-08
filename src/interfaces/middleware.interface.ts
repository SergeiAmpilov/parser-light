import { MiddlewareFunction } from "./middleware.function";

export interface IMiddleware {
  execute: MiddlewareFunction;
}