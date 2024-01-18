import { Sequelize } from "sequelize-typescript"
import { Umzug } from "umzug";
import OrderModel from "../../checkout/repository/order.model";
import OrderItemModel from "../../checkout/repository/order-item.model";
import ProductModel from "../../store-catalog/repository/product.model";
import ClientModel from "../../client-adm/repository/client.model";
import PaymentModel from "../../payment/repository/payment.model";
import InvoiceModel from "../../invoice/repository/invoice.model";
import InvoiceItemModel from "../../invoice/repository/invoice-item.model";
import { ProductModel as ProductAdmModel} from "../../product-adm/repository/product.model";
import { migrator } from "../../../migrations/config/migrator";
import { productRoute } from "../routes/product.route";
import { clientRoute } from "../routes/client.route";
import { checkoutRoute } from "../routes/checkout.route";
import { invoiceRoute } from "../routes/invoice.route";
import request from "supertest"
import express, { Express } from 'express'

describe("E2E Checkout tests", () => {
    const app: Express = express()
    app.use(express.json())
    app.use("/products", productRoute)
    app.use("/clients", clientRoute)
    app.use("/checkout", checkoutRoute)
    app.use("/invoice", invoiceRoute)

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
    it("Should create an order", async () => {
        let response = await request(app)
            .post("/clients")
            .send( {
                id: "c1",
                name: "Client 1",
                email: "email",
                document: "document",
                address: {
                    street: "client address street",
                    number: "client address number",
                    complement: "client address complement",
                    city: "client address city",
                    state: "client address state",
                    zipCode: "client address zipCode",
                }
            })

        expect(response.status).toBe(200)
        expect(response.body.id).toBe("c1")
        expect(response.body.name).toBe("Client 1")
        expect(response.body.email).toBe("email")
        expect(response.body.document).toBe("document")
        expect(response.body.address.street).toBe("client address street")
        expect(response.body.address.number).toBe("client address number")
        expect(response.body.address.zipCode).toBe("client address zipCode")
        expect(response.body.address.city).toBe("client address city")

        response = await request(app)
            .post("/products")
            .send( {
                id: "p1",
                name: "product 1",
                description: "product 1 description",
                purchasePrice: 100,
                salesPrice: 200,
                stock: 1,
            })

        expect(response.status).toBe(200)

        response = await request(app)
        .post("/checkout")
        .send( {
            clientId: "c1",
            products: [{productId: "p1"}]
        })

        expect(response.status).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.invoiceId).toBeDefined()
        expect(response.body.status).toBe('approved')
        expect(response.body.total).toBe(200)
        expect(response.body.products[0].productId).toBe("p1")

        const invoiceId = response.body.invoiceId

        response = await request(app)
        .get(`/invoice/${invoiceId}`)

        expect(response.status).toBe(200)
        expect(response.body.id).toBe(invoiceId)
        expect(response.body.name).toBe("Client 1")
        expect(response.body.document).toBe("document")
        expect(response.body.address.street).toBe("client address street")
        expect(response.body.address.number).toBe("client address number")
        expect(response.body.address.complement).toBe("client address complement")
        expect(response.body.address.city).toBe("client address city")
        expect(response.body.address.state).toBe("client address state")
        expect(response.body.address.zipCode).toBe("client address zipCode")
        expect(response.body.items[0].id).toBe("p1")
        expect(response.body.items[0].name).toBe("product 1")
        expect(response.body.items[0].price).toBe(200)
        expect(response.body.total).toBe(200)
        expect(response.body.createdAt).toBeDefined()

    })

})