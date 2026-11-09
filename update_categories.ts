import { PrismaClient } from "./src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const categoryImages: Record<string, string> = {
  "Power Tools": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=640&q=80",
  "Hand Tools": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=640&q=80",
  "Measuring Tools": "https://images.unsplash.com/photo-1540104539488-92a51bbc0410?w=640&q=80",
  "Electrical Tools": "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=640&q=80",
  "Plumbing": "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=640&q=80",
  "Gardening": "https://images.unsplash.com/photo-1416879598555-220b8fae7264?w=640&q=80",
  "Automotive": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=640&q=80",
  "Workshop Equipment": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=640&q=80",
};

async function main() {
  const categories = await prisma.category.findMany();
  for (const cat of categories) {
    const imageUrl = categoryImages[cat.name] || categoryImages["Power Tools"];
    await prisma.category.update({
      where: { id: cat.id },
      data: { image: imageUrl },
    });
    console.log(`Updated category ${cat.name}`);
  }
}

main().catch(console.error).finally(() => process.exit(0));
