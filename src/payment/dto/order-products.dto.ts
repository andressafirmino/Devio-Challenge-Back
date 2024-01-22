import { IsNumber, IsString } from 'class-validator';

export class OrderProductDto {
  @IsNumber()
  id: number;

  @IsString()
  image: string;

  @IsString()
  name: string;

  @IsString()
  observation: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}