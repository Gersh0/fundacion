import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateOrganDto, UpdateOrganDto } from './dto';
import { OrganService } from './organ.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('organ')
@Controller('organ')
@UseGuards(AuthGuard)
export class OrganController {
  constructor(private readonly organService: OrganService) {}

  @Post()
  @Roles('admin', 'provider')
  @ApiOperation({ summary: 'Create a new organ' })
  @ApiBody({ type: CreateOrganDto })
  @ApiResponse({ status: 201, description: 'Organ created successfully.' })
  create(@Body() createOrganDto: CreateOrganDto) {
    return this.organService.create(createOrganDto);
  }

  @Get()
  @Roles('admin', 'client', 'provider')
  @ApiOperation({ summary: 'Get all organs' })
  @ApiResponse({ status: 200, description: 'Return all organs.' })
  findAll() {
    return this.organService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'client', 'provider')
  @ApiOperation({ summary: 'Get an organ by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Return the organ.' })
  findOne(@Param('id') id: string) {
    return this.organService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update an organ by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateOrganDto })
  @ApiResponse({ status: 200, description: 'Organ updated successfully.' })
  update(@Param('id') id: string, @Body() updateOrganDto: UpdateOrganDto) {
    return this.organService.update(+id, updateOrganDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete an organ by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Organ deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.organService.remove(+id);
  }

  @Get(':id/quality-checks')
  @Roles('admin', 'client', 'provider')
  @ApiOperation({ summary: 'Get quality checks of an organ by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Return the quality checks of the organ.',
  })
  getQualityChecks(@Param('id') id: string) {
    return this.organService.getQualityChecks(+id);
  }
}
