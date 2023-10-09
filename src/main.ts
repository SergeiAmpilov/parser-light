import { App } from "./app/app";
import { Container, ContainerModule, interfaces } from "inversify";
import { TYPES } from "./container/types";
import { LoggerService } from "./logger/logger.service";
import { ILogger } from "./logger/logger.interface";
import { HwController } from "./hello-world/hello.world.controller";
import { DownDetectorController } from "./downdetector/downdetector.controller";
import { DownDetectorService } from "./downdetector/downdetector.service";
import { PrismaService } from "./prisma/prisma.service";
import { IndexPageController } from "./index-page/index.page.controller";
import { SeoParserController } from "./seoparser/seoparser.controller";


export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App);
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<HwController>(TYPES.HwController).to(HwController);
  bind<DownDetectorController>(TYPES.DownDetectorController).to(DownDetectorController);
  bind<DownDetectorService>(TYPES.DownDetectorService).to(DownDetectorService);
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService);
  bind<IndexPageController>(TYPES.IndexPageController).to(IndexPageController);
  bind<SeoParserController>(TYPES.SeoParserController).to(SeoParserController);  
});


function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();