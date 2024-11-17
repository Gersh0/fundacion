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
import { CreateAuthDto, LoginDto, UpdateAuthDto } from './dto';
import { Roles } from './decorators/roles.decorator';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

// Marking the controller with Swagger tags and setting the base route to 'auth'
@ApiTags('auth')
@Controller('auth')
@UseGuards(AuthGuard) // Applying the AuthGuard to all routes in this controller
export class AuthController {
  // Constructor to inject the AuthService
  constructor(private readonly authService: AuthService) {}

  // Route to create a new user
  @Post()
  @ApiOperation({ summary: 'Create a new user' }) // Swagger documentation for the operation
  @ApiBody({ type: CreateAuthDto }) // Swagger documentation for the request body
  @ApiResponse({ status: 201, description: 'User created successfully.' }) // Swagger documentation for the response
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('check/:id')
  check(@Param('id') id: string){
    const user = this.authService.findOne(id);
    if(user){
      return true;
    }else {
      return false;
    }
  }

  // Route to login a user
  @Post('login')
  @ApiOperation({ summary: 'Login a user' }) // Swagger documentation for the operation
  @ApiBody({ type: LoginDto }) // Swagger documentation for the request body
  @ApiResponse({ status: 200, description: 'User logged in successfully.' }) // Swagger documentation for the response
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Route to get all users
  @Get()
  @Roles('admin') // Applying the Roles decorator to restrict access to admins
  @ApiOperation({ summary: 'Get all users' }) // Swagger documentation for the operation
  @ApiResponse({ status: 200, description: 'Return all users.' }) // Swagger documentation for the response
  findAll() {
    return this.authService.findAll();
  }

  // Route to get all clients
  @Get('clients')
  @Roles('admin') // Applying the Roles decorator to restrict access to admins
  @ApiOperation({ summary: 'Get all clients' }) // Swagger documentation for the operation
  @ApiResponse({ status: 200, description: 'Return all clients.' }) // Swagger documentation for the response
  findAllClients() {
    return this.authService.findAllClients();
  }

  // Route to get all providers
  @Get('providers')
  @Roles('admin') // Applying the Roles decorator to restrict access to admins
  @ApiOperation({ summary: 'Get all providers' }) // Swagger documentation for the operation
  @ApiResponse({ status: 200, description: 'Return all providers.' }) // Swagger documentation for the response
  findAllProviders() {
    return this.authService.findAllProviders();
  }

  // Route to get a client by ID
  @Get('clients/:id')
  @Roles('admin') // Applying the Roles decorator to restrict access to admins
  @ApiOperation({ summary: 'Get a client by ID' }) // Swagger documentation for the operation
  @ApiParam({ name: 'id', type: String }) // Swagger documentation for the path parameter
  @ApiResponse({ status: 200, description: 'Return the client.' }) // Swagger documentation for the response
  findOneClient(@Param('id') id: string) {
    return this.authService.findClientById(id);
  }

  // Route to get a provider by ID
  @Get('providers/:id')
  @Roles('admin') // Applying the Roles decorator to restrict access to admins
  @ApiOperation({ summary: 'Get a provider by ID' }) // Swagger documentation for the operation
  @ApiParam({ name: 'id', type: String }) // Swagger documentation for the path parameter
  @ApiResponse({ status: 200, description: 'Return the provider.' }) // Swagger documentation for the response
  findOneProvider(@Param('id') id: string) {
    return this.authService.findProviderById(+id);
  }

  @Get('providers/:id/organs')
  @Roles('admin', 'client', 'provider') // Applying the Roles decorator to restrict access to admins
  @ApiOperation({ summary: 'Get all organs of a provider by ID' }) // Swagger documentation for the operation
  @ApiParam({ name: 'id', type: String }) // Swagger documentation for the path parameter
  @ApiResponse({ status: 200, description: 'Return all organs of the provider.' }) // Swagger documentation for the response
  findProviderOrgans(@Param('id') id: string) {
    return this.authService.getOrgansByProviderID(+id);
  }

  // Route to get a user by ID
  @Get(':id')
  @Roles('admin') // Applying the Roles decorator to restrict access to admins
  @ApiOperation({ summary: 'Get a user by ID' }) // Swagger documentation for the operation
  @ApiParam({ name: 'id', type: String }) // Swagger documentation for the path parameter
  @ApiResponse({ status: 200, description: 'Return the user.' }) // Swagger documentation for the response
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  // Route to update a user by ID
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' }) // Swagger documentation for the operation
  @ApiParam({ name: 'id', type: String }) // Swagger documentation for the path parameter
  @ApiBody({ type: UpdateAuthDto }) // Swagger documentation for the request body
  @ApiResponse({ status: 200, description: 'User updated successfully.' }) // Swagger documentation for the response
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  // Route to delete a user by ID
  @Delete(':id')
  @Roles('admin') // Applying the Roles decorator to restrict access to admins
  @ApiOperation({ summary: 'Delete a user by ID' }) // Swagger documentation for the operation
  @ApiParam({ name: 'id', type: String }) // Swagger documentation for the path parameter
  @ApiResponse({ status: 200, description: 'User deleted successfully.' }) // Swagger documentation for the response
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
