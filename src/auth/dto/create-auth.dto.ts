import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsArray, IsNumber, MinLength, MaxLength, Matches } from 'class-validator';


export class CreateAuthDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(12)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'password too weak' })
    password: string;

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
