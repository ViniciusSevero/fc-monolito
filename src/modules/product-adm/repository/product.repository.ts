import Id from "../../@shared/domain/value-object/id.value-object";
import ProductEntity from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
    async add(product: ProductEntity): Promise<void> {
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    async find(id: string): Promise<ProductEntity> {
        const productdb = await ProductModel.findOne({
            where: {id: id}
        })
        if(!productdb) {
            throw new Error(`Product with id ${id} not found`)
        }
        return new ProductEntity({
            id: new Id(productdb.id),
            name: productdb.name,
            description: productdb.description,
            purchasePrice: productdb.purchasePrice,
            stock: productdb.stock,
            createdAt: productdb.createdAt,
            updatedAt: productdb.updatedAt,
        })
    }

}