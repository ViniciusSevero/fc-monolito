import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
    async find(id: string): Promise<Product> {
        const productdb = await ProductModel.findOne({
            where: {id: id}
        })
        if(!productdb) {
            throw new Error(`Product with id ${id} not found`)
        }
        return new Product({
            id: new Id(productdb.id),
            name: productdb.name,
            description: productdb.description,
            salesPrice: productdb.salesPrice
        })
    }
    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll()
        return products.map(productdb => (
            new Product({
                id: new Id(productdb.id),
                name: productdb.name,
                description: productdb.description,
                salesPrice: productdb.salesPrice
            })
        ))
    }

}