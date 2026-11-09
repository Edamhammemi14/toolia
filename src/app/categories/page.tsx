import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-tighter mb-4">
          All Categories
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Browse our extensive collection of professional tools categorized for your convenience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/products?category=${category.id}`}
            className="group relative h-64 rounded-xl overflow-hidden bg-card border hover:shadow-xl transition-all block"
          >
            {category.image && (
              <img 
                src={category.image} 
                alt={category.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent flex flex-col justify-end p-6">
              <h3 className="font-heading font-bold text-xl uppercase tracking-wide text-white mb-1">
                {category.name}
              </h3>
              <p className="text-zinc-300 text-sm mb-4">
                {category._count.products} Products
              </p>
              <div className="flex items-center text-primary text-sm font-semibold">
                Shop Now <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
