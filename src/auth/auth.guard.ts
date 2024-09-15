import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';

// Marking the class as injectable so it can be injected into other classes
@Injectable()
export class AuthGuard implements CanActivate {
  // Constructor to inject dependencies
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Injecting the User repository
    private readonly jwtService: JwtService, // Injecting the JWT service
    private readonly reflector: Reflector, // Injecting the Reflector service
  ) { }

  // Method to determine if the request can proceed
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get roles metadata from the handler
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // If no roles are defined, allow access
    }

    // Extract the request object
    const request = context.switchToHttp().getRequest();
    // Extract the token from the request header
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found'); // Throw an exception if no token is found
    }

    try {
      // Verify the token and extract the payload
      const payload = this.jwtService.verify(token, { secret: process.env.SECRET_KEY });
      // Find the user by email from the payload
      const user = await this.userRepository.findOne({ where: { email: payload.email } });

      if (!user || !user.isActive) {
        throw new BadRequestException('No user found'); // Throw an exception if no user is found or user is not active
      }

      if (roles && roles.length > 0) {
        // Check if the user has the required roles
        const hasRole = () => user.roles.some((role) => roles.includes(role));

        if (!hasRole()) {
          throw new ForbiddenException('This user does not have the required role to access this resource'); // Throw an exception if the user does not have the required role
        }
      }

      // Assign the user to the request object
      request.user = user;
      return true; // Allow access
    } catch (error) {
      throw new UnauthorizedException('Unauthorized'); // Throw an exception if any error occurs
    }
  }

  // Helper method to extract the token from the request header
  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return null; // Return null if no authorization header is found
    }

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : null; // Return the token if the type is Bearer, otherwise return null
  }
}