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

describe("E2E Client tests", () => {
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

        sequelize.addModels([ClientModel]);
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
    it("Should create a clint", async () => {
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
    })

})