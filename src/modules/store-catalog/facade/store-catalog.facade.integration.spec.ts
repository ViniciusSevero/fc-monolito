import { Sequelize } from "sequelize-typescript";
import StoreCatalogFacadeFactory from "../factory/facade.factory";
import ProductModel from "../repository/product.model";

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

    it("Should find a product", async () => {
        const facade = StoreCatalogFacadeFactory.create();

        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1",
            salesPrice: 10.0
        })

        const result = await facade.find({id: "1"})

        expect(result.id).toBe("1")
        expect(result.name).toBe("Product 1")
        expect(result.description).toBe("Product 1")
        expect(result.salesPrice).toBe(10.0)
    })

    it("Should find all products", async () => {
        const facade = StoreCatalogFacadeFactory.create();

        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1",
            salesPrice: 10.0
        })

        await ProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Product 2",
            salesPrice: 20.0
        })

        const result = await facade.findAll()

        expect(result.products.length).toBe(2)
        expect(result.products[0].id).toBe("1")
        expect(result.products[0].name).toBe("Product 1")
        expect(result.products[0].description).toBe("Product 1")
        expect(result.products[0].salesPrice).toBe(10.0)
        expect(result.products[1].id).toBe("2")
        expect(result.products[1].name).toBe("Product 2")
        expect(result.products[1].description).toBe("Product 2")
        expect(result.products[1].salesPrice).toBe(20.0)
    })

})