import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product Repository From Store Catalog Unit tests", () => {
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
        const id = '1';
        const product = new Product({
            id: new Id(id),
            name: "Product 1",
            description: "Description Product 1",
            salesPrice: 100,
        })

        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        });

        const repository = new ProductRepository();
        const productDb = await repository.find(id);
        
        expect(productDb).toBeDefined()
        expect(productDb.id.id).toEqual(product.id.id)
        expect(productDb.name).toEqual(product.name)
        expect(productDb.description).toEqual(product.description)
        expect(productDb.salesPrice).toEqual(product.salesPrice)
    })


    it("Should find all products", async () => {
        const product1 = new Product({
            id: new Id("1"),
            name: "Product 1",
            description: "Description Product 1",
            salesPrice: 100,
        })
        const product2 = new Product({
            id: new Id("2"),
            name: "Product 2",
            description: "Description Product 2",
            salesPrice: 100,
        })

        await ProductModel.create({
            id: product1.id.id,
            name: product1.name,
            description: product1.description,
            salesPrice: product1.salesPrice,
        });
        await ProductModel.create({
            id: product2.id.id,
            name: product2.name,
            description: product2.description,
            salesPrice: product2.salesPrice,
        });

        const repository = new ProductRepository();
        const productsDb = await repository.findAll();
        
        expect(productsDb).toBeDefined()
        expect(productsDb.length).toBe(2);
        expect(productsDb[0].id.id).toBe(product1.id.id);
        expect(productsDb[0].name).toBe(product1.name);
        expect(productsDb[0].description).toBe(product1.description);
        expect(productsDb[0].salesPrice).toBe(product1.salesPrice);
        expect(productsDb.length).toBe(2);
        expect(productsDb[1].id.id).toBe(product2.id.id);
        expect(productsDb[1].name).toBe(product2.name);
        expect(productsDb[1].description).toBe(product2.description);
        expect(productsDb[1].salesPrice).toBe(product2.salesPrice);
    })

})