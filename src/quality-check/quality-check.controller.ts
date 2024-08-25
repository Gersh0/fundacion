import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QualityCheckService } from './quality-check.service';
import { CreateQualityCheckDto } from './dto/create-quality-check.dto';
import { UpdateQualityCheckDto } from './dto/update-quality-check.dto';

@Controller('quality-check')
export class QualityCheckController {
  constructor(private readonly qualityCheckService: QualityCheckService) {}

  @Post()
  create(@Body() createQualityCheckDto: CreateQualityCheckDto) {
    return this.qualityCheckService.create(createQualityCheckDto);
  }

  @Get()
  findAll() {
    return this.qualityCheckService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qualityCheckService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQualityCheckDto: UpdateQualityCheckDto) {
    return this.qualityCheckService.update(+id, updateQualityCheckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qualityCheckService.remove(+id);
  }
}
