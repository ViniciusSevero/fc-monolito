import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import { ProductModel } from "./product.model";
import ProductRepository from "./product.repository";

describe("Product Repository Unit testes", () => {
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


    it("should create a product", async () => {
        const repository = new ProductRepository();
        const product = new Product({
            id: new Id(),
            name: "Product 1",
            description: "Description Product 1",
            purchasePrice: 100,
            salesPrice: 200,
            stock: 10
        })
        await repository.add(product);

        const productdb = await ProductModel.findOne({
            where: {id: product.id.id}
        })

        expect(productdb).toBeDefined()
        expect(productdb.id).toEqual(product.id.id)
        expect(productdb.name).toEqual(product.name)
        expect(productdb.description).toEqual(product.description)
        expect(productdb.purchasePrice).toEqual(product.purchasePrice)
        expect(productdb.salesPrice).toEqual(product.salesPrice)
        expect(productdb.stock).toEqual(product.stock)
        expect(productdb.createdAt).toBeDefined()
        expect(productdb.updatedAt).toBeDefined()
    })
    
    it("Should find a product", async () => {
        const id = '1';
        const product = new Product({
            id: new Id(id),
            name: "Product 1",
            description: "Description Product 1",
            purchasePrice: 100,
            salesPrice: 200,
            stock: 10
        })

        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            salesPrice: product.salesPrice,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const repository = new ProductRepository();
        const productDb = await repository.find(id);
        
        expect(productDb).toBeDefined()
        expect(productDb.id.id).toEqual(product.id.id)
        expect(productDb.name).toEqual(product.name)
        expect(productDb.description).toEqual(product.description)
        expect(productDb.purchasePrice).toEqual(product.purchasePrice)
        expect(productDb.salesPrice).toEqual(product.salesPrice)
        expect(productDb.stock).toEqual(product.stock)
        expect(productDb.createdAt).toBeDefined()
        expect(productDb.updatedAt).toBeDefined()
    })
})