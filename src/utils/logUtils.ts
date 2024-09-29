import log4js from "log4js";
import * as process from "node:process";
import * as path from "node:path";

log4js.configure({
  appenders: {
    console: {
      type: "console", // 控制台输出
      layout: {
        type: "colored", // 使用color模式让控制台输出分类更加鲜明
      },
    },
    file: {
      type: "file",
      filename:
        process.env.LOG_PATH ||
        path.join(__dirname, "..", "..", "logs", "access.log"), // 要打入到文件的位置
      pattern: "yyyy-MM-dd.log", // 使用正则将日志分按天或者月分为不同文件
      alwaysIncludePattern: true, // 当为 true 时，log 文件名会包含之前设置的 pattern 信息 (默认为 false，但是强烈建议开启)
    },
  },
  categories: {
    default: {
      appenders: ["console", "file"],
      level: process.env.NODE_ENV === "development" ? "all" : "info",
    },
  },
});

export class LogUtils {
  static getLogger(category: string = "default") {
    return log4js.getLogger(category);
  }

  static log(message: string, category: string = "default") {
    LogUtils.getLogger(category).log(message);
  }

  static trace(message: string, category: string = "default") {
    LogUtils.getLogger(category).trace(message);
  }

  static debug(message: string, category: string = "default") {
    LogUtils.getLogger(category).debug(message);
  }

  static info(message: string, category: string = "default") {
    LogUtils.getLogger(category).info(message);
  }

  static warn(message: string, category: string = "default") {
    LogUtils.getLogger(category).warn(message);
  }

  static error(message: string, category: string = "default") {
    LogUtils.getLogger(category).error(message);
  }
}
