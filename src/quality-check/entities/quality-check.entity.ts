import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Organs } from 'src/organ/entities/organ.entity';

@Entity()
export class QualityChecks {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Organs, (organ) => organ.qualityChecks)
  organ: Organs;

  @Column()
  dateChecked: Date;

  @Column()
  result: boolean;

  @Column()
  notes: string;
}
