import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto, LoginDto, UpdateAuthDto } from './dto';
import { User } from './entities/auth.entity';
import { Organ } from '../organ/entities/organ.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Organ)
    private readonly organRepository: Repository<Organ>,

    private readonly jwtService: JwtService
  ) { }


  async create(createAuthDto: CreateAuthDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createAuthDto.password, salt);
      const organs = []

      if (createAuthDto.organs.length > 0) {
        createAuthDto.organs.forEach(async organId => {
          const organ = await this.organRepository.findOneBy({ id: organId })
          if (!organ) {
            throw new BadRequestException('Organ not found')
          } else {
            organs.push(organ)
          }
        });
      }

      const newUser = await this.userRepository.create({
        ...createAuthDto,
        password: hashedPassword,
        organs: organs
      });

      await this.userRepository.save(newUser);
      return newUser;

    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.detail)
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();
      if (!users) {
        throw new BadRequestException('No user found')
      }
      return users;
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.detail)
    }
  }

  async findOne(id: number) {
    try{
      const user = await this.userRepository.findOneBy({id : id});
      if(!user){
        throw new BadRequestException('No user found')
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    try{
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updateAuthDto.password, salt);
      const organs = []

      if(updateAuthDto.organs.length > 0){
        updateAuthDto.organs.forEach(async organId => {
          const organ = await this.organRepository.findOneBy({id: organId})
          if(!organ){
            throw new BadRequestException('Organ not found')
          } else{
            organs.push(organ)
          }
        });
      }
      const newUser = await this.userRepository.preload({
        id: id,
        password: hashedPassword,
        organs: organs,
        ...updateAuthDto
      });
      await this.userRepository.save(newUser);
      return newUser;

    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }

  async remove(id: number) {
    try{
      const user = await this.userRepository.findOneBy({id : id});
      if(!user){
        throw new BadRequestException('No user found')
      }
      await this.userRepository.preload({
        id: id,
        isActive: false
      });
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { token: this.jwtService.sign({ email: user.email }) };
  }

  async findAllClients() {
    try {
      const users = await this.userRepository.find({ where: { roles: 'client' } });
      if (!users) {
        throw new BadRequestException('No user found')
      }
      return users;
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.detail)
    }
  }


  async findAllProviders() {
    try {
      const users = await this.userRepository.find({ where: { roles: 'provider' } });
      if (!users) {
        throw new BadRequestException('No user found')
      }
      return users;
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.detail)
    }
  } 

  async findProviderById(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id, roles: 'provider' } });
      if (!user) {
        throw new BadRequestException('No user found')
      }
      return user;
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.detail)
    }
  }

  async findClientById(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id, roles: 'client' } });
      if (!user) {
        throw new BadRequestException('No user found')
      }
      return user;
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.detail)
    }
  }


}
