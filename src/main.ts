import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port } = app.get(ConfigService.Network);

  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}
bootstrap();
