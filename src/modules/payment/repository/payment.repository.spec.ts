import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction";
import PaymentModel from "./payment.model";
import PaymentRepository from "./payment.repository";

describe("Payment Repository Unit testes", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([PaymentModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("Should save a Transaction", async () => {
        const repository = new PaymentRepository();

        const transaction = new Transaction({
            id: new Id("1"),
            amount: 200.0,
            orderId: "test",
            status: "approved"
        })

        const result = await repository.save(transaction)

        expect(result).toBeDefined()
        expect(result.id.id).toBe(transaction.id.id)
        expect(result.orderId).toBe(transaction.orderId)
        expect(result.amount).toBe(transaction.amount)
        expect(result.status).toBe(transaction.status)
        expect(result.createdAt).toBeDefined()
        expect(result.updatedAt).toBeDefined()
    })

})
