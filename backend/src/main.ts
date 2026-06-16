import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder,SwaggerModule } from "@nestjs/swagger";
import {ValidationPipe  } from "@nestjs/common";
import {WINSTON_MODULE_NEST_PROVIDER} from "nest-winston"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swagger = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('apis', app, swagger);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}));
  await app.listen(process.env.PORT ?? 3000); 




}
bootstrap();
