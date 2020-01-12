import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";

@Entity()
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({type: 'varchar'})
    name: string | undefined;

    @Column({type: 'varchar'})
    last_name: string | undefined;

    @Column({type: 'varchar', length: 100, nullable: true})
    address: 'string' | undefined;

    @Column({type: 'varchar', length: 20, nullable: true})
    phone: 'string' | undefined;

    @Column({type: 'varchar'})
    email: string | undefined;

    @Column({type: 'int'})
    employee_number: number | undefined;

    @Column({type: 'datetime'})
    hiring_date: number | undefined;

    @OneToOne(type => User, {cascade: true})
    @JoinColumn()
    user: User | undefined;

    @CreateDateColumn()
    created_at: 'string' | undefined;

    @UpdateDateColumn()
    updated_at: 'string' | undefined;
}
