import { Body, Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  checkValidateUser(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.authService.validateUser(email, password);
  }
  @Get(':id')
  checkPayload(@Param('id') id: string) {
    return this.authService.signWithJwt({ id: id });
  }
}
