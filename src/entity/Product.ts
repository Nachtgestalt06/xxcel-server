import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('varchar', {length: 13, unique: true})
    barcode: string | undefined;

    @Column('varchar', {length: 50})
    model: string | undefined;

    @Column('varchar', {length: 30})
    type: string | undefined;

    @Column('varchar', {length: 50})
    brand: string | undefined;

    @Column('text')
    description: string | undefined;

    @Column('decimal', { precision: 10, scale: 2 })
    cost: number | undefined;

    @Column('decimal', { precision: 10, scale: 2 })
    wholesale_price: number | undefined;

    @Column('decimal', { precision: 10, scale: 2 })
    distributor_price: number | undefined;

    @Column('decimal', { precision: 10, scale: 2 })
    public_price: number | undefined;

    @Column('varchar')
    url_image: string | undefined;

    @Column({type: 'bit', default: true})
    active: string | undefined;

    @CreateDateColumn()
    created_at: 'string' | undefined;

    @UpdateDateColumn()
    updated_at: 'string' | undefined;
}