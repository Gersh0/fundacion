import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Organ } from 'src/organ/entities/organ.entity';
import { User } from 'src/auth/entities/auth.entity';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TypeOrmModule.forFeature([User, Organ])],
})
export class SeedModule {}
