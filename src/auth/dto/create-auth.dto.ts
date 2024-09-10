import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsArray, IsNumber, MinLength, MaxLength, Matches, IsBoolean, IsIn } from 'class-validator';


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

    //El arreglo de órganos en el DTO debe tener un arreglo de numeros que corresponden a las id de los órganos que tiene. Pero en la entidad se deben enviar como objetos de tipo Organ

    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    @IsIn(['user', 'client', 'provider', 'admin'], { each: true })
    roles: string[];

    @IsBoolean()
    isActive: boolean;
}
