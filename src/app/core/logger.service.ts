import { Inject, Injectable } from '@angular/core';
import { LOGGER } from './logger.token';
import { LogLevel } from './log-level.enum';
import { APP_CONFIG } from './app-config.token';
import { AppConfig } from './app-config';
import { Logger } from './logger';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private readonly minimumLevel: LogLevel;
  constructor(@Inject(LOGGER) private loggers: Logger[], @Inject(APP_CONFIG) config: AppConfig) {
    const level = config.logging.minimumLevel as keyof typeof LogLevel;
    this.minimumLevel = LogLevel[level];
  }

  public trace(message?: any, ...optionalParams: any[]): void {
    if (this.minimumLevel > LogLevel.trace) {
      return;
    }
    console.log(LogLevel.trace);
    this.loggers.forEach((logger) => logger.trace(message, optionalParams));
  }
  public debug(message?: any, ...optionalParams: any[]): void {
    if (this.minimumLevel > LogLevel.debug) {
      return;
    }
    this.loggers.forEach((logger) => logger.debug(message, optionalParams));
  }
  public info(message?: any, ...optionalParams: any[]): void {
    if (this.minimumLevel > LogLevel.information) {
      return;
    }
    this.loggers.forEach((logger) => logger.info(message, optionalParams));
  }
  public warn(message?: any, ...optionalParams: any[]): void {
    if (this.minimumLevel > LogLevel.warning) {
      return;
    }
    this.loggers.forEach((logger) => logger.warn(message, optionalParams));
  }
  public error(message?: any, ...optionalParams: any[]): void {
    if (this.minimumLevel > LogLevel.error) {
      return;
    }
    this.loggers.forEach((logger) => logger.error(message, optionalParams));
  }
  public critical(message?: any, ...optionalParams: any[]): void {
    if (this.minimumLevel > LogLevel.critical) {
      return;
    }
    this.loggers.forEach((logger) => logger.critical(message, optionalParams));
  }
}
