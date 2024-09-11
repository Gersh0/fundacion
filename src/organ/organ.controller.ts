import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrganService } from './organ.service';
import { CreateOrganDto } from './dto/create-organ.dto';
import { UpdateOrganDto } from './dto/update-organ.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('organ')
@UseGuards(AuthGuard)
export class OrganController {
  constructor(
    private readonly organService: OrganService) {}

  @Post()
  create(@Body() createOrganDto: CreateOrganDto) {
    return this.organService.create(createOrganDto);
  }

  @Get()
  @Roles('admin', 'user', 'provider')
  findAll() {
    return this.organService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user', 'provider')
  findOne(@Param('id') id: string) {
    return this.organService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateOrganDto: UpdateOrganDto) {
    return this.organService.update(+id, updateOrganDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.organService.remove(+id);
  }
}
