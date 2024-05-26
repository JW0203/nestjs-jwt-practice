import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

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
    if (!user) {
      throw new BadRequestException('The email does not exist');
    }
    const passwordMatch = await bcrypt.compare(userPassword, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Password does not match');
    }
    // const { password, createdAt, ...result } = user;
    const { id, email } = user;
    return { id, email };
  }
}
