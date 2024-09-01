import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Organ } from '../organ/entities/organ.entity';
import { User } from './entities/auth.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

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
        signOptions: { expiresIn: '1h' }
      }
    }
  }
  )],
  exports: [PassportModule, JwtModule, JwtStrategy, TypeOrmModule]
})
export class AuthModule { }
