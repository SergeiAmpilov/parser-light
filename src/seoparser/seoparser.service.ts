import { inject, injectable } from "inversify";
import { TYPES } from "../container/types";
import { PrismaService } from "../prisma/prisma.service";
import { SeoParserDto } from "./dto/seoparser.task.dto";
import { SeoTaskModel } from "@prisma/client";


@injectable()
export class SeoParserService {
  constructor(
    @inject(TYPES.PrismaService) private readonly prismaService: PrismaService,
  ) {}

  public async run({ url }: SeoParserDto): Promise<SeoTaskModel> {
    return this.prismaService.client.seoTaskModel.create({
      data: {
        url
      }
    });
  }
}