import { Organ } from 'src/organ/entities/organ.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class QualityCheck {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Organ, (organ) => organ.qualityChecks)
  organ: Organ;

  @Column()
  dateChecked: Date;

  @Column()
  result: boolean;

  @Column()
  notes: string;
}