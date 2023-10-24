import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import CheckStockUscase from "./check-stock.usecase"

describe("Check Stock Usecase Unit teste", () => {

    const mockecProduct = new Product({
        id: new Id(),
        name: "Product 1",
        description: "Description Product 1",
        purchasePrice: 100,
        stock: 10,
    })
    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(mockecProduct))
        }
    }

    it("Should get a stock from a product", async () => {
        const usecase = new CheckStockUscase(MockRepository());
        const result = await usecase.execute({
            id: "Product 1"
        })
        expect(result.id).toBe(mockecProduct.id.id)
        expect(result.stock).toBe(mockecProduct.stock)
    })
})