import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUsecase from "./find-product.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1",
    salesPrice: 10
})

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe("Find products Usecase unit tests", () => {
    it("Should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUsecase(productRepository);

        const result = await usecase.execute({id: "1"});

        expect(productRepository.find).toHaveBeenCalled();
        expect(product.id.id).toBe(result.id);
        expect(product.name).toBe(result.name);
        expect(product.description).toBe(result.description);
        expect(product.salesPrice).toBe(result.salesPrice);
    })
})