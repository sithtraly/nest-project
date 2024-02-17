import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express'
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest Project')
    .setDescription('Rest API for nest project, project to controller classroom')
    .setVersion('1.0')
    .build()
  app.enableCors()
  app.use('/public/qr', express.static(join(process.cwd(), 'src', 'public', 'qr')))
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, swaggerDocument)
  await app.listen(port, () => console.log('Server is running at:', 'http://localhost:' + port));
}
bootstrap();
