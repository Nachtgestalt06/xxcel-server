import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";
import {OperationType} from "../globals";
import {Sell} from "./Sell";

@Entity()
export class Operation extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number | undefined;

    @Column({
        type: "enum",
        enum: OperationType
    })
    operation_type: OperationType | undefined;

    @CreateDateColumn()
    created_at: 'string' | undefined;

    @OneToOne(type => Product, {cascade: true})
    @JoinColumn()
    product_id: Product | undefined;

    @Column('int')
    quantity: number | undefined;

    @OneToOne(type => Sell, {cascade: true})
    @JoinColumn()
    sell_id: Sell | undefined;

    @Column('varchar')
    description: string | undefined;



}
