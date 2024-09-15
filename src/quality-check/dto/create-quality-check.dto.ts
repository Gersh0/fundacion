import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQualityCheckDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'The ID of the organ' })
  organId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'The date of the quality check' })
  dateChecked: Date;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'The result of the quality check' })
  result: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'All good', description: 'Additional notes', required: false })
  notes?: string;
}