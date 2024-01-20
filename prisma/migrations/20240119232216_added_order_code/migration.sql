-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "observation" TEXT,
    "amount" INTEGER NOT NULL,
    "payment" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "isFinished" BOOLEAN NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderedProduct" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderedProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SideDishe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "SideDishe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SideDishesOrder" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sideDishesId" INTEGER NOT NULL,
    "orderedProductId" INTEGER NOT NULL,

    CONSTRAINT "SideDishesOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderedProduct" ADD CONSTRAINT "OrderedProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProduct" ADD CONSTRAINT "OrderedProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SideDishe" ADD CONSTRAINT "SideDishe_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SideDishesOrder" ADD CONSTRAINT "SideDishesOrder_sideDishesId_fkey" FOREIGN KEY ("sideDishesId") REFERENCES "SideDishe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SideDishesOrder" ADD CONSTRAINT "SideDishesOrder_orderedProductId_fkey" FOREIGN KEY ("orderedProductId") REFERENCES "OrderedProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
