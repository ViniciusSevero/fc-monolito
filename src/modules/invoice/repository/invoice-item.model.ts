import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "invoice_item",
    timestamps: false
})
export default class InvoiceItemModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    invoiceId: string;

    @Column({allowNull: false})
    name: string;

    @Column({allowNull: false})
    price: number;

    @Column({allowNull: false})
    createdAt: Date;

    @Column({allowNull: false})
    updatedAt: Date;

}