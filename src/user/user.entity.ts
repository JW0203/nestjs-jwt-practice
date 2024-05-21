import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor(params: { email: string; password: string }) {
    if (params) {
      this.email = params.email;
      this.password = params.password;
    }
  }
}
