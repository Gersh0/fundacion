import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Organ } from 'src/organ/entities/organ.entity';
import { User } from 'src/auth/entities/auth.entity';
import { ORGANS_SEED } from './data/organs.seed';
import { USERS_SEED } from './data/users.seed';
import { QualityCheck } from '../quality-check/entities/quality-check.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Organ)
    private readonly organRepository: Repository<Organ>,
    @InjectRepository(QualityCheck)
    private readonly qualityCheckRepository: Repository<QualityCheck>,
  ) {}

  async populateDB() {
    await this.qualityCheckRepository.delete({});
    console.log('Quality checks deleted');
    await this.organRepository.delete({});
    console.log('Organs deleted');
    await this.userRepository.delete({});
    console.log('Users deleted');

    const usersEncrypted = await Promise.all(
      USERS_SEED.map(async (user) => {
        const hashedPassword = await this.encryptPassword(user.password);
        return {
          ...user,
          password: hashedPassword,
        };
      }),
    );

    const savedUsers = await this.userRepository.save(usersEncrypted);
    console.log('Users saved');

    // Map user IDs to the organs
    const organsWithUsers = ORGANS_SEED.map((organ) => {
      const provider = savedUsers.find((user) => user.id === organ.provider.id);
      const client = savedUsers.find((user) => user.id === organ.client.id);
      return {
        ...organ,
        provider,
        client,
      };
    });

    await this.organRepository.save(organsWithUsers);
    console.log('Organs saved');

    return 'Database populated';
  }

  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
