import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrganDto {
    
    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsBoolean()
    availability: boolean;

    @IsNotEmpty()
    @IsNumber()
    providerId: number;

    @IsNumber()
    clientId: number;
}
