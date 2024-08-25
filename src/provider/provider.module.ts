import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { Provider } from './entities/provider.entity';
import { Organ } from 'src/organ/entities/organ.entity';

@Module({
  controllers: [ProviderController],
  providers: [ProviderService],
  imports: [TypeOrmModule.forFeature([Provider, Organ])],
})
export class ProviderModule {}
