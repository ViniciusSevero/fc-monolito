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
            address: "24 street test"
        }
        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.address).toBe(input.address);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    })
})