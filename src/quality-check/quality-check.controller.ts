import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateQualityCheckDto, UpdateQualityCheckDto } from './dto';
import { QualityCheckService } from './quality-check.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';

// Marking the controller with Swagger tags and setting the base route to 'quality-check'
@ApiTags('quality-check')
@Controller('quality-check')
@UseGuards(AuthGuard) // Applying the AuthGuard to all routes in this controller
export class QualityCheckController {
  // Constructor to inject the QualityCheckService
  constructor(private readonly qualityCheckService: QualityCheckService) {}

  // Route to create a new quality check
  @Post()
  @Roles('admin', 'provider') // Applying the Roles decorator to restrict access to admins and providers
  @ApiOperation({ summary: 'Create a new quality check' }) // Swagger documentation for the operation
  @ApiBody({ type: CreateQualityCheckDto }) // Swagger documentation for the request body
  @ApiResponse({ status: 201, description: 'Quality check created successfully.' }) // Swagger documentation for the response
  create(@Body() createQualityCheckDto: CreateQualityCheckDto) {
    return this.qualityCheckService.create(createQualityCheckDto);
  }

  // Route to get all quality checks
  @Get()
  @Roles('admin', 'provider') // Applying the Roles decorator to restrict access to admins and providers
  @ApiOperation({ summary: 'Get all quality checks' }) // Swagger documentation for the operation
  @ApiResponse({ status: 200, description: 'Return all quality checks.' }) // Swagger documentation for the response
  findAll() {
    return this.qualityCheckService.findAll();
  }

  // Route to get a quality check by ID
  @Get(':id')
  @Roles('admin', 'provider') // Applying the Roles decorator to restrict access to admins and providers
  @ApiOperation({ summary: 'Get a quality check by ID' }) // Swagger documentation for the operation
  @ApiParam({ name: 'id', type: String }) // Swagger documentation for the path parameter
  @ApiResponse({ status: 200, description: 'Return the quality check.' }) // Swagger documentation for the response
  findOne(@Param('id') id: string) {
    return this.qualityCheckService.findOne(+id);
  }

  // Route to update a quality check by ID
  @Patch(':id')
  @Roles('admin', 'provider') // Applying the Roles decorator to restrict access to admins and providers
  @ApiOperation({ summary: 'Update a quality check by ID' }) // Swagger documentation for the operation
  @ApiParam({ name: 'id', type: String }) // Swagger documentation for the path parameter
  @ApiBody({ type: UpdateQualityCheckDto }) // Swagger documentation for the request body
  @ApiResponse({ status: 200, description: 'Quality check updated successfully.' }) // Swagger documentation for the response
  update(@Param('id') id: string, @Body() updateQualityCheckDto: UpdateQualityCheckDto) {
    return this.qualityCheckService.update(+id, updateQualityCheckDto);
  }

  // Route to delete a quality check by ID
  @Delete(':id')
  @Roles('admin', 'provider') // Applying the Roles decorator to restrict access to admins and providers
  @ApiOperation({ summary: 'Delete a quality check by ID' }) // Swagger documentation for the operation
  @ApiParam({ name: 'id', type: String }) // Swagger documentation for the path parameter
  @ApiResponse({ status: 200, description: 'Quality check deleted successfully.' }) // Swagger documentation for the response
  remove(@Param('id') id: string) {
    return this.qualityCheckService.remove(+id);
  }
}