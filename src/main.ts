import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@/config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });

  const { port, host } = app.get(ConfigService.Network);

  SwaggerModule.setup(
    'openapi',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Aroundy')
        .setDescription('Aroundy 앱 및 어드민 페이지 공용 API')
        .setVersion('phase1')
        .addServer(`http://127.0.0.1:${port}`, 'local server')
        .addServer(`https://${host}:${port}`, 'production server')
        .setExternalDoc(
          'Notion',
          'https://www.notion.so/Aroundy-550556a8fa18413ea0e0bce1b415eb17',
        )
        .build(),
    ),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}
bootstrap();
