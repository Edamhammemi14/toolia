import { PrismaClient } from "./src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const products = await prisma.product.findMany();
  for (const product of products) {
    // Current prices are in USD. Multiply by 3.5 (approx exchange rate + import premium)
    const rawNewPrice = product.price * 3.5;
    
    // Round to nearest 10, then subtract 1 to get retail pricing (e.g. 199, 89, 549)
    let newPrice = Math.round(rawNewPrice / 10) * 10 - 1;
    
    // For very cheap items, don't let it go to -1
    if (newPrice <= 0) {
      newPrice = 9;
    }

    await prisma.product.update({
      where: { id: product.id },
      data: { price: newPrice },
    });
    console.log(`Updated ${product.name}: ${product.price} -> ${newPrice} TND`);
  }
}

main().catch(console.error).finally(() => process.exit(0));
