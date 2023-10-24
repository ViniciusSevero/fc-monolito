import { Sequelize } from "sequelize-typescript";
import PaymentFacadeFactory from "../factory/payment.facade.factory";
import PaymentModel from "../repository/payment.model";

describe("Payment Facade integration tests", () => {
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

    it("Should process a payment using facade",  async () => {
        const facade = PaymentFacadeFactory.create();
        const input = {
            orderId: "1",
            amount: 200.0,
        }


        const output = await facade.process(input);

        expect(output.transactionId).toBeDefined()
        expect(output.orderId).toBe(input.orderId)
        expect(output.amount).toBe(input.amount)
        expect(output.status).toBe("approved")
        expect(output.createdAt).toBeDefined()
        expect(output.updatedAt).toBeDefined()
    })

    it("Should process a declined payment using facade",  async () => {
        const facade = PaymentFacadeFactory.create();
        const input = {
            orderId: "1",
            amount: 99.0,
        }


        const output = await facade.process(input);

        expect(output.transactionId).toBeDefined()
        expect(output.orderId).toBe(input.orderId)
        expect(output.amount).toBe(input.amount)
        expect(output.status).toBe("declined")
        expect(output.createdAt).toBeDefined()
        expect(output.updatedAt).toBeDefined()
    })
})