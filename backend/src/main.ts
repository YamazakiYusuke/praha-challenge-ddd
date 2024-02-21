import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { setupDI } from 'src/infra/di/di';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  if (process.env.STAGE !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('backend sample')
      .setDescription('The API description')
      .setVersion('1.0')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('openapi', app, document)
  }

  await app.listen(Number(process.env.PORT) || 3001)
}
bootstrap()
setupDI();

