export class ValidateUserResponseDto {
  id: number;
  email: string;

  constructor(params: { email: string; id: number }) {
    if (params) {
      this.email = params.email;
      this.id = params.id;
    }
  }
}
