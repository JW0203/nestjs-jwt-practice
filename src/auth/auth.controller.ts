import { Body, Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateUserRequestDto } from './dto/validateUser.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  checkValidateUser(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const validationUserRequest = new ValidateUserRequestDto({ email, password });
    return this.authService.validateUser(validationUserRequest);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  checkPayload(@Param('id') id: string) {
    return this.authService.signWithJwt({ id: id });
  }
}
