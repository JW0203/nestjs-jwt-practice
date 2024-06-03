import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/application/user.service';
import { ValidateUserRequestDto } from './dto/validateUser.request.dto';
import { ValidateUserResponseDto } from './dto/validateUser.response.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    signWithJwt(payload: object): string;
    validateUser(validateUserRequestDto: ValidateUserRequestDto): Promise<ValidateUserResponseDto>;
}
