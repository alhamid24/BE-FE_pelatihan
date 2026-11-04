import bcrypt from 'bcryptjs';

import type { IUserRepository } from './user.repository.js';

import type {
    User,
    RegisterUserInput
} from './user.model.js';

import { AppError } from '../../shared/errors/app-error.js';

import type { UpdateUserData } from './user.model.js';

export class RegisterUserUseCase {

    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    async execute(
        input: RegisterUserInput
    ): Promise<User> {

        const email = input.email.trim().toLowerCase();

        // Check duplicate email
        const existingUser =
            await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new AppError(
                'Email sudah terdaftar',
                409
            );
        }

        // Hash password
        const passwordHash = await bcrypt.hash(
            input.password,
            12
        );

        // Save user
        const user = await this.userRepository.create({
            name: input.name.trim(),
            email,
            passwordHash
        });

        return user;
    }
}

export class GetUserByIdUseCase {

    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    async execute(
        id: string
    ): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    }
}

export class UpdateUserUseCase {
    
    constructor (
        private readonly userRepository : IUserRepository
    ){}

    async execute(
        id : string,
        input : UpdateUserData
    ): Promise<User> {
        //check existing

        const existingUSer = 
            await this.userRepository.findById(id);

        if (!existingUSer) {
            throw new AppError(
                'user tidak di temukan',
                404
            );
        }

        //check duplicate email
        if (input.email) {
            const emailUser = 
                await this.userRepository.findByEmail(input.email);
            if (emailUser && emailUser.id !== id) {
                throw new AppError(
                    'email sudah di gunakan oleh user lain',
                    409
                );
            }

            //update user
            const updateUser =
                await this.userRepository.update(id, input);
            if (!updateUser) {
                throw new AppError(
                    'Gagal memperbarui user',
                    500
                );
            }

            return updateUser;
        }
    }
}