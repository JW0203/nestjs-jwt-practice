import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super();
  }
  async validate(email: string, password: string): Promise<any> {
    // const user = await this.authService.validateUser(email, password);
    // const token = await this.userService.signIn({ email, password });
    // if (!token) {
    //   throw new UnauthorizedException('Cannot find user');
    // }
    // return token;

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Cannot find user');
    }
    return user;
  }
}
