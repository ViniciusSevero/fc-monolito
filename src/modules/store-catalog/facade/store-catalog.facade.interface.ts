
export interface FindAllProductsFacadeInputDTO {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[]
}

export interface FindProductFacadeInputDTO {
    id: string;
}

export interface FindProductFacadeOutputDTO {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export default interface StoreCatalogFacadeInterface {
    findAll(): Promise<FindAllProductsFacadeInputDTO>
    find(input: FindProductFacadeInputDTO): Promise<FindProductFacadeOutputDTO>
}