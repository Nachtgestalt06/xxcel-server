import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number | undefined;

    @Column({type: 'varchar', length: 25})
    name: string | undefined;

    // @OneToOne(type => User, user => user.role)
    // user: User | undefined;
}
