import { Organ } from "src/organ/entities/organ.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    password: string;

    @Column("simple-array")
    roles: string[];

    @OneToMany(() => Organ, (organ) => organ.client)
    organs: Organ[];

    @Column()
    isActive: boolean;
}