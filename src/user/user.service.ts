import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { SignInRequestDto } from './dto/signIn.request.dto';

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
}
