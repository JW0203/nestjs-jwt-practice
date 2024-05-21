import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AppController } from '../app.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwt_secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AppController],
})
export class AuthModule {}
