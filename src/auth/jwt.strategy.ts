import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  /*
  포스트맨 헤더에 signIn 으로 발급받은 accessToken 입력하면
  jwt 토큰에 담겨있는 id 와 email
   */
  async validate(payload: any): Promise<any> {
    return { id: payload.id, email: payload.email };
  }
}
