import { inject, injectable } from "inversify";
import { ServiceNames } from "@/constant/ServiceNames";
import { Configs } from "@/config";
import Koa from "koa";
import { LogUtils } from "@/utils/logUtils";
import { BorisRouter } from "@/router";

@injectable()
export class App {
  private app = new Koa();
  constructor(
    @inject<Configs>(ServiceNames.Configs) private configs: Configs,
    @inject<BorisRouter>(ServiceNames.Router) private router: BorisRouter,
  ) {
    const { routes, allowMethod } = this.router.getRoutes();
    this.app.use(routes).use(allowMethod);
  }

  start() {
    this.app.listen(this.configs.port, () => {
      LogUtils.log(
        `Server is running on http://localhost:${this.configs.port}`,
      );
    });
  }
}
