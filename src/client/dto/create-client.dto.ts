import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsArray, IsNumber } from 'class-validator';

export class CreateClientDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber(null)
    phone: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsArray()
    @IsNumber({}, { each: true })
    organs: number[];
}