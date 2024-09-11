import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQualityCheckDto } from './dto/create-quality-check.dto';
import { UpdateQualityCheckDto } from './dto/update-quality-check.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QualityCheck } from './entities/quality-check.entity';
import { Repository } from 'typeorm';
import { Organ } from 'src/organ/entities/organ.entity';

@Injectable()
export class QualityCheckService {

  constructor(
    @InjectRepository(QualityCheck)
    private readonly qualityCheckRepository: Repository<QualityCheck>,
    @InjectRepository(Organ)
    private readonly organRepository: Repository<Organ>
  ) {}

  async create(createQualityCheckDto: CreateQualityCheckDto) {
    try{
      const organId = createQualityCheckDto.organId;
      const organ = await this.organRepository.findOne({where: {id: organId}});
      if(!organ){
        throw new BadRequestException('Organ not found')
      }
      let notes = null;
      if (createQualityCheckDto.notes) {
        notes = createQualityCheckDto.notes;
      }
      const qualityCheck = this.qualityCheckRepository.create({
        organ: organ,
        notes: notes,
        ...createQualityCheckDto
      });
      return await this.qualityCheckRepository.save(qualityCheck);
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.detail)
    }
  }

  async findAll() {
    try{
      const qualityChecks = await this.qualityCheckRepository.find({});
      if(!qualityChecks){
        throw new BadRequestException('No qualityCheck found')
      }
      return qualityChecks;
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.detail)
    }
  }

  async findOne(id: number) {
    try{
      const qualityCheck = await this.qualityCheckRepository.findOneBy({id : id});
      if(!qualityCheck){
        throw new BadRequestException('No qualityCheck found')
      }
      return qualityCheck;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }

  async update(id: number, updateQualityCheckDto: UpdateQualityCheckDto) {
    try{
      const qualityCheck = await this.qualityCheckRepository.preload({
        id : id,
        ...updateQualityCheckDto
      });
      if(!qualityCheck){
        throw new BadRequestException('No qualityCheck found')
      }
      await this.qualityCheckRepository.save(qualityCheck);
      return qualityCheck;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }

  async remove(id: number) {
    try{
      const qualityCheck = await this.qualityCheckRepository.findOneBy({id : id});
      if(!qualityCheck){
        throw new BadRequestException('No qualityCheck found')
      }
      await this.qualityCheckRepository.remove(qualityCheck);
      return qualityCheck;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }

  async findOrgan(id: number) {
    try{
      const qualityCheck = await this.qualityCheckRepository.findOneBy({id : id});
      if(!qualityCheck){
        throw new BadRequestException('No qualityCheck found')
      }
      return qualityCheck.organ;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }
}
