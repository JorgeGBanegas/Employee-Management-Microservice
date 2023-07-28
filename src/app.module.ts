import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/data.sources';
import { JobModule } from './modules/job/job.module';
@Module({
  imports: [ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true,
      }
    ),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
