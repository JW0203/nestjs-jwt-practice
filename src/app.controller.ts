import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    /*
    이 라우트를 사용할 때  body 에
    {
      "username" : "test@test.com",
      "password" : "12345678"
    }
    이렇게 주어야 정상적인 작동을 하여 아래를 반환

    "id": 6,
    "email": "test@test.com",
    "createdAt": "2024-05-24T09:35:14.740Z"

    */
    return req.user;
  }
}
