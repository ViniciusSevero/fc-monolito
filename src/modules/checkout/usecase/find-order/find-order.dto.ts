export interface FindOrderInputDto {
    id: string;
}

export interface FindOrderOutputDto {
    id: string;
    status: string;
    total: number;
    client: {
        name: string;
    }
    products: {
        name: string;
        price: number;
    }[]
}