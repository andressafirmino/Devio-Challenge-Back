import { IsNumber, IsString } from 'class-validator';

export class OrderAdditionsDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;
}
