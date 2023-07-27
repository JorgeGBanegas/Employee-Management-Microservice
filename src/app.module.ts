import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/data.sources';
@Module({
  imports: [ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true,
      }
    ),
    TypeOrmModule.forRoot({...DataSourceConfig})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
