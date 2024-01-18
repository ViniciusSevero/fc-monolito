import AddProductUsecase from "../usecase/add-product/add-product.usecase";
import CheckStockUscase from "../usecase/check-stock/check-stock.usecase";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addProductUseCase: AddProductUsecase;
    private _checkStockUseCase: CheckStockUscase;

    constructor(addProductUseCase: AddProductUsecase, checkStockUseCase: CheckStockUscase) {
        this._addProductUseCase = addProductUseCase;
        this._checkStockUseCase = checkStockUseCase;
    }

    async addProduct(input: AddProductFacadeInputDto): Promise<void> {
        await this._addProductUseCase.execute({
            id: input.id,
            description: input.description,
            name: input.name,
            purchasePrice: input.purchasePrice,
            salesPrice: input.salesPrice,
            stock: input.stock
        })
    }
    async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        const result = await this._checkStockUseCase.execute({
            id: input.id
        })
        return {
            id: result.id,
            stock: result.stock
        }
        
    }

}