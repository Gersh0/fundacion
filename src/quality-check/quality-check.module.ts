import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityCheckController } from './quality-check.controller';
import { QualityCheck } from './entities/quality-check.entity';
import { QualityCheckService } from './quality-check.service';
import { Organ } from '../organ/entities/organ.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [QualityCheckController],
  providers: [QualityCheckService],
  imports: [TypeOrmModule.forFeature([QualityCheck, Organ]), AuthModule],
})
export class QualityCheckModule {}
