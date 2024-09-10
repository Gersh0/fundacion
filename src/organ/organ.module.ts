import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganService } from './organ.service';
import { OrganController } from './organ.controller';
import { Organ } from './entities/organ.entity';
import { QualityCheck } from 'src/quality-check/entities/quality-check.entity';
import { User } from 'src/auth/entities/auth.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OrganController],
  providers: [OrganService],
  imports: [TypeOrmModule.forFeature([Organ, QualityCheck, User]), AuthModule],
})
export class OrganModule {}
