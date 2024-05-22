import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { SignInRequestDto } from './dto/signIn.request.dto';
import { SignUpRequestDto } from './dto/signUp.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async signIn(signInRequestDto: SignInRequestDto): Promise<object> {
    const { email, password } = signInRequestDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('The email does not exist');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Passwords do not match');
    }
    const accessToken = this.authService.signWithJwt({ id: user.id, email: user.email });
    return { accessToken };
  }

  async signUp(signUpRequestDto: SignUpRequestDto): Promise<User> {
    const { email, password } = signUpRequestDto;
    // email 검증, password 검증 필요
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashPassword });
    return this.userRepository.save(user);
  }
}
