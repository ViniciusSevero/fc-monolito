import Id from "../../@shared/domain/value-object/id.value-object";
import ClientModel from "../../client-adm/repository/client.model";
import ProductModel from "../../store-catalog/repository/product.model";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements CheckoutGateway{
    async addOrder(model: Order): Promise<void> {
        const order = await OrderModel.create({
            id: model.id.id,
            clientId: model.client.id.id,
            status: model.status,
            total: model.total(),
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
        })

        let promises: Promise<Product>[] = await model.products.map(async product => {
            const orderItemDb = await OrderItemModel.create({
                id: new Id().id,
                orderId: order.id,
                productId: product.id.id,
                price: product.salesPrices,
            })

            return new Product({
                id: new Id(orderItemDb.id),
                name: product.name,
                description: product.description,
                salesPrices: orderItemDb.price,
            })
        });

        await Promise.all(promises)
    }

    async findOrder(id: string): Promise<Order> {
        const order = await OrderModel.findOne({where: {id: id}})
        const orderItems = await OrderItemModel.findAll({where: {orderId: id}})
        const client = await ClientModel.findOne({where: {id: order.clientId}})
       
        const promises: Promise<Product>[] = await orderItems.map(async item => {
            const product = await ProductModel.findOne({where: {id: item.productId}})
            return new Product({
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrices: item.price,
            })
        })

        const products = await Promise.all(promises)

        return new Order({
            id: new Id(order.id),
            status: order.status,
            client: new Client({
                id: new Id(client.id),
                name: client.name,
                email: client.email,
                address: client.street
            }),
            products: products,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        });

    }
}