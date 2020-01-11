import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    ID: number | undefined;

    @Column({type: 'varchar', length: 25})
    NAME: string | undefined;
}
