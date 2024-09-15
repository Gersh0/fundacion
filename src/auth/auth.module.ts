import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { Organ } from '../organ/entities/organ.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { User } from './entities/auth.entity';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [TypeOrmModule.forFeature([User, Organ]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
    imports: [],
    inject: [],
    useFactory: async () => {
      return {
        secret: process.env.SECRET_KEY,
        signOptions: { expiresIn: '15m' }
      }
    }
  }
  )],
  exports: [PassportModule, JwtModule, JwtStrategy, TypeOrmModule]
})
export class AuthModule { }
