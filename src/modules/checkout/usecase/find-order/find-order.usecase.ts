import CheckoutGateway from "../../gateway/checkout.gateway";
import { FindOrderInputDto, FindOrderOutputDto } from "./find-order.dto";

export default class FindOrderUsecase {
    constructor(
        private _repository: CheckoutGateway
    ) {}

    async execute(input: FindOrderInputDto): Promise<FindOrderOutputDto> {
        const order = await this._repository.findOrder(input.id)
        if(!order) {
            throw new Error("Order not found");
        }

        return {
            id: order.id.id,
            client: {
                name: order.client.name,
            },
            products: order.products.map(p => {
                return {
                    name: p.name,
                    price: p.salesPrices
                }
            }),
            status: order.status,
            total: order.total()
        }
    }
}