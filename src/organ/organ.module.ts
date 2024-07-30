import { Module } from '@nestjs/common';
import { OrganService } from './organ.service';
import { OrganController } from './organ.controller';

@Module({
  controllers: [OrganController],
  providers: [OrganService],
})
export class OrganModule {}
