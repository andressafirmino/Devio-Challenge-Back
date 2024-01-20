import { PrismaService } from '../../src/prisma/prisma.service';

export class SeedFactory {
  constructor(private readonly prisma: PrismaService) { }

  async createCategories() {
    return await this.prisma.categories.createMany({
      data: [
        {
          name: "Combos",
          image: "https://lecard-cdn.nyc3.cdn.digitaloceanspaces.com/upload/8621b82c62952338afb2ca82bb3c9cf3.png",
          category: "COMBO"
        },
        {
          name: "Hambúrgueres",
          image: "https://static.vecteezy.com/system/resources/previews/022/598/800/non_2x/tasty-beef-burger-png.png",
          category: "SNACK"
        },
        {
          name: "Bebidas",
          image: "https://s3-sa-east-1.amazonaws.com/deliveryon-uploads/products/texaslanches/141_5870274644f2a.png",
          category: "DRINK"
        },
        {
          name: "Acompanhamentos",
          image: "https://static.vecteezy.com/system/resources/thumbnails/025/065/286/small/french-fries-with-ai-generated-free-png.png",
          category: "SIDE-DISH"
        },
        {
          name: "Sobremesas",
          image: "https://static.vecteezy.com/system/resources/previews/021/217/130/original/petit-gateau-dessert-png.png",
          category: "DESSERT"
        }
      ]
    })
  }

  async createProducts() {
    return await this.prisma.product.createMany({
      data: [
        {
          name: "X-burguer",
          price: 3400,
          description: "Hambúguer, pão, cebola, queijo, alface e tomate",
          image: "https://static.vecteezy.com/system/resources/previews/022/598/800/non_2x/tasty-beef-burger-png.png",
          category: "SNACK"
        },
        {
          name: "Coca-cola",
          price: 400,
          description: "350 ml",
          image: "https://w7.pngwing.com/pngs/922/962/png-transparent-coca-cola-fizzy-drinks-diet-coke-fanta-coca-cola-cola-cola-wars-aluminum-can.png",
          category: "DRINK"
        },
        {
          name: "Combo x-burguer",
          price: 4400,
          description: "1 x-buguer, 1 batata-frita pequena e um refrigerante de 350ml",
          image: "https://static.vecteezy.com/system/resources/previews/022/598/800/non_2x/tasty-beef-burger-png.png",
          category: "COMBO"
        },
        {
          name: "Pudim",
          price: 1000,
          description: "Pudim de doce de leite",
          image: "https://www.designi.com.br/images/preview/11205671.jpg",
          category: "DESSERT"
        },
        {
          name: "Batata-frita",
          price: 800,
          description: "Pequena",
          image: "https://img.freepik.com/psd-premium/batatas-fritas-isoladas-em-fundo-transparente-png-psd_888962-658.jpg",
          category: "SIDE-DISH"
        }
      ]
    });
  }

  async createSideDish() {
    return await this.prisma.sideDishe.createMany({
      data: [
        {
          name: "Bacon",
          price: 100,
          description: "10g",
          image: "https://i.pinimg.com/originals/99/52/01/995201e1c92ca9eced42364ed8a1892c.png"
        },
        {
          name: "Cheddar",
          price: 100,
          description: "10g",
          image: "https://static.wixstatic.com/media/11d2b8_14635bf4788d49ac8dece0aeec1957e6~mv2.png/v1/fit/w_500,h_500,q_90/file.png"
        },
        {
          name: "Molho",
          price: 100,
          description: "Barbecue",
          image: "https://i.pinimg.com/originals/4f/3e/e2/4f3ee2cb7508b3edee542b2218635fb1.png"
        },
      ]
    })
  }
}