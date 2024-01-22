import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { OrderDto } from './dto/order.dto';
import { CartProductDto } from './dto/cart-products.dto';

@Injectable()
export class PaymentService {

  checkPayment(name: string, code: string, paymentMethod: string[]) {
    if (name.trim().length === 0 || code === "") new BadRequestException("Name or code not provided");
    if (paymentMethod.length === 0) new HttpException("Payment required", HttpStatus.PAYMENT_REQUIRED,)
    return;
  }

  checkCartProducts(cartProducts: CartProductDto[]) {
    cartProducts.map(item => {
      const { product, additional } = item;
    })
  }
  async createPayment(orderDto: OrderDto) {
    const { name, code, paymentMethod, cartProducts } = orderDto;
    this.checkPayment(name, code, paymentMethod);
    this.checkCartProducts(cartProducts);
    return await console.log(orderDto);
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
