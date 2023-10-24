import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDTO, FindProductOutputDTO } from "./find-product.dto";

export default class FindProductUsecase {
    constructor(private productGateway: ProductGateway) {}

    async execute(input: FindProductInputDTO): Promise<FindProductOutputDTO> {
        const product = await this.productGateway.find(input.id)
        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }
    }
}