import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganService } from './organ.service';
import { OrganController } from './organ.controller';
import { Organ } from './entities/organ.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import { Client } from 'src/client/entities/client.entity';
import { QualityCheck } from 'src/quality-check/entities/quality-check.entity';

@Module({
  controllers: [OrganController],
  providers: [OrganService],
  imports: [TypeOrmModule.forFeature([Organ, QualityCheck, Provider, Client])],
})
export class OrganModule {}
