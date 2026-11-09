import { Router } from 'express';

import { UserHandler } from './user.handler.js';

import { registerUserSchema, userIdSchema } from './user.validation.js';

import { validateBody, validateParams, validateQuery } from '../../shared/middlewares/validate.js';

import { asyncHandler } from '../../shared/utils/async-handler.js';

import { updateUserSchema } from './user.validation.js';

import { paginationSchema } from '../../shared/pagination/pagination.validation.js';


export const createUserRoutes = (
    userHandler: UserHandler
) => {

    const router = Router();

    router.post(
        '/register',
        validateBody(registerUserSchema),
        asyncHandler(userHandler.register)
    );

    router.get(
        '/:id',
        validateParams(userIdSchema),
        asyncHandler(userHandler.getUserId)
    );

    router.patch(
        '/:id',
        validateParams(userIdSchema),
        validateBody(updateUserSchema),
        asyncHandler(userHandler.update)
    );

    router.delete (
        '/:id',
        validateParams(userIdSchema),
        asyncHandler(userHandler.delete)
    );

    router.get (
        '/',
        validateQuery(paginationSchema),
        asyncHandler(userHandler.getAll)
    );

    return router;
};