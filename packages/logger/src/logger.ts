import pino, { type LoggerOptions as PinoLoggerOptions } from "pino";
import { isDevelopment } from "./transport.js";
import type { LoggerOptions } from "./types.js";

export function createLogger(options: LoggerOptions) {
  const loggerOptions: PinoLoggerOptions = {
    name: options.service,
    level: options.level ?? process.env.LOG_LEVEL ?? "info",
  };

  if (isDevelopment) {
    loggerOptions.transport = {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    };
  }

  return pino(loggerOptions);
}