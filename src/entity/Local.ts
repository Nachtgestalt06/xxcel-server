import {BaseEntity, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Local extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number | undefined;

}
