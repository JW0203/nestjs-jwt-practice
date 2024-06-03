import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { AuthService } from '../../auth/application/auth.service';
import { SignInRequestDto } from './dto/signIn.request.dto';
import { SignUpRequestDto } from './dto/signUp.request.dto';
import { MyInfoResponseDto } from './dto/myInfo.request.dto';
import { SignUpResponseDto } from './dto/signUp.response.dto';
import { ChangePasswordRequestDto } from './dto/changePassword.request.dto';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private userRepository;
    private readonly authService;
    private readonly configService;
    constructor(userRepository: Repository<User>, authService: AuthService, configService: ConfigService);
    findOne(userEmail: string): Promise<User | undefined>;
    signIn(signInRequestDto: SignInRequestDto): Promise<object>;
    signUp(signUpRequestDto: SignUpRequestDto): Promise<SignUpResponseDto>;
    getMyInfo(userId: number): Promise<MyInfoResponseDto>;
    changePassword(changePasswordRequestDto: ChangePasswordRequestDto): Promise<any>;
    deleteMyInfo(id: number): Promise<void>;
}
