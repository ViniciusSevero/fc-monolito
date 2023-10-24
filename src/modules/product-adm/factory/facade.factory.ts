import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUsecase from "../usecase/add-product/add-product.usecase";
import CheckStockUscase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {
    static create() {
        const repository = new ProductRepository();
        const addProductUseCase = new AddProductUsecase(repository);
        const checkStockUseCase = new CheckStockUscase(repository);
        return new ProductAdmFacade(
            addProductUseCase, checkStockUseCase
        )
    }
}