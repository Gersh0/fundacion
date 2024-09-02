import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Organ } from 'src/organ/entities/organ.entity';
import { USERS_SEED } from './data/users.seed';
import { ORGANS_SEED } from './data/organs.seed';

@Injectable()
export class SeedService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Organ)
    private readonly organRepository: Repository<Organ>,
  ) {}

  async populateDB() {
    await this.userRepository.delete({});
    await this.organRepository.delete({});
    
    await this.userRepository.save(USERS_SEED);
    await this.organRepository.save(ORGANS_SEED);

    return 'Database populated successfully';
  }
}
