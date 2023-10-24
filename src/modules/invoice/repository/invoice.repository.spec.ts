import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";
import Invoice from "../domain/invoice";
import InvoiceRepository from "./invoice.repository";

describe("Invoice Repository Unit testes", () => {
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

    it("Should add and find a Invoice", async () => {
        const repository = new InvoiceRepository();

        const invoice = new Invoice({
            id: new Id("1"),
            name: "test",
            document: "123456789",
            address: {
                street: "street",
                number: "number",
                complement: "complement",
                city: "city",
                state: "state",
                zipCode: "zipCode"
            },
            items: [{
                id: new Id("id item 1"),
                name: "name",
                price: 25.0
            },
            {
                id: new Id("id item 2"),
                name: "name 2",
                price: 50.0
            }]
        })

        const savedInvoice = await repository.save(invoice)
        const foundInvoice = await repository.find(invoice.id.id)

        expect(foundInvoice).toBeDefined()
        expect(foundInvoice.id.id).toBe(savedInvoice.id.id)
        expect(foundInvoice.name).toBe(savedInvoice.name)
        expect(foundInvoice.address.city).toBe(savedInvoice.address.city)
        expect(foundInvoice.address.complement).toBe(savedInvoice.address.complement)
        expect(foundInvoice.address.number).toBe(savedInvoice.address.number)
        expect(foundInvoice.address.state).toBe(savedInvoice.address.state)
        expect(foundInvoice.address.street).toBe(savedInvoice.address.street)
        expect(foundInvoice.address.zipCode).toBe(savedInvoice.address.zipCode)
        expect(foundInvoice.items.length).toBe(2)
        expect(foundInvoice.items[0].id.id).toBe(savedInvoice.items[0].id.id)
        expect(foundInvoice.items[0].name).toBe(savedInvoice.items[0].name)
        expect(foundInvoice.items[0].price).toBe(savedInvoice.items[0].price)
        expect(foundInvoice.items[1].id.id).toBe(savedInvoice.items[1].id.id)
        expect(foundInvoice.items[1].name).toBe(savedInvoice.items[1].name)
        expect(foundInvoice.items[1].price).toBe(savedInvoice.items[1].price)
        expect(foundInvoice.createdAt).toBeDefined()
        expect(foundInvoice.updatedAt).toBeDefined()
    })

})
