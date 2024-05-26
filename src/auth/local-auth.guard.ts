import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('local')) 를 하는것보다 아래 방식으로 하는 것을 추천
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
