import FindOrderUsecase from "../usecase/find-order/find-order.usecase";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "../usecase/place-order/place-order.dto";
import PlaceOrderUsecase from "../usecase/place-order/place-order.usecase";
import CheckoutFacadeInterface, { FindOrderFacadeInputDTO, FindOrderFacadeOutputDTO } from "./checkout.facade.interface";

export default class CheckoutFacade implements CheckoutFacadeInterface {

    constructor(
        private _placeOrderUsecase: PlaceOrderUsecase,
        private _findOrderUsecase: FindOrderUsecase
    ) {

    }
    async generateOrder(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        try {
            const result = await this._placeOrderUsecase.execute({
                clientId: input.clientId,
                products: input.products.map(p => {
                    return {
                        productId: p.productId
                    }
                })
            })

            return {
                id: result.id,
                invoiceId: result.invoiceId,
                status: result.status,
                total: result.total,
                products: result.products.map(p => {
                    return {
                        productId: p.productId
                    }
                })
            }
        } catch(e) {
            console.error(e)
            throw e;
        }

    }
    async findOrder(input: FindOrderFacadeInputDTO): Promise<FindOrderFacadeOutputDTO> {
        const result = await this._findOrderUsecase.execute({
            id: input.id
        })
        
        return {
            id: result.id,
            status: result.status,
            total: result.total,
            client: {
                name: result.client.name,
            },
            products: result.products.map(p => {
                return {
                    name: p.name,
                    price: p.price
                }
            })
        }
    }


}