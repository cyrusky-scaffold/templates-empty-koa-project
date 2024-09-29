import Router from "@koa/router";

export interface BorisRouter {
  getRouters: () => Router;
  bindRouter: () => void;

  get prefix(): string;
}
