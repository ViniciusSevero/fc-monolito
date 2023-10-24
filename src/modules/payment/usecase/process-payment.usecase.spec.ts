import Id from "../../@shared/domain/value-object/id.value-object"
import ProcessPaymentUseCase from "./process-payment.usecase"

describe("Process payment usecase Unit tests", () => {

    const mockedTransaction = {
        id: new Id("123"),
        orderId: "test",
        amount: 200.0,
        status: "approved",
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    const MockRepository = () => {
        return {
            save: jest.fn().mockReturnValue(Promise.resolve(mockedTransaction))
        }
    }

    it("Should save a valid transaction", async () => {
        const repository = MockRepository();
        const usecase = new ProcessPaymentUseCase(repository);
        
        const result = await usecase.execute({
            amount: 200,
            orderId: "orderId test"
        })

        expect(repository.save).toHaveBeenCalled();
        expect(result.transactionId).toBeDefined();
        expect(result.orderId).toBe(mockedTransaction.orderId);
        expect(result.amount).toBe(mockedTransaction.amount);
        expect(result.status).toBe(mockedTransaction.status);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();

    })
})