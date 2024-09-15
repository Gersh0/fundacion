import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityCheck } from '../quality-check/entities/quality-check.entity';
import { OrganController } from './organ.controller';
import { User } from '../auth/entities/auth.entity';
import { AuthModule } from '../auth/auth.module';
import { Organ } from './entities/organ.entity';
import { OrganService } from './organ.service';

@Module({
  controllers: [OrganController],
  providers: [OrganService],
  imports: [TypeOrmModule.forFeature([Organ, QualityCheck, User]), AuthModule],
})
export class OrganModule {}
