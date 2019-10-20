export interface Pageable {
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    unpaged: boolean;
    paged: boolean;
}
