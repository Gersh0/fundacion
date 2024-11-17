import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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

  //bloodtype
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'O+', description: 'The blood type of the organ' })
  bloodType: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 2,
    description: 'The ID of the client',
    required: false,
  })
  clientId: number;
}
