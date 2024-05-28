export class ValidateUserRequestDto {
  email: string;
  password: string;
  constructor(params: { email: string; password: string }) {
    this.email = params.email;
    this.password = params.password;
  }
}
