import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInRequestDto } from './dto/signIn.request.dto';
import { SignUpRequestDto } from './dto/signUp.request.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-in')
  signIn(@Body() signInRequestDto: SignInRequestDto) {
    return this.userService.signIn(signInRequestDto);
  }

  @Get(':id')
  myInfo(@Param('id') id: string) {
    return this.userService.getMyInfo(parseInt(id));
  }

  @Post('sign-up')
  signUp(@Body() signUpRequestDto: SignUpRequestDto) {
    return this.userService.signUp(signUpRequestDto);
  }
}
