import {
  Injectable,
  LogLevel,
  LoggerService as NestLoggerService,
} from '@nestjs/common';
import { Logger } from 'tslog';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly tslog = new Logger();

  log(message: unknown, ...optionalParams: unknown[]) {
    this.tslog.info(message, ...optionalParams);
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    this.tslog.error(message, ...optionalParams);
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    this.tslog.warn(message, ...optionalParams);
  }

  debug?(message: unknown, ...optionalParams: unknown[]) {
    this.tslog.debug(message, ...optionalParams);
  }

  verbose?(message: unknown, ...optionalParams: unknown[]) {
    this.tslog.trace(message, ...optionalParams);
  }

  fatal?(message: unknown, ...optionalParams: unknown[]) {
    this.tslog.fatal(message, ...optionalParams);
  }

  setLogLevels?(_levels: LogLevel[]) {
    throw new Error('Method not implemented.');
  }
}
