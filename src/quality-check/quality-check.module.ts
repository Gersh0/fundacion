import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityCheckService } from './quality-check.service';
import { QualityCheckController } from './quality-check.controller';
import { QualityCheck } from './entities/quality-check.entity';
import { Organ } from 'src/organ/entities/organ.entity';

@Module({
  controllers: [QualityCheckController],
  providers: [QualityCheckService],
  imports: [TypeOrmModule.forFeature([QualityCheck, Organ])],
})
export class QualityCheckModule {}
