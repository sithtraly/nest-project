import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest Project')
    .setDescription('Rest API for nest project, project to controller classroom (Class Management System)')
    .setVersion('1.0')
    .setBasePath('/api')
    .addBearerAuth()
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, swaggerDocument)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => console.log('Server is running at:', 'http://localhost:' + port));
}
bootstrap();
