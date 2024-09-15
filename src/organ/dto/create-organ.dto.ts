import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Kidney', description: 'The type of the organ' })
  type: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'The ID of the provider' })
  providerId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 2, description: 'The ID of the client', required: false })
  clientId: number;
}