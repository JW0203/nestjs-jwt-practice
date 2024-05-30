import { User } from '../../domain/user.entity';

export class SignUpResponseDto {
  id: number;
  email: string;
  createdAt: Date;

  // constructor(params: { id: number; email: string; createdAt: Date }) {
  //   if (params) {
  //     this.id = params.id;
  //     this.email = params.email;
  //     this.createdAt = params.createdAt;
  //   }
  // }

  constructor(user: User) {
    if (user) {
      this.id = user.id;
      this.email = user.email;
      this.createdAt = user.createdAt;
    }
  }
}
