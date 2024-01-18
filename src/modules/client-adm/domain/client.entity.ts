import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object"

type ClientProps = {
    id?: Id;
    name: string;
    email: string;
    document: string;
    address: {
        street: string,
        number: string,
        complement: string,
        city: string,
        state: string,
        zipCode: string
    }
    createdAt?: Date,
    updatedAt?: Date
};

export default class Client extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _email: string;
    private _document: string;
    private _address: Address;

    constructor(props: ClientProps) {
        super(props.id);
        this._name = props.name;
        this._email = props.email;
        this._document = props.document;
        this._address = new Address(props.address);
        if(props.createdAt) {
            this.createdAt = props.createdAt;
        }
        if(props.updatedAt) {
            this.updatedAt = props.updatedAt;
        }
    }

    public get name() : string {
        return this._name;
    }

    public get email() : string {
        return this._email;
    }

    public get document() : string {
        return this._document;
    }

    public get address() : Address {
        return this._address;
    }
    
}