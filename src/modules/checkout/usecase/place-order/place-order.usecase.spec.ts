import { CheckStockFacadeInputDto } from "../../../product-adm/facade/product-adm.facade.interface"
import { FindProductFacadeInputDTO } from "../../../store-catalog/facade/store-catalog.facade.interface"
import { PlaceOrderInputDto } from "./place-order.dto"
import PlaceOrderUsecase from "./place-order.usecase"

describe("PlaceOrderUsecase unit test", () => {
    const placeOrderUsecase = new PlaceOrderUsecase(null, null, null, null, null, null)
    describe("Execute Method", () => {
        it("Should throw an error when client not found", async () => {
            const mockClientFacade = {
                findClient: jest.fn().mockResolvedValue(null),
                addClient: jest.fn()
            }
            placeOrderUsecase['_clientFacade'] = mockClientFacade
            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            }

            await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
                new Error("Client not found")
            )
        })
        it("Should throw an error when products aren't valid", async () => {
            const mockClientFacade = {
                findClient: jest.fn().mockResolvedValue({
                    id: "1",
                    name: "",
                    email: "",
                    address: {
                        street: "street",
                        number: "number",
                        complement: "complement",
                        city: "city",
                        state: "state",
                        zipCode: "zipCode",
                    },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }),
                addClient: jest.fn()
            }
            placeOrderUsecase['_clientFacade'] = mockClientFacade
            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            }

            await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
                new Error("No products selected")
            )
        })

        describe("Should process an order", () => {
            const mockClientFacade = {
                findClient: jest.fn().mockResolvedValue({
                    id: "1",
                    name: "name",
                    email: "email",
                    address: {
                        street: "street",
                        number: "number",
                        complement: "complement",
                        city: "city",
                        state: "state",
                        zipCode: "zipCode",
                    },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }),
                addClient: jest.fn()
            }
            
            const mockProductFacade = {
                checkStock: jest.fn(
                    (input: CheckStockFacadeInputDto) => Promise.resolve({
                        id: input.id,
                        stock: 1
                    })
                ),
                addProduct: jest.fn()
            }

            const mockStoreCatalogFacade = {
                find: jest.fn(
                    (input: FindProductFacadeInputDTO) => Promise.resolve({
                        id: input.id,
                        name: `product ${input.id}`,
                        description: `product ${input.id} description`,
                        salesPrice: 10
                    })
                ),
                findAll: jest.fn()
            }

            const mockInvoiceFacade = {
                generateInvoice: jest.fn().mockResolvedValue({
                    id: "test",
                    name: "name",
                    document: "document",
                    street: "street",
                    number: "number",
                    complement: "complement",
                    city: "city",
                    state: "state",
                    zipCode: "zipCode",
                    items: [{
                        id: "itemId",
                        name: "item name",
                        price: 10
                    }],
                    total: 10
                }),
                findInvoice: jest.fn()
            }

            const mockRepository = {
                addOrder: jest.fn(),
                findOrder: jest.fn(),
            }

            it("Should not be approved", async () => {
                const mockPaymenteFacade = {
                    process: jest.fn().mockResolvedValue({
                        transactionId: "1t",
                        orderId: "1o",
                        amount: 20.0,
                        status: "error",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })
                }
                placeOrderUsecase['_paymentFacade'] = mockPaymenteFacade
                placeOrderUsecase['_clientFacade'] = mockClientFacade
                placeOrderUsecase['_productFacade'] = mockProductFacade 
                placeOrderUsecase['_storeCatalogFacade'] = mockStoreCatalogFacade
                placeOrderUsecase[`_invoiceFacade`] = mockInvoiceFacade
                placeOrderUsecase['_repository'] = mockRepository

                const input: PlaceOrderInputDto = {
                    clientId: "1c",
                    products: [{productId: "1"}, {productId: "2"}]
                }

                const output = await placeOrderUsecase.execute(input);

                expect(output.invoiceId).toBe(null)
                expect(output.total).toBe(20)
                expect(output.products).toStrictEqual(
                    [{productId: "1"}, {productId: "2"}]
                )
                expect(mockClientFacade.findClient).toHaveBeenCalledTimes(1)
                expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(2)
                expect(mockStoreCatalogFacade.find).toHaveBeenCalledTimes(2)
                expect(mockPaymenteFacade.process).toHaveBeenCalledTimes(1)
                expect(mockPaymenteFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                })
                expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledTimes(0)


            })

            it("Should be approved", async () => {
                const mockPaymenteFacade = {
                    process: jest.fn().mockResolvedValue({
                        transactionId: "1t",
                        orderId: "1o",
                        amount: 20.0,
                        status: "approved",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })
                }
                placeOrderUsecase['_paymentFacade'] = mockPaymenteFacade
                placeOrderUsecase['_clientFacade'] = mockClientFacade
                placeOrderUsecase['_productFacade'] = mockProductFacade 
                placeOrderUsecase['_storeCatalogFacade'] = mockStoreCatalogFacade
                placeOrderUsecase[`_invoiceFacade`] = mockInvoiceFacade
                placeOrderUsecase['_repository'] = mockRepository

                const input: PlaceOrderInputDto = {
                    clientId: "1c",
                    products: [{productId: "1"}, {productId: "2"}]
                }

                const output = await placeOrderUsecase.execute(input);

                expect(output.invoiceId).toBeDefined()
                expect(output.total).toBe(20)
                expect(output.products).toStrictEqual(
                    [{productId: "1"}, {productId: "2"}]
                )
                expect(mockClientFacade.findClient).toHaveBeenCalledTimes(1)
                expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(2)
                expect(mockStoreCatalogFacade.find).toHaveBeenCalledTimes(2)
                expect(mockPaymenteFacade.process).toHaveBeenCalledTimes(1)
                expect(mockPaymenteFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                })
                expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledTimes(1)
                expect(mockRepository.addOrder).toHaveBeenCalledTimes(1)


            })

        })
    })  

    describe("ValidateProducts", () => {
        it("Should throw an error when products aren't selected", async () => {
            const mockClientFacade = {
                findClient: jest.fn().mockResolvedValue(null),
                addClient: jest.fn()
            }
            placeOrderUsecase['_clientFacade'] = mockClientFacade

            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            }

            await expect(placeOrderUsecase["validateProducts"](input.products)).rejects.toThrow(
                new Error("No products selected")
            )
        })

        it("Should throw an error when product is out of stock", async () => {
            const mockProductFacade = {
                checkStock: jest.fn(
                    (input: CheckStockFacadeInputDto) => Promise.resolve({
                        id: input.id,
                        stock: input.id === "1" ? 0 : 1
                    })
                ),
                addProduct: jest.fn()
            }
            placeOrderUsecase['_productFacade'] = mockProductFacade

            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: [{productId: "0"}, {productId: "1"}]
            }

            await expect(placeOrderUsecase["validateProducts"](input.products)).rejects.toThrow(
                new Error("Product 1 is out of stock")
            )
        })
    })

    describe("GetProduct Method", () => {
        const mockDate = new Date(2000, 1, 1)
        beforeAll(() => {
            jest.setSystemTime(mockDate)
        })

        afterAll(() => {
            jest.useRealTimers()
        })

        it("Should throw error when product not found", async() => {
            // const mockStoreCatalogFacade = {
            //     find: jest.fn(
            //         (input: FindProductFacadeInputDTO) => Promise.resolve({
            //             id: input.id,
            //             name: "product 1",
            //             description: "product 1 description",
            //             salesPrice: 10
            //         })
            //     ),
            //     findAll: jest.fn()
            // }
            const mockStoreCatalogFacade = {
                    find: jest.fn().mockResolvedValue(null),
                    findAll: jest.fn()
                }
            placeOrderUsecase['_storeCatalogFacade'] = mockStoreCatalogFacade

            await expect(placeOrderUsecase["getProduct"]("0")).rejects.toThrow(
                new Error("Product 0 doesn't exist")
            )
        })

        it("Should retrieve a product", async() => {
            const mockStoreCatalogFacade = {
                find: jest.fn(
                    (input: FindProductFacadeInputDTO) => Promise.resolve({
                        id: input.id,
                        name: "product 1",
                        description: "product 1 description",
                        salesPrice: 10
                    })
                ),
                findAll: jest.fn()
            }
            placeOrderUsecase['_storeCatalogFacade'] = mockStoreCatalogFacade

            const product = await placeOrderUsecase["getProduct"]("1")

            expect(product.id.id).toBe("1")
            expect(product.name).toBe("product 1")
            expect(product.description).toBe("product 1 description")
            expect(product.salesPrices).toBe(10)
            expect(mockStoreCatalogFacade.find).toHaveBeenCalledTimes(1)
        })
    })
})