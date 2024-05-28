import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { ValidateUserRequestDto } from './dto/validateUser.request.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(new ValidateUserRequestDto({ email, password }));
    if (!user) {
      throw new UnauthorizedException('Cannot find user');
    }
    return user;
  }
}
