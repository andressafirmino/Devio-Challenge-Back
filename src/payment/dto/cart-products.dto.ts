import { ArrayMinSize, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProductDto } from './order-products.dto';
import { OrderAdditionsDto } from './order-additions.dto';

export class CartProductDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderProductDto)
    @ArrayMinSize(1, { message: 'product cannot be empty'})
    product: OrderProductDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderAdditionsDto)
    additional: OrderAdditionsDto[];
}