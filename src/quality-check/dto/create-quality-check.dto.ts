import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';
export class CreateQualityCheckDto {
    @IsNotEmpty()
    @IsNumber()
    organId: number;
    
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    dateChecked: Date;

    @IsNotEmpty()
    @IsBoolean()
    result: boolean;

    @IsOptional()
    @IsString()
    notes?: string;
}
