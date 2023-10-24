import Id from "../value-object/id.value-object";

export default class BaseEntity {
    private _id: Id;
    private _createdAt: Date
    private _updatedAt: Date

    constructor(id: Id) {
        this._id = id || new Id();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    get id(): Id {
        return this._id
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(createdAt: Date) {
        this._createdAt = createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }
}