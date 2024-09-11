import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QualityCheckService } from './quality-check.service';
import { CreateQualityCheckDto } from './dto/create-quality-check.dto';
import { UpdateQualityCheckDto } from './dto/update-quality-check.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('quality-check')
@Controller('quality-check')
@UseGuards(AuthGuard)
export class QualityCheckController {
  constructor(private readonly qualityCheckService: QualityCheckService) {}

  @Post()
  @Roles('admin', 'provider')
  @ApiOperation({ summary: 'Create a new quality check' })
  @ApiBody({ type: CreateQualityCheckDto })
  @ApiResponse({ status: 201, description: 'Quality check created successfully.' })
  create(@Body() createQualityCheckDto: CreateQualityCheckDto) {
    return this.qualityCheckService.create(createQualityCheckDto);
  }

  @Get()
  @Roles('admin', 'provider')
  @ApiOperation({ summary: 'Get all quality checks' })
  @ApiResponse({ status: 200, description: 'Return all quality checks.' })
  findAll() {
    return this.qualityCheckService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'provider')
  @ApiOperation({ summary: 'Get a quality check by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Return the quality check.' })
  findOne(@Param('id') id: string) {
    return this.qualityCheckService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin', 'provider')
  @ApiOperation({ summary: 'Update a quality check by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateQualityCheckDto })
  @ApiResponse({ status: 200, description: 'Quality check updated successfully.' })
  update(@Param('id') id: string, @Body() updateQualityCheckDto: UpdateQualityCheckDto) {
    return this.qualityCheckService.update(+id, updateQualityCheckDto);
  }

  @Delete(':id')
  @Roles('admin', 'provider')
  @ApiOperation({ summary: 'Delete a quality check by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Quality check deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.qualityCheckService.remove(+id);
  }
}