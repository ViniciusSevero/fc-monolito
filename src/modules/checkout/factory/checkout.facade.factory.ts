import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import CheckoutFacade from "../facade/checkout.facade";
import OrderRepository from "../repository/order.repository";
import FindOrderUsecase from "../usecase/find-order/find-order.usecase";
import PlaceOrderUsecase from "../usecase/place-order/place-order.usecase";

export default class CheckoutFacadeFactory {
    static create() {
        const repository = new OrderRepository();
        const clientFacade = ClientAdmFacadeFactory.create()
        const productFacade = ProductAdmFacadeFactory.create()
        const storeCatalogFacade = StoreCatalogFacadeFactory.create()
        const paymentFacade = PaymentFacadeFactory.create()
        const invoiceFacade = InvoiceFacadeFactory.create()

        const placeOrderUsecase = new PlaceOrderUsecase(
            clientFacade,
            productFacade,
            storeCatalogFacade,
            paymentFacade,
            invoiceFacade,
            repository
        )
        const findOrderUsecase = new FindOrderUsecase(repository)

        return new CheckoutFacade(placeOrderUsecase, findOrderUsecase);
    }
}