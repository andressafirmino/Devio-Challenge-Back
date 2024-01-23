import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CartProductDto } from './cart-products.dto';

export class OrderDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CartProductDto)
    cartProducts: CartProductDto[];

    @IsString()
    @IsNotEmpty()
    paymentMethod: string;

    @IsString()
    @IsNotEmpty()
    code: string;
}