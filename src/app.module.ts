import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { QualityCheckModule } from './quality-check/quality-check.module';
import { QualityChecks } from './quality-check/entities/quality-check.entity';
import { Organs } from './organ/entities/organ.entity';
import { Users } from './auth/entities/auth.entity';
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
      entities: [Users, Organs, QualityChecks],
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    AuthModule,
    OrganModule,
    QualityCheckModule,
    AuthModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
