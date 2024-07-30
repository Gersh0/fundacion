import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProviderModule } from './provider/provider.module';
import { ClientModule } from './client/client.module';
import { OrganModule } from './organ/organ.module';

@Module({
  imports: [ProviderModule, ClientModule, OrganModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
