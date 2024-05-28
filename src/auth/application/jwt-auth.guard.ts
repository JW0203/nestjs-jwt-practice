import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (info?.message === 'jwt malformed') {
      throw new UnauthorizedException('올바른 토큰을 입력해주세요', 'INVALID_TOKEN');
    }

    if (info?.message === 'jwt expired') {
      throw new UnauthorizedException('만료된 토큰입니다.', 'EXPIRED_TOKEN');
    }
    if (info?.message === 'No auth token') {
      throw new UnauthorizedException('헤더에 토큰을 입력해주세요', 'NO_JWT_TOKEN');
    }

    if (info) {
      console.log(info.message);
    }

    if (err) {
      throw new Error(err);
    }
    return user;
  }
}
