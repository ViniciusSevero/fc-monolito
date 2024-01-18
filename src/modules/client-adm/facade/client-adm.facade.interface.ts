export interface AddClientFacadeInputDto {
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

export interface AddClientFacadeOutputDto {
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

export interface FindClientFacadeInputDto {
    id: string;
}

export interface FindClientFacadeOutputDto {
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

export default interface ClientAdmFacadeInterface {
    addClient(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto>
    findClient(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>
}