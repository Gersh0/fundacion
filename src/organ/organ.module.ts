import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityChecks } from '../quality-check/entities/quality-check.entity';
import { OrganController } from './organ.controller';
import { Users } from '../auth/entities/auth.entity';
import { AuthModule } from '../auth/auth.module';
import { Organs } from './entities/organ.entity';
import { OrganService } from './organ.service';

@Module({
  controllers: [OrganController],
  providers: [OrganService],
  imports: [TypeOrmModule.forFeature([Organs, QualityChecks, Users]), AuthModule],
})
export class OrganModule {}
