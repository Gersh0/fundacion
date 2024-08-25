import { Injectable } from '@nestjs/common';
import { CreateQualityCheckDto } from './dto/create-quality-check.dto';
import { UpdateQualityCheckDto } from './dto/update-quality-check.dto';

@Injectable()
export class QualityCheckService {
  create(createQualityCheckDto: CreateQualityCheckDto) {
    return 'This action adds a new qualityCheck';
  }

  findAll() {
    return `This action returns all qualityCheck`;
  }

  findOne(id: number) {
    return `This action returns a #${id} qualityCheck`;
  }

  update(id: number, updateQualityCheckDto: UpdateQualityCheckDto) {
    return `This action updates a #${id} qualityCheck`;
  }

  remove(id: number) {
    return `This action removes a #${id} qualityCheck`;
  }
}
