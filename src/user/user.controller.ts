import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInRequestDto } from './dto/signIn.request.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signIn(signInRequestDto: SignInRequestDto) {
    return this.userService.signIn(signInRequestDto);
  }
}
