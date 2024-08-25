import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
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

    @IsString()
    notes?: string;
}
