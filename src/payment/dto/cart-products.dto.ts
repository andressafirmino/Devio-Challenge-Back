import { ArrayMinSize, IsArray, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProductDto } from './order-products.dto';
import { OrderAdditionsDto } from './order-additions.dto';

export class CartProductDto {
    @IsObject()
    product: OrderProductDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderAdditionsDto)
    additional: OrderAdditionsDto[];
}