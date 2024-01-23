import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { OrderDto } from './dto/order.dto';
import { CartProductDto } from './dto/cart-products.dto';
import { ProductsRepository } from '../products/products.repository';
import { OrderAdditionsDto } from './dto/order-additions.dto';
import { OrderProductDto } from './dto/order-products.dto';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly orderRepository: PaymentRepository
  ) { }

  checkPayment(name: string, code: string, paymentMethod: string) {
    if (name.trim().length === 0 || code === "") new BadRequestException("Name or code not provided");
    if (paymentMethod.length === 0) new HttpException("Payment required", HttpStatus.PAYMENT_REQUIRED,)
    return;
  }

  filteringById<T>(array: T[], property: keyof T): T[] {
    const uniqueId = new Set();
    return array.filter(item => {
      const value = item[property];
      if (!uniqueId.has(value)) {
        uniqueId.add(value);
        return true;
      }
      return false;
    });
  }
  async checkCartProducts(cartProducts: CartProductDto[]) {
    let amount: number = 0;
    let prod: OrderProductDto[] = [];
    let add: OrderAdditionsDto[] = [];
    cartProducts.map(async item => {
      const { product, additional } = item;
      prod.push(product);
      add = [...add, ...additional];
    })
    prod.map(item => amount += item.price);
    add.map(item => amount += item.price);
    prod = this.filteringById(prod, "id");
    add = this.filteringById(add, "id");
    await Promise.all(prod.map(async item => {
      const productFound = await this.productsRepository.getProductById(item.id);
      if (!productFound) throw new NotFoundException("Product not found");
    }));
    await Promise.all(add.map(async item => {
      const additionalFound = await this.productsRepository.getAdditionalById(item.id);
      if (!additionalFound) throw new NotFoundException("Additional not found");
    }))
    return amount;
  }

  async createOrder(orderDto: OrderDto) {
    const { name, code, paymentMethod, cartProducts } = orderDto;
    this.checkPayment(name, code, paymentMethod);
    const amount = await this.checkCartProducts(cartProducts);
    return await this.orderRepository.createOrder(orderDto, amount);
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
