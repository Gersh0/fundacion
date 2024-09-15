import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { QualityCheckModule } from './quality-check/quality-check.module';
import { QualityCheck } from './quality-check/entities/quality-check.entity';
import { Organ } from './organ/entities/organ.entity';
import { User } from './auth/entities/auth.entity';
import { OrganModule } from './organ/organ.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { AppService } from './app.service';

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
      entities: [User, Organ, QualityCheck],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    OrganModule, 
    QualityCheckModule, AuthModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
