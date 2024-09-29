import "reflect-metadata";
import { IOC } from "@/container";
import { ServiceNames } from "@/constant/ServiceNames";
import { App } from "@/services/app";

IOC.get<App>(ServiceNames.App).start();
