import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@/config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { LoggerService } from './logger/logger.service';
import fastify from 'fastify';

const bootstrap = async () => {
  const rawFastify = await fastify();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(rawFastify),
  );
  app.enableCors();

  const loggerService = app.get(LoggerService);
  app.useLogger(loggerService);

  const httpLogger = loggerService.context('http');

  rawFastify.addHook(
    'preValidation',
    ({ id, method, url, query, headers, body, ip }, _, next) => {
      httpLogger.verbose({
        type: 'request',
        id,
        ip,
        method,
        path: url,
        query,
        headers,
        body,
      });
      next();
    },
  );

  rawFastify.addHook(
    'preSerialization',
    (_, { statusCode }, payload, next) => (
      httpLogger.verbose({
        type: 'response',
        statusCode,
        body: payload,
      }),
      next()
    ),
  );

  const { port, url } = app.get(ConfigService.Network);

  SwaggerModule.setup(
    'openapi',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Aroundy')
        .setDescription('Aroundy 앱 및 어드민 페이지 공용 API')
        .setVersion('phase1')
        .addServer(url, 'staging server')
        .addServer(`http://127.0.0.1:${port}`, 'local server')
        .setExternalDoc(
          'Notion',
          'https://www.notion.so/Aroundy-550556a8fa18413ea0e0bce1b415eb17',
        )
        .addBearerAuth()
        .build(),
    ),
    {
      customSiteTitle: 'Aroundy API Documentation',
      swaggerOptions: {
        displayOperationId: true,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port, '0.0.0.0');

  loggerService.log(`Application is running on: ${port}`);
};

bootstrap();
