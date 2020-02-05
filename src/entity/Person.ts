import {BaseEntity, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number | undefined;
}
