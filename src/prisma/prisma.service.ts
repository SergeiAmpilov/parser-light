import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../container/types";
import { PrismaClient } from "@prisma/client";


@injectable()
export class PrismaService {

  client: PrismaClient;

  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
  ) {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.loggerService.log('[PrismaService]', 'Connected to DB sucessful');
    } catch (e) {
      this.loggerService.error('[PrismaService]', 'Error connectiong database', e);
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}