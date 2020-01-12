import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Role} from "./Role";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string | undefined;

    @Column({type: 'varchar', length: 100, unique: true})
    username: string | undefined;

    @Column({type: 'varchar', nullable: false, select: false})
    password: number | undefined;

    @OneToOne(type => Role, {cascade: true})
    @JoinColumn()
    role: Role | undefined;

    @Column({type: 'bit', default: true})
    active: string | undefined;

    @CreateDateColumn()
    created_at: 'string' | undefined;

    @UpdateDateColumn()
    updated_at: 'string' | undefined;

    // model methods
}
