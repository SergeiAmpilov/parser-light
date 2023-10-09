import { inject, injectable } from "inversify";
import { TYPES } from "../container/types";
import { PrismaService } from "../prisma/prisma.service";


@injectable()
export class SeoParserService {
  constructor(
    @inject(TYPES.PrismaService) private readonly prismaService: PrismaService,
  ) {}

  public async run(url: string) {

  }
}