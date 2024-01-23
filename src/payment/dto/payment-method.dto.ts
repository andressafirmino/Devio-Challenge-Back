import { IsArray, IsNotEmpty } from 'class-validator';

export class PaymentMethodDto {
    @IsArray()
    @IsNotEmpty()
    paymentMethod: string;
}