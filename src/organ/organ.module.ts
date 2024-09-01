import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganService } from './organ.service';
import { OrganController } from './organ.controller';
import { Organ } from './entities/organ.entity';
import { QualityCheck } from 'src/quality-check/entities/quality-check.entity';
import { User } from 'src/auth/entities/auth.entity';

@Module({
  controllers: [OrganController],
  providers: [OrganService],
  imports: [TypeOrmModule.forFeature([Organ, QualityCheck, User])],
})
export class OrganModule {}
