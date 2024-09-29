import { Container } from "inversify";
import { ServiceNames } from "@/constant/ServiceNames";
import { App } from "@/services/app";
import { Configs } from "@/config";
import { HelloWorldController } from "@/controller/HelloWorldController";
import { BorisRouter } from "@/router";

export class IOC {
  private static instance: IOC;

  private container: Container;

  private constructor() {
    this.container = new Container();
    this.bindServices();
  }

  static get<T>(serviceName: ServiceNames): T {
    if (!IOC.instance) {
      IOC.instance = new IOC();
    }
    return IOC.instance.container.get(serviceName) as T;
  }

  private bindServices() {
    this.bindApplication();
    this.bindRouter();
  }

  private bindRouter() {
    this.container.bind(HelloWorldController).toSelf();
    this.container.bind(ServiceNames.Router).to(BorisRouter);
  }

  private bindApplication() {
    this.container.bind<App>(ServiceNames.App).to(App).inSingletonScope();

    this.container
      .bind<Configs>(ServiceNames.Configs)
      .to(Configs)
      .inSingletonScope();
  }
}
