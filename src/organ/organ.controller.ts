import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganService } from './organ.service';
import { CreateOrganDto } from './dto/create-organ.dto';
import { UpdateOrganDto } from './dto/update-organ.dto';

@Controller('organ')
export class OrganController {
  constructor(private readonly organService: OrganService) {}

  @Post()
  create(@Body() createOrganDto: CreateOrganDto) {
    return this.organService.create(createOrganDto);
  }

  @Get()
  findAll() {
    return this.organService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganDto: UpdateOrganDto) {
    return this.organService.update(+id, updateOrganDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organService.remove(+id);
  }
}
