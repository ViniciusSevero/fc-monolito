import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "./client.entity";
import Product from "./product.entity";

type OrderProps = {
    id?: Id,
    client: Client,
    products: Product[],
    status?: string,
    createdAt?: Date,
    updatedAt?: Date
}

export default class Order extends BaseEntity implements AggregateRoot {
    private _client: Client;
    private _products: Product[];
    private _status: string;

    constructor(props: OrderProps) {
        super(props.id);
        this._client = props.client;
        this._products = props.products;
        this._status = props.status;
        if(props.createdAt) {
            this.createdAt = props.createdAt;
        }
        if(props.updatedAt) {
            this.updatedAt = props.updatedAt;
        }
    }

    approved() {
        this._status = "approved"
    }

    
    public get client() : Client {
        return this._client
    }
    
    public get products() : Product[] {
        return this._products
    }

    public get status() : string {
        return this._status
    }

    total() {
        return this._products.reduce((total, product) => total + product.salesPrices, 0)
    }
}