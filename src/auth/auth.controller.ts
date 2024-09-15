import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateAuthDto, LoginDto, UpdateAuthDto } from './dto';
import { Roles } from './decorators/roles.decorator';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@ApiTags('auth')
@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll() {
    return this.authService.findAll();
  }

  @Get('clients')
  @Roles('admin')
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'Return all clients.' })
  findAllClients() {
    return this.authService.findAllClients();
  }

  @Get('providers')
  @Roles('admin')
  @ApiOperation({ summary: 'Get all providers' })
  @ApiResponse({ status: 200, description: 'Return all providers.' })
  findAllProviders() {
    return this.authService.findAllProviders();
  }

  @Get('clients/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get a client by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Return the client.' })
  findOneClient(@Param('id') id: string) {
    return this.authService.findClientById(+id);
  }

  @Get('providers/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get a provider by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Return the provider.' })
  findOneProvider(@Param('id') id: string) {
    return this.authService.findProviderById(+id);
  }


  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateAuthDto })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}