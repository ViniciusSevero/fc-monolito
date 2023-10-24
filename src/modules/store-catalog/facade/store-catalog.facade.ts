import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllProductsFacadeInputDTO, FindProductFacadeInputDTO, FindProductFacadeOutputDTO } from "./store-catalog.facade.interface";

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    constructor(
        private findAllProductsUsecase: FindAllProductsUsecase, 
        private findProductsUsecase: FindProductUsecase) {
        
    }

    async findAll(): Promise<FindAllProductsFacadeInputDTO> {
        const data = await this.findAllProductsUsecase.execute();
        return {
            products: data.products.map(p => ({
                id: p.id,
                description: p.description,
                name: p.name,
                salesPrice: p.salesPrice
            }))
        } 
    }
    async find(input: FindProductFacadeInputDTO): Promise<FindProductFacadeOutputDTO> {
        const data = await this.findProductsUsecase.execute({
            id: input.id
        })
        return {
            id: data.id,
            description: data.description,
            name: data.name,
            salesPrice: data.salesPrice
        }
    }
    
}