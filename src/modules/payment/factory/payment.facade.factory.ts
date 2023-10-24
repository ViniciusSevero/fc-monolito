import PaymentFacade from "../facade/payment.facade";
import PaymentRepository from "../repository/payment.repository";
import ProcessPaymentUseCase from "../usecase/process-payment.usecase";

export default class PaymentFacadeFactory {
    static create() {
        const repository = new PaymentRepository();
        const usecase = new ProcessPaymentUseCase(repository);
        return new PaymentFacade(usecase);
    }
}