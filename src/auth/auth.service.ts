import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  signWithJwt(payload: object) {
    return this.jwtService.sign(payload);
  }

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findOne(userEmail);
    if (user && user.password === userPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
