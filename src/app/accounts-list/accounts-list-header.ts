export interface AccountHeader {
    title: string;
    smallTitle?: string;
    sortDirection?: SortingDirection,

}

export enum SortingDirection {
    ASC = 'ASC',
    DESC = 'DESC'
}
