import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import Order from "../../domain/order.entity"
import Product from "../../domain/product.entity"
import { FindOrderInputDto } from "./find-order.dto"
import FindOrderUsecase from "./find-order.usecase"

describe("FindOrderUsecase unit test", () => {
    const findOrderUsecase = new FindOrderUsecase(null)
    describe("Execute Method", () => {
        it("Should throw an error when order not found", async () => {
            const mockRepository = {
                findOrder: jest.fn().mockResolvedValue(null),
                addOrder: jest.fn()
            }
            findOrderUsecase['_repository'] = mockRepository
            const input: FindOrderInputDto = {
                id: "1",
            }

            await expect(findOrderUsecase.execute(input)).rejects.toThrow(
                new Error("Order not found")
            )
        })
        it("Should find an order", async () => {
            const mockOrderFacade = {
                findOrder: jest.fn().mockResolvedValue(new Order({
                    id: new Id(),
                    status: "approved",
                    client: new Client({
                        id: new Id(),
                        name: "name",
                        email: "email",
                        address: "address",
                    }),
                    products: [
                        new Product({
                            id: new Id(),
                            name: "name",
                            description: "description",
                            salesPrices: 10,
                        }),
                        new Product({
                            id: new Id(),
                            name: "name",
                            description: "description",
                            salesPrices: 10,
                        }),
                    ]
                })),
                addOrder: jest.fn()
            }
            findOrderUsecase['_repository'] = mockOrderFacade
            const input: FindOrderInputDto = {
                id: "1",
            }

            const result = await findOrderUsecase.execute(input)

            expect(result.id).toBeDefined()
            expect(result.status).toBe("approved")
            expect(result.total).toBe(20)
            expect(result.products.length).toBe(2)
        })
    })
})