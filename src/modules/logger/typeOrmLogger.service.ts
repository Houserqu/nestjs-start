import {Logger} from "typeorm";
import { Logger as LoggerService } from './logger.service'

export class TypeOrmLogger implements Logger {
  constructor(
    private readonly loggerService: LoggerService
  ) {}
  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: any[]): any {
    this.loggerService.loggerDB.info(query, parameters)
  }
  /**
   * Logs query that is failed.
   */
  logQueryError(error: string, query: string, parameters?: any[]): any {
    this.loggerService.loggerDB.error(error, query, parameters)
  }
  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: any[]): any {
    this.loggerService.loggerDB.warn(time, query, parameters)
  }
  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message): any{
    this.loggerService.loggerDB.info(message)
  }
  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string): any {
    this.loggerService.loggerDB.info(message)
  }

  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(level: "log" | "info" | "warn", message: any): any {
    this.loggerService.loggerDB[level](message)
  }
}