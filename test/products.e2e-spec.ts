import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { SeedFactory } from './factories/seed.factory';

describe('ProductsController (e2e) tests', () => {
    let app: INestApplication;
    const prisma: PrismaService = new PrismaService();

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(PrismaService)
            .useValue(prisma)
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());

        await app.init();
        await prisma.product.deleteMany({});
        await prisma.categories.deleteMany({});
        await prisma.sideDishe.deleteMany({});
    });

    afterAll(async () => {
        prisma.$disconnect();
    });

    describe('GET/products', () => {
        it('should respond whith status 200 and get all products', async () => {
            await new SeedFactory(prisma).createProducts();

            const { body } = await request(app.getHttpServer()).get('/').expect(HttpStatus.OK);

            expect(body.products).toHaveLength(5);
            expect(body.products).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        price: expect.any(Number),
                        description: expect.any(String),
                        image: expect.any(String),
                        category: expect.any(String),
                    }),
                ])
            );
        });
        it('should respond whith status 200 and get all categories', async () => {
            await new SeedFactory(prisma).createCategories();

            const { body } = await request(app.getHttpServer()).get('/').expect(HttpStatus.OK);

            expect(body.categories).toHaveLength(5);
            expect(body.categories).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        image: expect.any(String),
                        category: expect.any(String),
                    }),
                ])
            );
        });
        it('should respond whith status 200 and get all sideDishes', async () => {
            await new SeedFactory(prisma).createSideDish();

            const { body } = await request(app.getHttpServer()).get('/').expect(HttpStatus.OK);

            expect(body.sideDish).toHaveLength(3);
            expect(body.sideDish).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        price: expect.any(Number),
                        description: expect.any(String),
                        image: expect.any(String),
                    }),
                ])
            )
        });
    });
});
