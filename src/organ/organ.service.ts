import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganDto, UpdateOrganDto } from './dto';
import { User } from '../auth/entities/auth.entity';
import { Organ } from './entities/organ.entity';

@Injectable()
export class OrganService {

  constructor(
    @InjectRepository(Organ)
    private readonly organRepository: Repository<Organ>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createOrganDto: CreateOrganDto) {
    try{
      
      const providerId = createOrganDto.providerId;
      const clientId = createOrganDto.clientId;

      const provider = await this.userRepository.findOne({where: {id: providerId, roles: 'provider'}});
      if(!provider){
        throw new BadRequestException('Provider not found')
      }
      
      let client = null;
      if(clientId){
        client = await this.userRepository.findOne({where: {id: clientId, roles: 'client'}});
        if(!client){
        throw new BadRequestException('Client not found')
        }
      }
      
      const organ = this.organRepository.create({
        ...createOrganDto,
        availability: true,
        provider: provider,
        client: client
      });

      return await this.organRepository.save(organ);

    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.detail)
    }
  }

  async findAll() {
    try{
      const organs = await this.organRepository.find();
      if(!organs){
        throw new BadRequestException('No organ found')
      }
      return organs;
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.detail)
    }
  }


  async findOne(id: number) {
    try{
      const organ = await this.organRepository.findOneBy({id : id});
      if(!organ){
        throw new BadRequestException('No organ found')
      }
      return organ;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }


  async update(id: number, updateOrganDto: UpdateOrganDto) {
    try {
      // Find the organ by ID
      const organ = await this.organRepository.findOneBy({ id });
      if (!organ || !organ.availability) {
        throw new BadRequestException('No organ found');
      }

      // Update only the fields that are present in the DTO
      Object.keys(updateOrganDto).forEach(key => {
        if (updateOrganDto[key] !== undefined) {
          organ[key] = updateOrganDto[key];
        }
      });

      // Save the updated organ to the database
      await this.organRepository.save(organ);
      return organ;

    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail || 'An error occurred while updating the organ');
    }
  }

  async remove(id: number) {
    try {
      // Find the organ by ID
      const organ = await this.organRepository.findOneBy({ id });
      if (!organ) {
        // Throw an exception if no organ is found
        throw new BadRequestException('No organ found');
      }

      // Mark the organ as unavailable
      organ.availability = false;

      // Save the updated organ to the database
      await this.organRepository.save(organ);
      return organ;
    } catch (error) {
      // Log the error and throw a BadRequestException with the error details
      console.log(error);
      throw new BadRequestException(error.detail || 'An error occurred while marking the organ as unavailable');
    }
  }

  async getQualityChecks(id: number) {
    try{
      const organ = await this.organRepository.findOneBy({id : id});
      if(!organ){
        throw new BadRequestException('No organ found')
      }
      return organ.qualityChecks;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }
}
