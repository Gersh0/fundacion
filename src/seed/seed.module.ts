import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityChecks } from '../quality-check/entities/quality-check.entity';
import { Organs } from '../organ/entities/organ.entity';
import { Users } from '../auth/entities/auth.entity';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TypeOrmModule.forFeature([Users, Organs, QualityChecks])],
})
export class SeedModule {}
