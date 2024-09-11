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

      const newUser = this.userRepository.create({
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

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
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
}
