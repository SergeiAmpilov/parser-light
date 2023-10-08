import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "../interfaces/middleware.interface";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { VALIDATE_ERROR_STATUS_CODE } from "./validate.error.constants";



export class ValidateMiddleware implements IMiddleware {
  constructor(
    private classToValidate: ClassConstructor<object>
  ) { }

  async execute({ body }: Request, res: Response, next: NextFunction): Promise<void> {
    const instance = plainToClass(this.classToValidate, body);

    const errors = await validate(instance);

    if (errors.length) {
      res.status(VALIDATE_ERROR_STATUS_CODE).send({ errors });
    } else {
      next();
    }
  }
}