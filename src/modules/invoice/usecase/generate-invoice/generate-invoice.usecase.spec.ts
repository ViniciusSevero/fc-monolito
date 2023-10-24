import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice"
import GenerateInvoiceUsecase from "./generate-invoice.usecase"

describe("Generate Invoice Use Case unit test", () => {

    const mockedInvoice = new Invoice({
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

    const MockRepository = () => {
        return {
            save: jest.fn().mockReturnValue(Promise.resolve(mockedInvoice)),
            find: jest.fn()
        }
    }
    it("Should add a invoice", async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUsecase(repository);
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
        const result = await usecase.execute(input);

        expect(repository.save).toHaveBeenCalled();
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
    })
})