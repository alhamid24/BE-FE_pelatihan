import type {
    Request,
    Response
} from 'express';

import type { RegisterUserInput } from './user.model.js';

import type { UpdateUserData } from "./user.model.js";

import { RegisterUserUseCase, UpdateUserUseCase, GetUserByIdUseCase } from './user.usecase.js';

export class UserHandler {

    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly updateUserUsecase: UpdateUserUseCase
    ) {}

    register = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        const input = req.body as RegisterUserInput;

        const user = await this.registerUserUseCase.execute(
            input
        );
        
        res.status(201).json({
            success: true,
            message: 'Registrasi berhasil',
            data: user
        });
    };

    getUserId = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        const input = req.params.id as string;

        const user = await this.getUserByIdUseCase.execute(
            input
        );

        res.status(201).json({
            success: true,
            message: 'Registrasi berhasil',
            data: user
        });
    };

    update = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const id = req.params.id;

        if (typeof id !== 'string'){
            throw new Error('invalid user id');
        }

        const input = req.body as UpdateUserData;

        const user = await this.updateUserUsecase.execute(
            id, 
            input
        );

        res.status(200).json({
            success : true,
            message: 'user berhasil di perbarui',
            data : user
        });
    };
}