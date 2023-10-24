export interface AddclientInputDto {
    id?: string;
    name: string;
    email: string;
    address: string;
}

export interface AddclientOutputDto {
    id?: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}