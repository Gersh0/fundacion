import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, Matches, IsPhoneNumber, IsOptional, IsArray, IsNumber, IsBoolean, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  email: string;

  @IsString()
  @MinLength(12)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  @ApiProperty({ example: 'StrongP@ssw0rd!', description: 'The password of the user' })
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber(null)
  @ApiProperty({ example: '+1234567890', description: 'The phone number of the user' })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123 Main St', description: 'The address of the user' })
  address: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ example: [1, 2], description: 'The IDs of the organs', required: false })
  organs: number[];

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @IsIn(['user', 'client', 'provider', 'admin'], { each: true })
  @ApiProperty({ example: ['user'], description: 'The roles of the user' })
  roles: string[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'Is the user active?', required: false })
  isActive: boolean;
}