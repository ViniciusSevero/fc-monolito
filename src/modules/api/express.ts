import express, {Express} from "express"
import { Sequelize } from "sequelize-typescript"
import { Umzug } from "umzug";
import OrderModel from "../checkout/repository/order.model";
import OrderItemModel from "../checkout/repository/order-item.model";
import ProductModel from "../store-catalog/repository/product.model";
import ClientModel from "../client-adm/repository/client.model";
import PaymentModel from "../payment/repository/payment.model";
import InvoiceModel from "../invoice/repository/invoice.model";
import InvoiceItemModel from "../invoice/repository/invoice-item.model";
import { ProductModel as ProductAdmModel} from "../product-adm/repository/product.model";
import { migrator } from "../../migrations/config/migrator";
import { productRoute } from "./routes/product.route";
import { clientRoute } from "./routes/client.route";
import { checkoutRoute } from "./routes/checkout.route";
import { invoiceRoute } from "./routes/invoice.route";


export const app: Express = express()
app.use(express.json())
app.use("/products", productRoute)
app.use("/clients", clientRoute)
app.use("/checkout", checkoutRoute)
app.use("/invoice", invoiceRoute)

let sequelize: Sequelize;
let migration: Umzug<any>;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: true,
    })

    sequelize.addModels([OrderModel, OrderItemModel, ProductModel, ClientModel, ProductAdmModel, PaymentModel, InvoiceModel, InvoiceItemModel]);
    migration = migrator(sequelize)
    await migration.up()
}
setupDb()