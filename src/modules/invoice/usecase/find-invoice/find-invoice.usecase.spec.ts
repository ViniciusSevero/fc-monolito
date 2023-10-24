import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice"
import FindInvoiceUsecase from "./find-invoice.usecase"

describe("Find Invoice Use Case unit test", () => {

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
            save: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(mockedInvoice))
        }
    }
    it("Should find a invoice", async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUsecase(repository);
    
        const result = await usecase.execute({
            id: "1"
        });

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(mockedInvoice.name);
        expect(result.address.street).toBe(mockedInvoice.address.street);
        expect(result.address.number).toBe(mockedInvoice.address.number);
        expect(result.address.complement).toBe(mockedInvoice.address.complement);
        expect(result.address.city).toBe(mockedInvoice.address.city);
        expect(result.address.state).toBe(mockedInvoice.address.state);
        expect(result.address.zipCode).toBe(mockedInvoice.address.zipCode);
        expect(result.items[0].id).toBe(mockedInvoice.items[0].id.id);
        expect(result.items[0].name).toBe(mockedInvoice.items[0].name);
        expect(result.items[0].price).toBe(mockedInvoice.items[0].price);
        expect(result.items[1].id).toBe(mockedInvoice.items[1].id.id);
        expect(result.items[1].name).toBe(mockedInvoice.items[1].name);
        expect(result.items[1].price).toBe(mockedInvoice.items[1].price);
        expect(result.total).toBe(75.0) 
        expect(result.createdAt).toBeDefined() 
    })
})