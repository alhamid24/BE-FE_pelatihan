import type {
    Request,
    Response
} from 'express';

import type { RegisterUserInput } from './user.model.js';

import type { UpdateUserData } from "./user.model.js";

import { RegisterUserUseCase, UpdateUserUseCase, GetUserByIdUseCase, DeleteUserUseCase, GetAllUserUseCase} from './user.usecase.js';

import type { PaginationQuery } from '../../shared/pagination/pagination.validation.js';

import { getPaginationParams } from '../../shared/pagination/pagination.util.js';

export class UserHandler {

    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly updateUserUsecase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly getAllUserUseCase: GetAllUserUseCase
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
            message: 'User berhasil ditemukan',
            data: user
        });
    };

    update = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const id = req.params.id;

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

    delete = async (
        req : Request,
        res : Response
    ): Promise <void> => {
        const id = req.params.id;

        if (typeof id !== 'string'){
            throw new Error('invalid user id');
        }

        await this.deleteUserUseCase.execute(id);

        res.status(200).json({
            success: true,
            message: 'user berhasil di hapus'
        });
    };

    getAll = async (
        req : Request,
        res : Response
    ): Promise<void> => {
        const query = res.locals.validateQuery as PaginationQuery;

        const params = getPaginationParams(
            query.page,
            query.limit
        );

        const result = await this.getAllUserUseCase.execute (
            params
        );

        res.status(200).json ({
            success : true,
            message : "data user berhasil di temukan",
            data : result.data,
            pagination : result.pagination
        });
    };
}