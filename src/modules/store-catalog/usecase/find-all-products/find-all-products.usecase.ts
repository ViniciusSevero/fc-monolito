import ProductGateway from "../../gateway/product.gateway";
import FindAllProductsDTO from "./find-all-products.dto";

export default class FindAllProductsUsecase {
    _productGateway: ProductGateway;

    constructor(productGateway: ProductGateway) {
        this._productGateway = productGateway;
    }

    async execute(): Promise<FindAllProductsDTO> {
        const products = await this._productGateway.findAll();
        return {
            products: products.map(p => {
                return {
                    id: p.id.id,
                    name: p.name,
                    description: p.description,
                    salesPrice: p.salesPrice
                }
            })
        }
    }

}