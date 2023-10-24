import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Invoice Facade integration tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("Should generate a invoice using facade",  async () => {
        const facade = InvoiceFacadeFactory.create();
        const input = {
            name: "test",
            document: "123456789",
            street: "street",
            number: "number",
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "zipCode",
            items: [{
                id: "id item 1",
                name: "name",
                price: 25.0
            },
            {
                id: "id item 2",
                name: "name 2",
                price: 50.0
            }]
        }


        const result = await facade.generateInvoice(input);

        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.items[0].id).toBe(input.items[0].id);
        expect(result.items[0].name).toBe(input.items[0].name);
        expect(result.items[0].price).toBe(input.items[0].price);
        expect(result.items[1].id).toBe(input.items[1].id);
        expect(result.items[1].name).toBe(input.items[1].name);
        expect(result.items[1].price).toBe(input.items[1].price);
        expect(result.total).toBe(75.0) 

        const output = await facade.findInvoice({
            id: result.id
        })

        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.address.street).toBe(input.street);
        expect(output.address.number).toBe(input.number);
        expect(output.address.complement).toBe(input.complement);
        expect(output.address.city).toBe(input.city);
        expect(output.address.state).toBe(input.state);
        expect(output.address.zipCode).toBe(input.zipCode);
        expect(output.items[0].id).toBe(input.items[0].id);
        expect(output.items[0].name).toBe(input.items[0].name);
        expect(output.items[0].price).toBe(input.items[0].price);
        expect(output.items[1].id).toBe(input.items[1].id);
        expect(output.items[1].name).toBe(input.items[1].name);
        expect(output.items[1].price).toBe(input.items[1].price);
        expect(output.total).toBe(75.0) 
        expect(output.createdAt).toBeDefined() 
    })
})