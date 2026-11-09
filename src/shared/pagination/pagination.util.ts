import type {
    PaginationParams,
    PaginationMeta,
    PaginationData,
    PaginatedResult
} from './pagination.model.js';

    export const getPaginationParams = (
        page: number,
        limit: number
    ): PaginationParams => {
        return {
            page,
            limit,
            offset: (page - 1) * limit
        };
    };

    export const createPaginationResult = <T> (
        result : PaginationData <T>,
        params : PaginationParams
    ): PaginatedResult<T> => {
        const totalPages = Math.ceil (
            result.totalItems / params.limit
        );


    const pagination: PaginationMeta = {
        page: params.page,

        limit: params.limit,

        totalItems: result.totalItems,

        totalPages,

        hasNextPage: params.page < totalPages, 

        hasPreviousPage: params.page > 1
    };

    return {
        data: result.items,
        pagination
    };
};