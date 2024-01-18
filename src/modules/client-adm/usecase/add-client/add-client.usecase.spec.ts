import AddClientUsecase from "./add-client.usecase";

describe("Add Client Use Case unit test", () => {
    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn()
        }
    }
    it("Should add a product", async () => {
        const repository = MockRepository();
        const usecase = new AddClientUsecase(repository);
        const input = {
            name: "Client 1",
            email: "test@test.com.br",
            document: "123456789",
            address: {
                street: "street",
                number: "number",
                complement: "complement",
                city: "city",
                state: "state",
                zipCode: "zipCode",
            }
        }
        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.address.street).toBe(input.address.street)
        expect(result.address.number).toBe(input.address.number)
        expect(result.address.complement).toBe(input.address.complement)
        expect(result.address.city).toBe(input.address.city)
        expect(result.address.state).toBe(input.address.state)
        expect(result.address.zipCode).toBe(input.address.zipCode)
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    })
})