import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto,UpdateAuthDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) 
  private readonly userRepository: Repository<User>,
  private readonly organRepository: Repository<User>,
  private readonly jwtService: JwtService
  ) {}


  async create(createAuthDto: CreateAuthDto) {
    try{
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createAuthDto.password, salt);
      const organs = []

      if(createAuthDto.organs.length > 0){
        createAuthDto.organs.forEach(async organId => {
          const organ = await this.organRepository.findOneBy({id: organId})
          if(!organ){
            throw new BadRequestException('Organ not found')
          } else{
            organs.push(organ)
          }
        });
      }

      const newUser = this.userRepository.create({
        ...createAuthDto,
        password: hashedPassword,
        organs: organs
      });
      return newUser;

    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.detail)
    }
  }

  async findAll() {
    try{
      const users = await this.userRepository.find();
      if(!users){
        throw new BadRequestException('No user found')
      }
      return users;
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.detail)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
