import { Context } from "koa";
import { injectable } from "inversify";
import { BorisRouter } from "@/router";

@injectable()
export class HelloWorldController {
  @BorisRouter.Get("/")
  async getHelloWorld(ctx: Context) {
    ctx.body = "Hello World!";
  }

  @BorisRouter.Post("/123")
  async getHelloWorld1(ctx: Context) {
    ctx.body = "Hello World 123!";
  }
}
