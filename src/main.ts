import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NetworkConfig } from '@/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const networkConfigService = app.get(NetworkConfig);

  SwaggerModule.setup(
    'openapi',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build(),
    ),
  );

  await app.listen(networkConfigService.port);
  console.log(`Application is running on: ${networkConfigService.port}`);
}
bootstrap();
