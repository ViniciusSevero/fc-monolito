import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

export type InvoiceItemProps = {
    id?: Id;
    name: string;
    price: number;
    updatedAt?: Date
    createdAt?: Date
}

export default class InvoiceItem extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _price: number;

    constructor(props: InvoiceItemProps) {
        super(props.id);
        this._name = props.name;
        this._price = props.price;
        if(props.createdAt) {
            this.createdAt = props.createdAt;
        }
        if(props.updatedAt) {
            this.updatedAt = props.updatedAt;
        }
    }
    
    public get name() : string {
        return this._name
    }
    
    public get price() : number {
        return this._price
    }
}