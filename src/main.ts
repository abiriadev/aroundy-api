import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './middleware/filter/exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3330;
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      exceptionFactory: (errors: ValidationError[]): BadRequestException => {
        const messages = errors.map((error: ValidationError) => {
          const constraints = error.constraints;
          const field = error.property;
          const messages = Object.keys(constraints).map(key => {
            return `[${field}] ${constraints[key]}`;
          });
          return messages.join(', ');
        });
        return new BadRequestException(messages);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('AROUNDY API')
    .setDescription('The AROUNDY API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(port);
}
bootstrap();
