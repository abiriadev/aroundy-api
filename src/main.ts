import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigType } from './config/config.schema';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<ConfigType> = app.get(ConfigService);
  const port = configService.get('PORT', { infer: true });
  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}
bootstrap();
