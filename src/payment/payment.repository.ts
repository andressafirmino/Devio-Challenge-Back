import { Injectable } from '@nestjs/common';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { OrderDto } from './dto/order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createOrder(orderDto: OrderDto, amount: number) {
    const response = await this.prisma.$transaction(async prisma => {
      const order = await this.prisma.order.create({
        data: {
          client: orderDto.name,
          amount,
          code: orderDto.code,
          payment: orderDto.paymentMethod,
          isFinished: false
        }
      })
      const products = await Promise.all(orderDto.cartProducts.map(async item => {
        const orderProduct = await this.prisma.orderedProduct.create({
          data: {
            orderId: order.id,
            productId: item.product.id,
            observation: item.product.observation
          }
        });
        const sideDishes = await Promise.all(item.additional.map(async item => {
          return await this.prisma.sideDishesOrder.create({
            data: {
              orderedProductId: orderProduct.id,
              sideDishesId: item.id,
              quantity: 1
            }
          })
        }))
      }))
      return order;
    })
    return response;
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
