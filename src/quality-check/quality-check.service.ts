import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQualityCheckDto, UpdateQualityCheckDto } from './dto';
import { QualityCheck } from './entities/quality-check.entity';
import { Organ } from 'src/organ/entities/organ.entity';

// Marking the class as injectable so it can be injected into other classes
@Injectable()
export class QualityCheckService {
  // Constructor to inject dependencies
  constructor(
    @InjectRepository(QualityCheck)
    private readonly qualityCheckRepository: Repository<QualityCheck>, // Injecting the QualityCheck repository
    @InjectRepository(Organ)
    private readonly organRepository: Repository<Organ>, // Injecting the Organ repository
  ) {}

  // Method to create a new quality check
  async create(createQualityCheckDto: CreateQualityCheckDto) {
    try {
      // Extract organId from DTO
      const organId = createQualityCheckDto.organId;
      // Find the organ by ID
      const organ = await this.organRepository.findOne({
        where: { id: organId },
      });
      if (!organ) {
        throw new BadRequestException('Organ not found'); // Throw an exception if no organ is found
      }
      let notes = null;
      if (createQualityCheckDto.notes) {
        notes = createQualityCheckDto.notes; // Assign notes if provided
      }
      // Create a new quality check entity
      const qualityCheck = this.qualityCheckRepository.create({
        organ: organ,
        notes: notes,
        ...createQualityCheckDto,
      });
      // Save the quality check entity to the database
      return await this.qualityCheckRepository.save(qualityCheck);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail); // Throw an exception if any error occurs
    }
  }

  // Method to find all quality checks
  async findAll() {
    try {
      // Find all quality checks in the repository
      const qualityChecks = await this.qualityCheckRepository.find({});
      if (!qualityChecks) {
        throw new BadRequestException('No qualityCheck found'); // Throw an exception if no quality checks are found
      }
      return qualityChecks;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail); // Throw an exception if any error occurs
    }
  }

  // Method to find a quality check by ID
  async findOne(id: number) {
    try {
      // Find the quality check by ID
      const qualityCheck = await this.qualityCheckRepository.findOneBy({
        id: id,
      });
      if (!qualityCheck) {
        throw new BadRequestException('No qualityCheck found'); // Throw an exception if no quality check is found
      }
      return qualityCheck;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail); // Throw an exception if any error occurs
    }
  }

  // Method to update a quality check by ID
  async update(id: number, updateQualityCheckDto: UpdateQualityCheckDto) {
    try {
      // Preload the quality check entity with the updated data
      const qualityCheck = await this.qualityCheckRepository.preload({
        id: id,
        ...updateQualityCheckDto,
      });
      if (!qualityCheck) {
        throw new BadRequestException('No qualityCheck found'); // Throw an exception if no quality check is found
      }
      // Save the updated quality check to the database
      await this.qualityCheckRepository.save(qualityCheck);
      return qualityCheck;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail); // Throw an exception if any error occurs
    }
  }

  // Method to remove a quality check by ID
  async remove(id: number) {
    try {
      // Find the quality check by ID
      const qualityCheck = await this.qualityCheckRepository.findOneBy({
        id: id,
      });
      if (!qualityCheck) {
        throw new BadRequestException('No qualityCheck found'); // Throw an exception if no quality check is found
      }
      // Remove the quality check from the database
      await this.qualityCheckRepository.remove(qualityCheck);
      return qualityCheck;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail); // Throw an exception if any error occurs
    }
  }

  // Method to find the organ associated with a quality check by ID
  async findOrgan(id: number) {
    try {
      // Find the quality check by ID
      const qualityCheck = await this.qualityCheckRepository.findOneBy({
        id: id,
      });
      if (!qualityCheck) {
        throw new BadRequestException('No qualityCheck found'); // Throw an exception if no quality check is found
      }
      return qualityCheck.organ; // Return the associated organ
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail); // Throw an exception if any error occurs
    }
  }
}
