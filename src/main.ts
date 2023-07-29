import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const coreAppUrl = configService.get<string>('CORE_CLIENT_APP_URL');

  app.enableCors({
    origin: [coreAppUrl],
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept'],
    methods: ['GET', 'DELETE', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH']
  });
  app.use(cookieParser());
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Fervor API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha'
    }
  });

  await app.listen(port);
  const appUrl = await app.getUrl();
  Logger.log(`Application is running on: ${appUrl}`, 'Bootstrap');
}
bootstrap();
