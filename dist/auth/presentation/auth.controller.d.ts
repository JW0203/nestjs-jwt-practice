import { AuthService } from '../application/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    checkValidateUser(body: {
        email: string;
        password: string;
    }): Promise<import("../application/dto/validateUser.response.dto").ValidateUserResponseDto>;
    checkPayload(id: string): string;
}
