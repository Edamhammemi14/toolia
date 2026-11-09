import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

export default async function ProductsPage(props: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>
}) {
  const searchParams = await props.searchParams;
  const { q, category, sort } = searchParams;

  // Build the where clause
  const where: any = {};
  if (q) {
    where.name = { contains: q };
  }
  if (category) {
    where.categoryId = category;
  }

  // Build order by
  let orderBy: any = { createdAt: "desc" };
  if (sort === "price-asc") orderBy = { price: "asc" };
  if (sort === "price-desc") orderBy = { price: "desc" };
  if (sort === "rating") orderBy = { rating: "desc" };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: { category: true, brand: true },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading uppercase tracking-tight">
            {q ? `Search Results for "${q}"` : "All Tools"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Showing {products.length} products</p>
        </div>
        
        <div className="w-full md:w-auto flex items-center gap-2">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search catalog..."
              defaultValue={q}
              className="w-full pl-9"
            />
          </div>
          <Button variant="outline" size="icon" className="md:hidden">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 hidden md:block">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="font-heading font-semibold uppercase tracking-wide mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className={`text-sm hover:text-primary transition-colors ${!category ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                    All Categories
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link 
                      href={`/products?category=${c.id}`} 
                      className={`text-sm hover:text-primary transition-colors ${category === c.id ? 'font-bold text-primary' : 'text-muted-foreground'}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading font-semibold uppercase tracking-wide mb-4">Sort By</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/products?${new URLSearchParams(Object.entries({...searchParams, sort: 'new'}).filter(([_, v]) => v != null) as [string, string][]).toString()}`} className={`text-sm hover:text-primary ${!sort || sort === 'new' ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                    Newest Arrivals
                  </Link>
                </li>
                <li>
                  <Link href={`/products?${new URLSearchParams(Object.entries({...searchParams, sort: 'price-asc'}).filter(([_, v]) => v != null) as [string, string][]).toString()}`} className={`text-sm hover:text-primary ${sort === 'price-asc' ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                    Price: Low to High
                  </Link>
                </li>
                <li>
                  <Link href={`/products?${new URLSearchParams(Object.entries({...searchParams, sort: 'price-desc'}).filter(([_, v]) => v != null) as [string, string][]).toString()}`} className={`text-sm hover:text-primary ${sort === 'price-desc' ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                    Price: High to Low
                  </Link>
                </li>
                <li>
                  <Link href={`/products?${new URLSearchParams(Object.entries({...searchParams, sort: 'rating'}).filter(([_, v]) => v != null) as [string, string][]).toString()}`} className={`text-sm hover:text-primary ${sort === 'rating' ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                    Highest Rated
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 border rounded-lg border-dashed">
              <h2 className="text-2xl font-bold font-heading uppercase text-muted-foreground mb-2">No products found</h2>
              <p className="text-muted-foreground mb-6">We couldn't find any tools matching your criteria.</p>
              <Link href="/products" className={buttonVariants()}>Clear Filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="group block">
                  <div className="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                    <div className="aspect-square bg-muted/50 relative flex items-center justify-center p-6 overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform" />
                      ) : (
                        <div className="w-32 h-32 bg-zinc-200 rounded-md shadow-sm group-hover:scale-105 transition-transform" />
                      )}
                      {product.discount && (
                        <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category.name}</p>
                      <h3 className="font-semibold text-foreground leading-tight mb-2 line-clamp-2">{product.name}</h3>
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-lg">{product.price.toFixed(2)} TND</span>
                          {product.discount && (
                            <span className="text-sm text-muted-foreground line-through">
                              {(product.price * (1 + product.discount / 100)).toFixed(2)} TND
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
