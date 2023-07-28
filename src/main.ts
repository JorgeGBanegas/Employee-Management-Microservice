import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  console.log("🚀 ~ file: main.ts:9 ~ bootstrap ~ configService:", configService.get('PORT'))  
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  app.setGlobalPrefix('api');
  await app.listen(configService.get('PORT'));
}
bootstrap();
