import { ArrayMinSize, IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
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

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1, {message: "paymentMethot cannot be empty"})
    paymentMethod: string[];

    @IsString()
    @IsNotEmpty()
    code: string;
}