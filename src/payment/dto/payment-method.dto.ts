import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PaymentMethodDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => String)
    paymentMethod: string[];
}