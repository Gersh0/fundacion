import { Organs } from 'src/organ/entities/organ.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
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

  @Column('simple-array')
  roles: string[];

  @OneToMany(() => Organs, (organ) => organ.client)
  organs: Organs[];

  @Column()
  isActive: boolean;
}
