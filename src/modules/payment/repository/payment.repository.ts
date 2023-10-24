import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction";
import PaymentGateway from "../gateway/payment.gateway";
import PaymentModel from "./payment.model";

export default class PaymentRepository implements PaymentGateway{
    async save(model: Transaction): Promise<Transaction> {
        const result = await PaymentModel.create({
            id: model.id.id,
            amount: model.amount,
            orderId: model.orderId,
            status: model.status,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        })

        return new Transaction({
            id: new Id(result.id),
            amount: result.amount,
            orderId: result.orderId,
            status: result.status,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        });
    }
}