import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { AuthService } from '../../auth/application/auth.service';
import { SignInRequestDto } from './dto/signIn.request.dto';
import { SignUpRequestDto } from './dto/signUp.request.dto';
import * as bcrypt from 'bcrypt';
import { MyInfoResponseDto } from './dto/myInfo.request.dto';
import { SignUpResponseDto } from './dto/signUp.response.dto';
import * as process from 'node:process';
import { ChangePasswordRequestDto } from './dto/changePassword.request.dto';
import { ValidateUserRequestDto } from '../../auth/application/dto/validateUser.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async findOne(userEmail: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email: userEmail } });
  }

  async signIn(signInRequestDto: SignInRequestDto): Promise<object> {
    console.log('user signIn');
    console.log(signInRequestDto);
    const { email, id } = signInRequestDto;
    const accessToken = this.authService.signWithJwt({ id, email });
    return { accessToken };
  }

  async signUp(signUpRequestDto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const { email, password } = signUpRequestDto;

    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    const isRegisteredEmail = await this.userRepository.findOne({ where: { email } });
    if (isRegisteredEmail) {
      throw new BadRequestException('Email already exists');
    }
    const isValidEmail = email.indexOf('@') === email.lastIndexOf('@');
    if (!isValidEmail) {
      throw new BadRequestException('Email should contain only one @');
    }
    if (email.split(' ').length > 1) {
      throw new BadRequestException('Email should not contain the empty space');
    }

    const user = new User({ email, password: hashPassword });
    await this.userRepository.save(user);
    const newUser = await this.userRepository.findOne({ where: { email } });
    return new SignUpResponseDto({ id: newUser.id, email: newUser.email, createdAt: newUser.createdAt });
  }
  async getMyInfo(userId: number): Promise<MyInfoResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    const { id, email, createdAt } = user;
    return new MyInfoResponseDto({ id, email, createdAt });
  }

  async changePassword(changePasswordRequestDto: ChangePasswordRequestDto): Promise<any> {
    const { email, password, newPassword } = changePasswordRequestDto;
    const user = await this.userRepository.findOne({ where: { email } });
    const validUser = await this.authService.validateUser(new ValidateUserRequestDto({ email, password }));
    if (!validUser) {
      throw new UnauthorizedException();
    }
    user.password = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS));
    const { id, createdAt, updatedAt } = await this.userRepository.save(user);
    return { id, createdAt, updatedAt };
  }

  async deleteMyInfo(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    await this.userRepository.softDelete(id);
  }
}
