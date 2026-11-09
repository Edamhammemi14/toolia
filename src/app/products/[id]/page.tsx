import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { notFound } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Star, Truck, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

export default async function ProductDetails(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      brand: true,
      specifications: true,
    },
  });

  if (!product) {
    notFound();
  }

  const hasDiscount = product.discount && product.discount > 0;
  const originalPrice = hasDiscount ? product.price * (1 + product.discount! / 100) : product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image Gallery (Placeholder for now) */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square bg-muted/30 rounded-xl border flex items-center justify-center p-0 relative overflow-hidden group">
            {hasDiscount && (
              <Badge variant="destructive" className="absolute top-4 left-4 z-10">
                SALE -{product.discount}%
              </Badge>
            )}
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-2/3 h-2/3 bg-zinc-200/80 rounded-lg shadow-inner group-hover:scale-105 transition-transform duration-500" />
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-muted/30 rounded-md border cursor-pointer hover:border-primary transition-colors flex items-center justify-center">
                 <div className="w-1/2 h-1/2 bg-zinc-200 rounded-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <Link href={`/categories/${product.categoryId}`} className="text-sm font-semibold uppercase tracking-wider text-primary hover:underline">
              {product.category.name}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mt-2 mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`h-4 w-4 ${star <= (product.rating || 0) ? 'fill-current' : 'text-muted'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} Rating</span>
              <span className="text-muted-foreground text-sm">•</span>
              <span className="text-sm font-medium text-foreground">{product.brand.name}</span>
            </div>

            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-4xl font-bold tracking-tight">{product.price.toFixed(2)} TND</span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through decoration-destructive decoration-2">
                  {originalPrice.toFixed(2)} TND
                </span>
              )}
            </div>
            
            {product.stock > 0 ? (
              <p className="text-sm font-medium text-green-600 mt-2 flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2" /> In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-sm font-medium text-destructive mt-2 flex items-center">
                <span className="w-2 h-2 rounded-full bg-destructive mr-2" /> Out of Stock
              </p>
            )}
          </div>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-8 border-b">
            <div className="flex items-center border rounded-md h-12 w-full sm:w-32">
              <button className="px-4 text-lg hover:text-primary transition-colors">-</button>
              <input type="number" defaultValue="1" min="1" max={product.stock} className="w-full text-center bg-transparent border-none focus:outline-none" />
              <button className="px-4 text-lg hover:text-primary transition-colors">+</button>
            </div>
            <Button size="lg" className="flex-1 h-12 text-md uppercase tracking-wide font-semibold" disabled={product.stock === 0}>
              Add to Cart
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Truck className="h-5 w-5 text-primary" />
              <span>Free shipping on orders over 50 TND</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Shield className="h-5 w-5 text-primary" />
              <span>2-year warranty included</span>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications.length > 0 && (
            <div className="mt-4">
              <h3 className="font-heading font-semibold text-lg uppercase tracking-wide mb-4">Specifications</h3>
              <div className="border rounded-lg overflow-hidden">
                {product.specifications.map((spec, index) => (
                  <div key={spec.id} className={`flex p-3 text-sm ${index % 2 === 0 ? 'bg-muted/30' : 'bg-background'}`}>
                    <div className="w-1/3 font-medium text-muted-foreground">{spec.name}</div>
                    <div className="w-2/3 font-semibold text-foreground">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
