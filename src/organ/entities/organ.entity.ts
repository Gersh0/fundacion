import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { QualityChecks } from 'src/quality-check/entities/quality-check.entity';
import { Users } from 'src/auth/entities/auth.entity';

@Entity()
export class Organs {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    type: string;

    @Column()
    availability: boolean;

    @Column()
    bloodType: string;

    @OneToMany(() => QualityChecks, (qualityCheck) => qualityCheck.organ)
    qualityChecks: QualityChecks[];

    @ManyToOne(() => Users, (provider) => provider.organs)
    provider: Users;

    @ManyToOne(() => Users, (client) => client.organs)
    client: Users;
}