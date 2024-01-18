import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import { ProductModel } from "../repository/product.model";

describe("Product ADM Facade integration tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })
    it("Should add a product using facade", async () => {
        const facade = ProductAdmFacadeFactory.create()
        const dto = {
            id: "Product 1 Id",
            name: "Product 1",
            description: "Description Product 1",
            purchasePrice: 100,
            salesPrice: 200,
            stock: 10
        }
        await facade.addProduct(dto)
        
        const result = await facade.checkStock({
            id: dto.id
        })

        expect(result.id).toBe(dto.id)
        expect(result.stock).toBe(dto.stock)
    })
})