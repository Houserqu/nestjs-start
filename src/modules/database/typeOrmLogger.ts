import {Logger} from "typeorm";
import { loggerDB } from "@src/common/Log4j.logger";

export class TypeOrmLogger implements Logger{
  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: any[]): any {
    loggerDB.info(query, parameters)
  }
  /**
   * Logs query that is failed.
   */
  logQueryError(error: string, query: string, parameters?: any[]): any {
    loggerDB.error(error, query, parameters)
  }
  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: any[]): any {
    loggerDB.warn(time, query, parameters)
  }
  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message): any{
    loggerDB.info(message)
  }
  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string): any {
    loggerDB.info(message)
  }

  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(level: "log" | "info" | "warn", message: any): any {
    loggerDB[level](message)
  }
}