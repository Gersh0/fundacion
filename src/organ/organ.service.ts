import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganDto, UpdateOrganDto } from './dto';
import { Users } from '../auth/entities/auth.entity';
import { Organs } from './entities/organ.entity';

// Marking the class as injectable so it can be injected into other classes
@Injectable()
export class OrganService {
  // Constructor to inject dependencies
  constructor(
    @InjectRepository(Organs)
    private readonly organRepository: Repository<Organs>, // Injecting the Organ repository
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>, // Injecting the User repository
  ) { }

  // Method to create a new organ
  async create(createOrganDto: CreateOrganDto) {
    try {
      // Extract providerId and clientId from DTO
      const providerId = createOrganDto.providerId;
      const clientId = createOrganDto.clientId;

      // Find the provider by ID and role
      const provider = await this.userRepository.findOne({
        where: { id: providerId, roles: 'provider' },
      });
      if (!provider) {
        throw new BadRequestException('Provider not found'); // Throw an exception if no provider is found
      }

      let client = null;
      if (clientId) {
        // Find the client by ID and role if clientId is provided
        client = await this.userRepository.findOne({
          where: { id: clientId, roles: 'client' },
        });
        if (!client) {
          throw new BadRequestException('Client not found'); // Throw an exception if no client is found
        }
      }

      // Create a new organ entity
      const organ = this.organRepository.create({
        ...createOrganDto,
        availability: true, // Set availability to true
        provider: provider,
        client: client,
      });

      // Save the organ entity to the database
      return await this.organRepository.save(organ);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail); // Throw an exception if any error occurs
    }
  }

  // Method to find all organs
  async findAll() {
    try {
      // Find all organs in the repository
      const organs: Organs[] = await this.organRepository.find({ relations: ['provider', 'qualityChecks'] });
      if (!organs) {
        throw new BadRequestException('No organ found'); // Throw an exception if no organs are found
      }
      // For each organ, let only the provider ID in the provider field
      const organResponse = organs.map((organ) => {
        return {
          id: organ.id,
          type: organ.type,
          availability: organ.availability,
          bloodtype: organ.bloodType,
          provider: organ.provider.id,
          qualityChecks: organ.qualityChecks,
        };
      });

      return organResponse;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail); // Throw an exception if any error occurs
    }
  }

  // Method to find an organ by ID
  async findOne(id: number) {
    try {
      // Find the organ by ID
      const organ = await this.organRepository.findOneBy({ id: id });
      if (!organ) {
        throw new BadRequestException('No organ found'); // Throw an exception if no organ is found
      }
      return organ;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail); // Throw an exception if any error occurs
    }
  }

  // Method to update an organ by ID
  async update(id: number, updateOrganDto: UpdateOrganDto) {
    try {
      // Find the organ by ID
      const organ = await this.organRepository.findOneBy({ id });
      if (!organ || !organ.availability) {
        throw new BadRequestException('No organ found'); // Throw an exception if no organ is found or organ is not available
      }

      // Update only the fields that are present in the DTO
      Object.keys(updateOrganDto).forEach((key) => {
        if (updateOrganDto[key] !== undefined) {
          organ[key] = updateOrganDto[key];
        }
      });

      // Save the updated organ to the database
      await this.organRepository.save(organ);
      return organ;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        error.detail || 'An error occurred while updating the organ',
      ); // Throw an exception if any error occurs
    }
  }

  // Method to remove (mark as unavailable) an organ by ID
  async remove(id: number) {
    try {
      // Find the organ by ID
      const organ = await this.organRepository.findOneBy({ id });
      if (!organ) {
        throw new BadRequestException('No organ found'); // Throw an exception if no organ is found
      }

      // Mark the organ as unavailable
      organ.availability = false;

      // Save the updated organ to the database
      await this.organRepository.save(organ);
      return organ;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        error.detail ||
        'An error occurred while marking the organ as unavailable',
      ); // Throw an exception if any error occurs
    }
  }

  // Method to get quality checks of an organ by ID
  async getQualityChecks(id: number) {
    try {
      // Find the organ by ID
      const organ = await this.organRepository.findOneBy({ id: id });
      if (!organ) {
        throw new BadRequestException('No organ found'); // Throw an exception if no organ is found
      }
      return organ.qualityChecks;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail); // Throw an exception if any error occurs
    }
  }
}
