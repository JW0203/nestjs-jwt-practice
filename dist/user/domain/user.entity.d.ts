export declare class User {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date;
    constructor(params: {
        email: string;
        password: string;
    });
}
