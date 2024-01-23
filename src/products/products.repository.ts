import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) { }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async getAllProducts() {
    const [categories, products, sideDish] = await this.prisma.$transaction([
      this.prisma.categories.findMany(),
      this.prisma.product.findMany(),
      this.prisma.sideDishe.findMany(),
    ]);
    return { categories, products, sideDish };
  }

  async getProductById(id: number) {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async getAdditionalById(id: number) {
    return await this.prisma.sideDishe.findUnique({ where: { id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
