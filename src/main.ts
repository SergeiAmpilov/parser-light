import { App } from "./app/app";
import { Container, ContainerModule, interfaces } from "inversify";
import { TYPES } from "./container/types";
import { LoggerService } from "./logger/logger.service";
import { ILogger } from "./logger/logger.interface";


export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App);
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
});


function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();