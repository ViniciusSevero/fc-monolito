import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address, { AddressProps } from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem, { InvoiceItemProps } from "./invoice-item";

type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: AddressProps
    items: InvoiceItemProps[],
    createdAt?: Date,
    updatedAt?: Date
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: InvoiceItem[];

    constructor(props: InvoiceProps) {
        super(props.id);
        this._name = props.name;
        this._document = props.document;
        this._address = new Address({
            street: props.address.street,
            number: props.address.number,
            complement: props.address.complement,
            city: props.address.city,
            state: props.address.state,
            zipCode: props.address.zipCode,
        })
        this._items = props.items.map(i => new InvoiceItem({
            id: i.id,
            name: i.name,
            price: i.price
        }))
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
    public get document() : string {
        return this._document
    }
    public get address() : Address {
        return this._address
    }
    public get items() : InvoiceItem[] {
        return this._items
    }
}