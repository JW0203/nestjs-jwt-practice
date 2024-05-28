import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInRequestDto } from './dto/signIn.request.dto';
import { SignUpRequestDto } from './dto/signUp.request.dto';
import { ChangePasswordRequestDto } from './dto/changePassword.request.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  signIn(@Body() signInRequestDto: SignInRequestDto) {
    return this.userService.signIn(signInRequestDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  myInfo(@Param('id') id: string) {
    return this.userService.getMyInfo(parseInt(id));
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpRequestDto: SignUpRequestDto) {
    return this.userService.signUp(signUpRequestDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  changePass(@Param('id') id: string, @Body() changePasswowrdRequestDto: ChangePasswordRequestDto) {
    return this.userService.changePassword(changePasswowrdRequestDto);
  }
}
