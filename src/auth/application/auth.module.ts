import * as dotenv from 'dotenv';
dotenv.config();
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from '../presentation/auth.controller';
import { UserModule } from '../../user/application/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../presentation/local.strategy';
import { JwtStrategy } from '../presentation/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3m' },
      }),
    }),
    forwardRef(() => UserModule),
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
