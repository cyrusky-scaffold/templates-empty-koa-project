import "reflect-metadata";
import { LogUtils } from "@/utils/logUtils";
import { injectable } from "inversify";
import Router from "@koa/router";

export interface RouterRecords {
  method:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD"
    | "ALL";
  path: string;
  target: object;
  propertyKey: string;
  descriptor: PropertyDescriptor;
}

@injectable()
export class BorisRouter {
  private static registerRoutes: RouterRecords[] = [];

  static Get(routerPath: string) {
    return BorisRouter.method("GET", routerPath);
  }

  static Post(routerPath: string) {
    return BorisRouter.method("POST", routerPath);
  }

  static Put(routerPath: string) {
    return BorisRouter.method("PUT", routerPath);
  }

  static Delete(routerPath: string) {
    return BorisRouter.method("DELETE", routerPath);
  }

  static Patch(routerPath: string) {
    return BorisRouter.method("PATCH", routerPath);
  }

  static Options(routerPath: string) {
    return BorisRouter.method("OPTIONS", routerPath);
  }

  static Head(routerPath: string) {
    return BorisRouter.method("HEAD", routerPath);
  }

  static All(routerPath: string) {
    return BorisRouter.method("ALL", routerPath);
  }

  private static method(method: string, routerPath: string) {
    return function (
      target: object,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) {
      BorisRouter.addRouter({
        method: method as RouterRecords["method"],
        path: routerPath,
        target,
        propertyKey,
        descriptor,
      });
    };
  }

  private static hasRouterPath(records: RouterRecords) {
    return BorisRouter.registerRoutes.some((route) => {
      return route.method === records.method && route.path === records.path;
    });
  }

  private static addRouter(routerRecord: RouterRecords) {
    if (BorisRouter.hasRouterPath(routerRecord)) {
      LogUtils.warn(`Router path ${routerRecord.path} already exists!`);
    } else {
      BorisRouter.registerRoutes.push(routerRecord);
    }
  }

  getRoutes() {
    const router = new Router();
    BorisRouter.registerRoutes.forEach((route) => {
      LogUtils.trace(`Registering route ${route.method} ${route.path}`);
      switch (route.method) {
        case "GET":
          router.get(
            route.propertyKey,
            route.path,
            route.descriptor.value.bind(route.target),
          );
          break;
        case "POST":
          router.post(route.path, route.propertyKey, route.descriptor.value);
          break;
        case "PUT":
          router.put(route.path, route.propertyKey, route.descriptor.value);
          break;
        case "DELETE":
          router.delete(route.path, route.propertyKey, route.descriptor.value);
          break;
        case "PATCH":
          router.patch(route.path, route.propertyKey, route.descriptor.value);
          break;
        case "OPTIONS":
          router.options(route.path, route.propertyKey, route.descriptor.value);
          break;
        case "HEAD":
          router.head(route.path, route.propertyKey, route.descriptor.value);
          break;
        case "ALL":
          router.all(route.path, route.propertyKey, route.descriptor.value);
          break;
        default:
          break;
      }
    });
    return {
      routes: router.routes(),
      allowMethod: router.allowedMethods(),
    };
  }
}
