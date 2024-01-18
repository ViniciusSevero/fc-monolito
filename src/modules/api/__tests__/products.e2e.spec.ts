import { Sequelize } from "sequelize-typescript"
import { Umzug } from "umzug";
import { ProductModel as ProductAdmModel} from "../../product-adm/repository/product.model";
import { migrator } from "../../../migrations/config/migrator";
import { productRoute } from "../routes/product.route";
import request from "supertest"
import express, { Express } from 'express'

describe("E2E Products tests", () => {
    const app: Express = express()
    app.use(express.json())
    app.use("/products", productRoute)

    let sequelize: Sequelize;
    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: true,
        })

        sequelize.addModels([ProductAdmModel]);
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

        const response = await request(app)
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

    })

})