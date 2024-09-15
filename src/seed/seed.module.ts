import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityCheck } from '../quality-check/entities/quality-check.entity';
import { Organ } from '../organ/entities/organ.entity';
import { User } from '../auth/entities/auth.entity';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TypeOrmModule.forFeature([User, Organ, QualityCheck])],
})
export class SeedModule {}
