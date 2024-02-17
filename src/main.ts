import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest Project')
    .setDescription('Rest API for nest project, project to controller classroom')
    .setVersion('1.0')
    .build()
  app.enableCors()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, swaggerDocument)
  await app.listen(port, () => console.log('Server is running at:', 'http://localhost:' + port));
}
bootstrap();
