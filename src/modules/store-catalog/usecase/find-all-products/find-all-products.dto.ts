export default interface FindAllProductsDTO {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[]
}