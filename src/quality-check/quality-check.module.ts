import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityCheckService } from './quality-check.service';
import { QualityCheckController } from './quality-check.controller';
import { QualityCheck } from './entities/quality-check.entity';
import { Organ } from 'src/organ/entities/organ.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [QualityCheckController],
  providers: [QualityCheckService],
  imports: [TypeOrmModule.forFeature([QualityCheck, Organ]),AuthModule],
})
export class QualityCheckModule {}
