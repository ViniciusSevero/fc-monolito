export interface FindOrderFacadeInputDTO {
    id: string;
}

export interface FindOrderFacadeOutputDTO {
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

export interface GenerateOrderFacadeInputDto {
    clientId: string;
    products: {
        productId: string;
    }[]
  }
  
export interface GenerateOrderFacadeOutputDto {
    id: string;
    invoiceId: string;
    status: string;
    total: number;
    products: {
        productId: string;
    }[]
}

export default interface CheckoutFacadeInterface {
    generateOrder(input: GenerateOrderFacadeInputDto): Promise<GenerateOrderFacadeOutputDto>
    findOrder(input: FindOrderFacadeInputDTO): Promise<FindOrderFacadeOutputDTO>
}