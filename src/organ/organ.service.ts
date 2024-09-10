import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrganDto } from './dto/create-organ.dto';
import { UpdateOrganDto } from './dto/update-organ.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organ } from './entities/organ.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganService {

  constructor(
    @InjectRepository(Organ)
    private readonly organRepository: Repository<Organ>,
  ) {}

  async create(createOrganDto: CreateOrganDto) {
    try{
      const organ = this.organRepository.create(createOrganDto);
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
    try{
      const organ = await this.organRepository.preload({
        id : id,
        ...updateOrganDto
      });
      if(!organ){
        throw new BadRequestException('No organ found')
      }
      await this.organRepository.save(organ);
      return organ;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }


  async remove(id: number) {
    try{
      const organ = await this.organRepository.findOneBy({id : id});
      if(!organ){
        throw new BadRequestException('No organ found')
      }
      await this.organRepository.remove(organ);
      return organ;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
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
