export interface PaginationParams {
    page: number ;
    limit: number;
    offset: number;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface PaginationData<T> {
    items: T[];
    totalItems: number;
}

export interface PaginatedResult<T> {
    data: T[];
    pagination: PaginationMeta;
}