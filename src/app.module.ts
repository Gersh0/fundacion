import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProviderModule } from './provider/provider.module';
import { ClientModule } from './client/client.module';
import { OrganModule } from './organ/organ.module';
import { QualityCheckModule } from './quality-check/quality-check.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client/entities/client.entity';
import { Organ } from './organ/entities/organ.entity';
import { Provider } from './provider/entities/provider.entity';
import { QualityCheck } from './quality-check/entities/quality-check.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Client, Organ, Provider, QualityCheck],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProviderModule, 
    ClientModule, 
    OrganModule, 
    QualityCheckModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
