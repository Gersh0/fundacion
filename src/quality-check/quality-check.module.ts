import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityCheckController } from './quality-check.controller';
import { QualityChecks } from './entities/quality-check.entity';
import { QualityCheckService } from './quality-check.service';
import { Organs } from '../organ/entities/organ.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [QualityCheckController],
  providers: [QualityCheckService],
  imports: [TypeOrmModule.forFeature([QualityChecks, Organs]), AuthModule],
})
export class QualityCheckModule {}
