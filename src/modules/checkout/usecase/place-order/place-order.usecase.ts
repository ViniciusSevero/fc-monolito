import Id from "../../../@shared/domain/value-object/id.value-object";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/payment.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUsecase {
    constructor(
        private _clientFacade: ClientAdmFacadeInterface,
        private _productFacade: ProductAdmFacadeInterface,
        private _storeCatalogFacade: StoreCatalogFacadeInterface,
        private _paymentFacade: PaymentFacadeInterface,
        private _invoiceFacade: InvoiceFacadeInterface,
        private _repository: CheckoutGateway
    ) {}

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        const client = await this._clientFacade.findClient({id: input.clientId})
        if(!client) {
            throw new Error("Client not found");
        }
        
        await this.validateProducts(input.products)
        
        const products = await Promise.all(
            input.products.map(p => this.getProduct(p.productId))
        )

        const myClient = new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.address.street
        })

        const order = new Order({
            client: myClient,
            products: products
        })

        const payment = await this._paymentFacade.process({
            orderId: order.id.id,
            amount: order.total()
        })

        let invoice = null;

        if(payment.status === "approved") {
            invoice = await this._invoiceFacade.generateInvoice({
                name: myClient.name,
                document: client.document,
                street: client.address.street,
                number: client.address.number,
                complement: client.address.complement,
                city: client.address.city,
                state: client.address.state,
                zipCode: client.address.zipCode,
                items: products.map(p => {
                    return {
                        id: p.id.id,
                        name: p.name,
                        price: p.salesPrices,
                    }
                })
            })
            order.approved()
        }

        this._repository.addOrder(order)

        return {
            id: order.id.id,
            invoiceId: invoice == null ? null : invoice.id,
            products: order.products.map(p => {
                return {
                    productId: p.id.id
                }
            }),
            status: order.status,
            total: order.total()
        }
    }

    private async validateProducts(products: {productId: string}[]) : Promise<void> {
        if(products.length === 0) {
            throw new Error("No products selected")
        }

        for(const p of products) {
            let stock = await this._productFacade.checkStock({id: p.productId})
            if(!stock) {
                throw new Error(`Product ${p.productId} does't exist`)
            }
            if(stock.stock <= 0) {
                throw new Error(`Product ${p.productId} is out of stock`)
            }
        }
    }

    private async getProduct(id: string): Promise<Product> {
        const p = await this._storeCatalogFacade.find({id})
        if(!p) {
            throw new Error(`Product ${id} doesn't exist`)
        }
        return new Product({
            id: new Id(id),
            name: p.name,
            description: p.description,
            salesPrices: p.salesPrice
        })
    }
}