import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule,ConfigService } from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }), 
   MongooseModule.forRootAsync({
     imports: [ConfigModule],
     inject: [ConfigService],
     useFactory: (configService: ConfigService) => ({
       uri: configService.get<string>('MONGODB_URI'),
     }),
   }), AuthModule, LoggerModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
