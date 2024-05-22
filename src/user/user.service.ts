import { Injectable } from '@nestjs/common';
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

  async signIn(signInRequestDto: SignInRequestDto): Promise<User> {
    const { email, password } = signInRequestDto;
    const newUSer = new User({ email, password });
    return this.userRepository.save(newUSer);
  }

  async signUp(signUpRequestDto: SignUpRequestDto): Promise<User> {
    const { email, password } = signUpRequestDto;
    // email 검증, password 검증 필요
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashPassword });
    return this.userRepository.save(user);
  }
}
