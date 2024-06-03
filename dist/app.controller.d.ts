import { AppService } from './app.service';
import { UserService } from './user/application/user.service';
import { ChangePasswordRequestDto } from './user/application/dto/changePassword.request.dto';
export declare class AppController {
    private readonly appService;
    private readonly userService;
    constructor(appService: AppService, userService: UserService);
    getHello(): string;
    login(req: any): Promise<object>;
    getProfile(req: any): Promise<import("./user/application/dto/myInfo.request.dto").MyInfoResponseDto>;
    changePassword(req: any, changePasswordRequestDto: ChangePasswordRequestDto): Promise<any>;
    deleteProfile(req: any): Promise<void>;
}
