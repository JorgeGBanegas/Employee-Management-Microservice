import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  console.log("🚀 ~ file: main.ts:9 ~ bootstrap ~ configService:", configService.get('PORT'))  
  app.use(morgan('dev'));
  await app.listen(configService.get('PORT'));
}
bootstrap();
