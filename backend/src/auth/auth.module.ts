import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from './auth.guard';
// import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { MetricsModule } from '../users/metrics/metrics.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        global:true,
        secret:configService.get<string>('JWT_SECRET'),
        signOptions:{expiresIn:'15d'}
      })
    }),
    UsersModule,
    MetricsModule
  ],
  providers: [AuthService,UsersService,JwtStrategy,

    // {
    //   provide: 'APP_GUARD',
    //   useClass: AuthGuard,
    // },
    RolesGuard,
   
  ],
  controllers: [AuthController],
})
export class AuthModule {}