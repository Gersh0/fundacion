import { Client } from 'src/client/entities/client.entity';
import { Provider } from 'src/provider/entities/provider.entity';
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

    @ManyToOne(() => Provider, (provider) => provider.organs)
    provider: Provider;

    @ManyToOne(() => Client, (client) => client.organs)
    client: Client;
}