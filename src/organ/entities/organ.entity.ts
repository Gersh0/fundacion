import { User } from 'src/auth/entities/auth.entity';
import { QualityCheck } from 'src/quality-check/entities/quality-check.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Organ {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    type: string;

    @Column()
    availability: boolean;

    @OneToMany(() => QualityCheck, (qualityCheck) => qualityCheck.organ)
    qualityChecks: QualityCheck[];

    @ManyToOne(() => User, (provider) => provider.organs)
    provider: User;

    @ManyToOne(() => User, (client) => client.organs)
    client: User;
}