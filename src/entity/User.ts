import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    ID: string | undefined;

    @Column({type: 'varchar', length: 100})
    NAME: string | undefined;

    @Column({type: 'varchar', default: 'empleado'})
    ROLE: string | undefined;

    @Column({type: 'varchar', nullable: false})
    PASSWORD: number | undefined;

    @Column({type: 'varchar'})
    EMAIL: string | undefined;

    @Column({type: 'varchar', length: 20, nullable: true})
    PHONE: 'string' | undefined;

    @CreateDateColumn()
    CREATED_AT: 'string' | undefined;

    @UpdateDateColumn()
    UPDATED_AT: 'string' | undefined;

    // model methods
}
