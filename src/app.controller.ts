import { Controller, Get, Post, UseGuards, Request, Delete, HttpStatus, HttpCode, Patch, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/application/local-auth.guard';
import { JwtAuthGuard } from './auth/application/jwt-auth.guard';
import { UserService } from './user/application/user.service';
import { ChangePasswordRequestDto } from './user/application/dto/changePassword.request.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.userService.signIn(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.getMyInfo(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch()
  changePassword(@Request() req, @Body() changePasswordRequestDto: ChangePasswordRequestDto) {
    return this.userService.changePassword(changePasswordRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('users')
  deleteProfile(@Request() req) {
    return this.userService.deleteMyInfo(req.user.id);
  }
}
