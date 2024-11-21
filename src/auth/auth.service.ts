import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto, LoginDto, UpdateAuthDto } from './dto';
import { Organs } from '../organ/entities/organ.entity';
import { Users } from './entities/auth.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    @InjectRepository(Organs)
    private readonly organRepository: Repository<Organs>,

    private readonly jwtService: JwtService,
  ) { }

  async checkToken(token: string) {
    try {
      if (this.isEmail(token)) {
        const response = await this.userRepository.findOne({ where: { email: token } });
        console.log(response);
        return (response.email === token) ? true : false;
      } else {
        const validToken = await this.jwtService.verify(token, {
          secret: process.env.SECRET_KEY,
        });
        return validToken ? true : false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Method to create a new user
  async create(createAuthDto: CreateAuthDto) {
    try {
      // Generate salt and hash the password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createAuthDto.password, salt);
      const organs: Organs[] = [];

      // Check if organs are provided and fetch them from the repository
      if (createAuthDto.organs && createAuthDto.organs.length > 0) {
        createAuthDto.organs.forEach(async (organId) => {
          const organ = await this.organRepository.findOneBy({ id: organId });
          if (organ) {
            organs.push(organ);
          }
        });
      }

      // Create a new user with the provided data and hashed password
      const newUser = await this.userRepository.create({
        ...createAuthDto,
        isActive: true,
        password: hashedPassword,
        organs: organs,
      });

      // Save the new user to the database
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }

  // Method to find all users
  async findAll() {
    try {
      const users = await this.userRepository.find();
      if (!users) {
        throw new BadRequestException('No user found');
      }
      return users;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }

  // Method to find a user by ID
  async findOne(id: string) {
    let query;
    try {
      if (!isNaN(+id)) {
        query = { id: +id };
      } else if (this.isEmail(id)) {
        query = { email: id };
      } else {
        throw new BadRequestException('Invalid ID or email format');
      }
      const user = await this.userRepository.findOne({ where: query });
      if (!user || user.isActive === false) {
        throw new BadRequestException('No user found');
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }

  // Method to update a user
  async update(id: number, updateAuthDto: UpdateAuthDto) {
    try {
      // Find the user by ID
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new BadRequestException('User not found');
      }

      // Prevent deactivating a user through this method
      if (user.isActive === false) {
        throw new BadRequestException(
          'Cannot deactivate a user, use the DELETE method instead',
        );
      }

      // Encrypt password if it exists in the DTO
      if (updateAuthDto.password) {
        const salt = await bcrypt.genSalt();
        updateAuthDto.password = await bcrypt.hash(
          updateAuthDto.password,
          salt,
        );
      }

      // Handle organs if they exist in the DTO
      if (updateAuthDto.organs && updateAuthDto.organs.length > 0) {
        const organs = await Promise.all(
          updateAuthDto.organs.map(async (organId) => {
            const organ = await this.organRepository.findOneBy({ id: organId });
            if (!organ) {
              throw new BadRequestException(
                `Organ with ID ${organId} not found`,
              );
            }
            return organ;
          }),
        );
        //add the organs to the user
        user.organs = organs;
      }

      // Update only the fields that are present in the DTO
      Object.keys(updateAuthDto).forEach((key) => {
        if (updateAuthDto[key] !== undefined && key !== 'organs') {
          user[key] = updateAuthDto[key];
        }
      });

      // Save the updated user to the database
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        error.detail || 'An error occurred while updating the user',
      );
    }
  }

  // Method to deactivate a user
  async remove(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new BadRequestException('No user found');
      }

      // Mark the user as not active
      user.isActive = false;

      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        error.detail || 'An error occurred while deactivating the user',
      );
    }
  }

  // Method to login a user
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { token: this.jwtService.sign({ email: user.email }) };
  }

  // Method to find all clients
  async findAllClients() {
    try {
      const users = (
        await this.userRepository.find({
          where: { roles: 'client' },
        })
      ).filter((user) => user.isActive === true);

      if (!users) {
        throw new BadRequestException('No user found');
      }
      return users;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }

  // Method to find all providers
  async findAllProviders() {
    try {
      const providers: Users[] = await this.userRepository.find({
        relations: ['organs'],
        where: { roles: 'provider', isActive: true },
      });

      if (!providers || providers.length === 0) {
        throw new BadRequestException('No user found');
      }

      return providers;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail || 'An error occurred while fetching providers');
    }
  }

  // Method to find a provider by ID
  async findProviderById(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id, roles: 'provider' },
      });
      if (!user || user.isActive === false) {
        throw new BadRequestException('No user found');
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }

  //method to check if the istring is a valid email address
  isEmail(email: string) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  // Method to find a client by ID
  async findClientById(id: string) {
    let query;

    try {

      if (!isNaN(+id)) {
        query = { id: +id, roles: 'client' };
      } else if (this.isEmail(id)) {
        query = { email: id, roles: 'client' };
      } else {
        throw new BadRequestException('Invalid ID or email format');
      }

      const user = await this.userRepository.findOne({ where: query });
      if (!user || user.isActive === false) {
        throw new BadRequestException('No user found');
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail || 'An error occurred while fetching the client');
    }
  }

  async getOrgansByProviderID(id: number) {
    const organs = await this.organRepository.find({ relations: ['provider'], where: { provider: { id } } });
    const normalizedOrgans = organs.map((organ) => {
      return {
        id: organ.id,
        type: organ.type,
        availability: organ.availability,
        bloodType: organ.bloodType,
        qualityChecks: organ.qualityChecks,
      };
    });
    return normalizedOrgans;
  }
}
