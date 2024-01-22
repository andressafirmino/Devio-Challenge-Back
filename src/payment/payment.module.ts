import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { ProductsRepository } from 'src/products/products.repository';

@Module({
  exports: [ProductsRepository],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository, ProductsRepository],
})
export class PaymentModule { }
