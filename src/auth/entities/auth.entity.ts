import { Organ } from "src/organ/entities/organ.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @OneToMany(() => Organ, (organ) => organ.client)
    organs: Organ[];

    @Column()
    isActive: boolean;
}