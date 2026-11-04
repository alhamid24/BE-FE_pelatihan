import type {
    User,
    UserRecord,
    CreateUserData,
    UpdateUserData
} from './user.model.js';

export interface IUserRepository {

    findByEmail(
        email: string
    ): Promise<UserRecord | null>;

    create(
        data: CreateUserData
    ): Promise<User>;

    findById(
        id: string
    ): Promise<UserRecord | null>;

    update(
        id : string, 
        data : UpdateUserData
    ): Promise<User | null>;
}