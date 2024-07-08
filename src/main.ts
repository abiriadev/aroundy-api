import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NetworkConfig } from '@/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const networkConfigService = app.get(NetworkConfig);

  await app.listen(networkConfigService.port);
  console.log(`Application is running on: ${networkConfigService.port}`);
}
bootstrap();
