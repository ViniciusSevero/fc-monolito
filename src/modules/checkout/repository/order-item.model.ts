import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "order_item",
    timestamps: false
})
export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    orderId: string;

    @Column({allowNull: false})
    productId: string;

    @Column({allowNull: false})
    price: number;
}