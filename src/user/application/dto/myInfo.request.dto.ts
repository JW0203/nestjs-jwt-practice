export class MyInfoResponseDto {
  id: number;
  email: string;
  createdAt: Date;
  response;
  constructor(params: { id: number; email: string; createdAt: Date }) {
    if (params) {
      this.id = params.id;
      this.email = params.email;
      this.createdAt = params.createdAt;
    }
  }
}
