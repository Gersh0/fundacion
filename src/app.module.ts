import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganModule } from './organ/organ.module';
import { QualityCheckModule } from './quality-check/quality-check.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organ } from './organ/entities/organ.entity';
import { QualityCheck } from './quality-check/entities/quality-check.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';

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
    QualityCheckModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
