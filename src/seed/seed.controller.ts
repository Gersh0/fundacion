import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiOperation({ summary: 'Populate the database with seed data' })
  @ApiResponse({ status: 200, description: 'Database populated successfully.' })
  populateDB() {
    return this.seedService.populateDB();
  }
}