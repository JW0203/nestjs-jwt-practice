import { IsNotEmpty, Length } from 'class-validator';

export class SignUpRequestDto {
  email: string;

  @IsNotEmpty()
  @Length(8, 15)
  password: string;
}
