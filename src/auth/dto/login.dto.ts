import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  @ApiProperty({ example: 'StrongP@ssw0rd!', description: 'The password of the user' })
  password: string;
}