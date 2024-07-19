import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(
    private appConfigService: ConfigService.App,
    private networkConfigService: ConfigService.Network,
  ) {}

  @Get()
  async index() {
    return {
      image: this.appConfigService.imageTag ?? null,
      host: this.networkConfigService.url,
      openapi: `${this.networkConfigService.url}/openapi`,
      metrics: `${this.networkConfigService.url}/metrics`,
    };
  }
}
