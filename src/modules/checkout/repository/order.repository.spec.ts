import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../store-catalog/repository/product.model";
import ClientModel from "../../client-adm/repository/client.model";
import OrderRepository from "./order.repository";
import Order from "../domain/order.entity";
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";

describe("Order Repository Unit testes", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([OrderModel, OrderItemModel, ProductModel, ClientModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("Should add and find an order", async () => {
        const repository = new OrderRepository();

        const product1 = new Product({
            id: new Id(),
            name: "name",
            description: "description",
            salesPrices: 25.0
        });
        const product2 = new Product({
            id: new Id(),
            name: "name",
            description: "description",
            salesPrices: 25.0
        });

        await ProductModel.create({
            id: product1.id.id,
            name: product1.name,
            description: product1.description,
            salesPrice: product1.salesPrices,
        });
        await ProductModel.create({
            id: product2.id.id,
            name: product2.name,
            description: product2.description,
            salesPrice: product2.salesPrices,
        });

        const client = new Client({
            id: new Id("clientId"),
            name: "Client name",
            email: "Client email",
            address: "Client street",
        })

        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: "123456789",
            street: client.address,
            number: "number",
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "zipCode",
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        })

        const order = new Order({
            id: new Id(),
            client: client,
            status: "approved",
            products: [
                product1,
                product2
            ]
        })

        await repository.addOrder(order)
        const foundorder = await repository.findOrder(order.id.id)

        expect(foundorder).toBeDefined()
        expect(foundorder.id.id).toBe(order.id.id)
        expect(foundorder.status).toBe(order.status)
        expect(foundorder.client.id.id).toBe(order.client.id.id)
        expect(foundorder.client.name).toBe(order.client.name)
        expect(foundorder.client.email).toBe(order.client.email)
        expect(foundorder.client.address).toBe(order.client.address)
        expect(foundorder.products.length).toBe(2)
        expect(foundorder.products[0].id.id).toBe(order.products[0].id.id)
        expect(foundorder.products[0].name).toBe(order.products[0].name)
        expect(foundorder.products[0].description).toBe(order.products[0].description)
        expect(foundorder.products[0].salesPrices).toBe(order.products[0].salesPrices)
        expect(foundorder.products[1].id.id).toBe(order.products[1].id.id)
        expect(foundorder.products[1].name).toBe(order.products[1].name)
        expect(foundorder.products[1].salesPrices).toBe(order.products[1].salesPrices)
        expect(foundorder.products[1].salesPrices).toBe(order.products[1].salesPrices)
        expect(foundorder.createdAt).toBeDefined()
        expect(foundorder.updatedAt).toBeDefined()
    })

})
