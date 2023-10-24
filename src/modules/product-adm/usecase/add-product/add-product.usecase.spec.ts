import AddProductUsecase from "./add-product.usecase";

describe("Add Product Use Case unit test", () => {
    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn()
        }
    }
    it("Should add a product", async () => {
        const repository = MockRepository();
        const usecase = new AddProductUsecase(repository);
        const input = {
            name: "Product 1",
            description: "Description Product 1",
            purchasePrice: 100,
            stock: 10,
        }
        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.description).toBe(input.description);
        expect(result.purchasePrice).toBe(input.purchasePrice);
        expect(result.stock).toBe(input.stock);
    })
})