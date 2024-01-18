
export interface AddclientInputDto {
    id?: string;
    name: string;
    email: string;
    document: string;
    address: {
        street: string,
        number: string,
        complement: string,
        city: string,
        state: string,
        zipCode: string
    };
}

export interface AddclientOutputDto {
    id?: string;
    name: string;
    email: string;
    document: string;
    address: {
        street: string,
        number: string,
        complement: string,
        city: string,
        state: string,
        zipCode: string
    };
    createdAt: Date;
    updatedAt: Date;
}