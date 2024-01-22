import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { OrderDto } from './dto/order.dto';
import { CartProductDto } from './dto/cart-products.dto';
import { ProductsRepository } from '../products/products.repository';
import { response } from 'express';

@Injectable()
export class PaymentService {
  constructor(private readonly productsRepository: ProductsRepository) { }

  checkPayment(name: string, code: string, paymentMethod: string[]) {
    if (name.trim().length === 0 || code === "") new BadRequestException("Name or code not provided");
    if (paymentMethod.length === 0) new HttpException("Payment required", HttpStatus.PAYMENT_REQUIRED,)
    return;
  }

  async checkCartProducts(cartProducts: CartProductDto[]) {
    let erro = 0;
    await Promise.all(cartProducts.map(async (item) => {
      const { product, additional } = item;
      const productFound = await this.productsRepository.getProductById(product.id);
      console.log(productFound)
      if (!productFound) erro++;
    }))    
    return erro;
  }
  async createPayment(orderDto: OrderDto) {
    const { name, code, paymentMethod, cartProducts } = orderDto;
    this.checkPayment(name, code, paymentMethod);
    const erro = await this.checkCartProducts(cartProducts);
    if (erro > 0) throw new NotFoundException("Product not found");
    return;
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
