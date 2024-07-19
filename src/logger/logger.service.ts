import { ConfigService, LogLevel } from '@/config/config.service';
import {
  Injectable,
  LoggerService as NestLoggerService,
  LogLevel as NestLogLevel,
} from '@nestjs/common';
import { match } from 'ts-pattern';
import { Logger } from 'tslog';

@Injectable()
export class LoggerService<T = unknown> implements NestLoggerService {
  private readonly tslog;

  constructor(private readonly appConfigService: ConfigService.App) {
    this.tslog = new Logger<T>({
      name: 'app',
      minLevel: match(appConfigService.logLevel)
        .with(LogLevel.TRACE, () => 1)
        .with(LogLevel.DEBUG, () => 2)
        .with(LogLevel.INFO, () => 3)
        .with(LogLevel.WARN, () => 4)
        .with(LogLevel.ERROR, () => 5)
        .with(LogLevel.FATAL, () => 6)
        .exhaustive(),
      type: appConfigService.logFormat,
    });
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    this.tslog.info(message, ...optionalParams);
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    this.tslog.error(message, ...optionalParams);
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    this.tslog.warn(message, ...optionalParams);
  }

  debug(message: unknown, ...optionalParams: unknown[]) {
    this.tslog.debug(message, ...optionalParams);
  }

  verbose(message: unknown, ...optionalParams: unknown[]) {
    this.tslog.trace(message, ...optionalParams);
  }

  fatal(message: unknown, ...optionalParams: unknown[]) {
    this.tslog.fatal(message, ...optionalParams);
  }

  setLogLevels(_levels: NestLogLevel[]) {
    throw new Error('Method not implemented.');
  }

  context(name: string): LoggerService<T> {
    const child = Object.create(LoggerService.prototype, {});
    child.tslog = this.tslog.getSubLogger({
      name,
    });

    return child;
  }
}
