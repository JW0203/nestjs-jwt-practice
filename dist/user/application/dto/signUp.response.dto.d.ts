import { User } from '../../domain/user.entity';
export declare class SignUpResponseDto {
    id: number;
    email: string;
    createdAt: Date;
    constructor(user: User);
}
