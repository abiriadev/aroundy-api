import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Controller()
export class AppController {
  constructor(private networkConfigService: ConfigService.Network) {}

  @Get()
  index() {
    return {
      host: this.networkConfigService.url,
    };
  }
}
