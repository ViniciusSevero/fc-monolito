import ProcessPaymentUseCase from "../usecase/process-payment.usecase";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./payment.facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
    constructor(private usecase: ProcessPaymentUseCase) {}

    async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        const result = await this.usecase.execute({
            orderId: input.orderId,
            amount: input.amount,
        })

        return {
            transactionId: result.transactionId,
            orderId: result.orderId,
            amount: result.amount,
            status: result.status,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        }
    }
    
}