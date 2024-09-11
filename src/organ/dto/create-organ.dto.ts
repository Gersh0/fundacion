import { IsBoolean, isEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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

    @IsOptional()
    @IsNumber()
    clientId: number;
}
