import { Injectable } from '@nestjs/common';
import { CreateOrganDto } from './dto/create-organ.dto';
import { UpdateOrganDto } from './dto/update-organ.dto';

@Injectable()
export class OrganService {
  create(createOrganDto: CreateOrganDto) {
    return 'This action adds a new organ';
  }

  findAll() {
    return `This action returns all organ`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organ`;
  }

  update(id: number, updateOrganDto: UpdateOrganDto) {
    return `This action updates a #${id} organ`;
  }

  remove(id: number) {
    return `This action removes a #${id} organ`;
  }
}
