import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Local} from "./Local";
import {User} from "./User";
import {Person} from "./Person";

@Entity()
export class Sell extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number | undefined;

    @CreateDateColumn()
    created_at: 'string' | undefined;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number | undefined;

    @OneToOne(type => Local, {cascade: true})
    @JoinColumn()
    local: Local | undefined;

    @OneToOne(type => User, {cascade: true})
    @JoinColumn()
    user: User | undefined;

    @OneToOne(type => Person, {cascade: true})
    @JoinColumn()
    person: Person | undefined;
}
