import { postgres } from '../../infrastructure/database/postgres.js';

import { PostgresUserRepository } from './user.repository.pg.js';

import { UserHandler } from './user.handler.js';

import { createUserRoutes } from './user.route.js';

import {
    RegisterUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase
} from './user.usecase.js'

// Repository
const userRepository = new PostgresUserRepository(postgres);

// Use Case
const registerUserUseCase = new RegisterUserUseCase(
    userRepository
);

const getUserByIdUseCase = new GetUserByIdUseCase(
    userRepository
);

const updateUserUseCase = new UpdateUserUseCase(
    userRepository
);

// Handler
const userHandler = new UserHandler(
    registerUserUseCase,
    getUserByIdUseCase,
    updateUserUseCase
);

// Routes
export const userRoutes = createUserRoutes(
    userHandler
);