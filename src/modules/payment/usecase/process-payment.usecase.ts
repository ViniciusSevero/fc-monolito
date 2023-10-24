import Transaction from "../domain/transaction";
import PaymentGateway from "../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase {
    constructor(private _transactionRepository: PaymentGateway) { }

    async execute(dto: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction({
            orderId: dto.orderId,
            amount: dto.amount,
        });

        transaction.process();
        
        const result = await this._transactionRepository.save(transaction)

        return {
            transactionId: result.id.id,
            orderId: result.orderId,
            amount: result.amount,
            status: result.status,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        }
    }
}