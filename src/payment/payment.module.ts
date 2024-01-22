import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
})
export class PaymentModule { }
