import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/application/user.service';
import * as bcrypt from 'bcrypt';
import { ValidateUserRequestDto } from './dto/validateUser.request.dto';
import { ValidateUserResponseDto } from './dto/validateUser.response.dto';

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

  async validateUser(validateUserRequestDto: ValidateUserRequestDto) {
    const { email, password } = validateUserRequestDto;
    console.log('auth validateUser');
    console.log({ email, password });
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new BadRequestException('The email does not exist');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Password does not match');
    }

    return new ValidateUserResponseDto({ id: user.id, email });
  }
}
