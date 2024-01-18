import { Sequelize } from "sequelize-typescript";
import OrderModel from "../repository/order.model";
import OrderItemModel from "../repository/order-item.model";
import CheckoutFacadeFactory from "../factory/checkout.facade.factory";
import ClientModel from "../../client-adm/repository/client.model";
import ProductModel from "../../store-catalog/repository/product.model";
import { ProductModel as ProductAdmModel} from "../../product-adm/repository/product.model";
import { Umzug } from "umzug";
import { migrator } from "../../../migrations/config/migrator";
import PaymentModel from "../../payment/repository/payment.model";
import InvoiceModel from "../../invoice/repository/invoice.model";
import InvoiceItemModel from "../../invoice/repository/invoice-item.model";

describe("Checkout Facade integration tests", () => {
    let sequelize: Sequelize;
    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: true,
        })

        sequelize.addModels([OrderModel, OrderItemModel, ProductModel, ClientModel, ProductAdmModel, PaymentModel, InvoiceModel, InvoiceItemModel]);
        migration = migrator(sequelize)
        await migration.up()
    })

    afterEach(async () => {
        if (!migration || !sequelize) {
            return 
        }
        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
    })

    it("Should generate an order using facade",  async () => {
        await ProductAdmModel.create({
            id: "p1",
            name: "name",
            description: "description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await ProductAdmModel.create({
            id: "p2",
            name: "name",
            description: "description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await ProductModel.update({salesPrice: 120}, {where: {
            id: "p1"
        }})

        await ProductModel.update({salesPrice: 150}, {where: {
            id: "p2"
        }})

        await ClientModel.create({
            id: "c1",
            name: "Client name",
            email: "Client email",
            document: "123456789",
            street: "Client street",
            number: "number",
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "zipCode",
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const facade = CheckoutFacadeFactory.create();
        const input = {
            clientId: "c1",
            products: [{
                productId: "p1"
            },{
                productId: "p2"
            }]
        }

        const result = await facade.generateOrder(input);

        expect(result.invoiceId).toBeDefined()
        expect(result.total).toBeDefined()
        expect(result.status).toBeDefined()
        expect(result.products).toStrictEqual(
            [{productId: "p1"}, {productId: "p2"}]
        )

        const output = await facade.findOrder({
            id: result.id
        })

        expect(result.invoiceId).toBeDefined()
        expect(result.total).toBeDefined()
        expect(result.status).toBeDefined()
        expect(result.products.length).toBe(2)
    })
})