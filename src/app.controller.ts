import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    /*
    이 라우트를 사용할 때  body 에
    {
      "username" : "test@test.com", << 이 부분을 email 로 바꾸는 방법은 없나??
      "password" : "12345678"
    }
    이렇게 주어야 정상적인 작동을 하여 아래를 반환
    req.user = {
      "id": 6,
      "email": "test@test.com",
      "password" : "12345678"
      "createdAt": "2024-05-24T09:35:14.740Z"
    }
    위 req 은 auth.service.ts - validateUser 로 부터 만들어진 것

    {
      "email" : "test@test.com",
      "password" : "12345678"
    }
    를 입력하면
    {
      "message": "Unauthorized",
      "statusCode": 401
    } 를 반환
    */
    return this.userService.signIn(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    //req.user
    return this.userService.getMyInfo(req.user.id); // id email createdAt 만 보내기
  }
}
