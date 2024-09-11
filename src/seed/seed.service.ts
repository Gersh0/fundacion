import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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
  ) { }

  async populateDB() {
    await this.organRepository.delete({});
    await this.userRepository.delete({});

    const usersEncrypted = await Promise.all(USERS_SEED.map(async user => {
      const hashedPassword = await this.encryptPassword(user.password);
      return {
        ...user,
        password: hashedPassword
      }
    }));

    await this.userRepository.save(usersEncrypted);
    await this.organRepository.save(ORGANS_SEED);
  }

  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

}



