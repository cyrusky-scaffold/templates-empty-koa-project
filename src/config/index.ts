import { injectable } from "inversify";
import { config } from "dotenv";
import * as process from "node:process";

config();

@injectable()
export class Configs {
  port = process.env.PORT || 3000;
}
