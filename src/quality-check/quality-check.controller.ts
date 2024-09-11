import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QualityCheckService } from './quality-check.service';
import { CreateQualityCheckDto } from './dto/create-quality-check.dto';
import { UpdateQualityCheckDto } from './dto/update-quality-check.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('quality-check')
@UseGuards(AuthGuard)
export class QualityCheckController {
  constructor(private readonly qualityCheckService: QualityCheckService) {}

  @Post()
  @Roles('admin', 'provider')
  create(@Body() createQualityCheckDto: CreateQualityCheckDto) {
    return this.qualityCheckService.create(createQualityCheckDto);
  }

  @Get()
  @Roles('admin', 'provider')
  findAll() {
    return this.qualityCheckService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'provider')
  findOne(@Param('id') id: string) {
    return this.qualityCheckService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin', 'provider')
  update(@Param('id') id: string, @Body() updateQualityCheckDto: UpdateQualityCheckDto) {
    return this.qualityCheckService.update(+id, updateQualityCheckDto);
  }

  @Delete(':id')
  @Roles('admin', 'provider')
  remove(@Param('id') id: string) {
    return this.qualityCheckService.remove(+id);
  }
}
