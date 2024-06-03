import { UserService } from '../application/user.service';
import { SignInRequestDto } from '../application/dto/signIn.request.dto';
import { SignUpRequestDto } from '../application/dto/signUp.request.dto';
import { ChangePasswordRequestDto } from '../application/dto/changePassword.request.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signIn(signInRequestDto: SignInRequestDto): Promise<object>;
    myInfo(id: string): Promise<import("../application/dto/myInfo.request.dto").MyInfoResponseDto>;
    signUp(signUpRequestDto: SignUpRequestDto): Promise<import("../application/dto/signUp.response.dto").SignUpResponseDto>;
    changePass(id: string, changePasswowrdRequestDto: ChangePasswordRequestDto): Promise<any>;
}
