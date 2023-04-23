export interface Invoice {
    createdAt: string;
    client: string;
    Currency: string;
    Total: string;
    Invoice: string;
    Status: boolean;
    id: string;
}

export interface SearchParams {
    Status?: boolean;
    Client?: string;
    from?: Date;
    to?: Date;
    Invoice?: string;
}