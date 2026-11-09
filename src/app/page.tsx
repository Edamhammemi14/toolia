import Link from "next/link";
import { ArrowRight, Wrench, Truck, ShieldCheck, HeadphonesIcon } from "lucide-react";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { Button, buttonVariants } from "@/components/ui/button";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    take: 8,
    orderBy: { rating: "desc" },
    include: { category: true },
  });

  const categories = await prisma.category.findMany({
    take: 8,
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white tracking-tighter mb-6 uppercase">
            Build. Create. Repair.
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 font-medium">
            Professional tools for every project. The right tool for the right job, delivered straight to your workshop.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products" className={buttonVariants({ size: "lg", className: "text-md h-12 px-8 uppercase tracking-wide font-semibold" })}>
              Shop Tools
            </Link>
            <Link href="/categories" className={buttonVariants({ size: "lg", variant: "outline", className: "text-md h-12 px-8 uppercase tracking-wide font-semibold bg-white/5 text-white border-white/20 hover:bg-white/10" })}>
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold font-heading uppercase tracking-tight">Shop by Category</h2>
            <Link href="/categories" className="text-primary font-medium flex items-center hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/products?category=${category.id}`}
                className="group relative h-40 md:h-48 rounded-lg overflow-hidden bg-card border hover:shadow-lg transition-all"
              >
                {category.image && (
                  <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
                <div className="absolute inset-0 bg-zinc-900/40 group-hover:bg-zinc-900/60 transition-colors flex items-center justify-center p-6 text-center">
                  <h3 className="font-heading font-semibold text-lg uppercase tracking-wide text-white drop-shadow-md">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold font-heading uppercase tracking-tight">Featured Tools</h2>
            <Link href="/products" className="text-primary font-medium flex items-center hover:underline">
              Shop All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading uppercase tracking-tighter mb-4">
            Power Up Your Workshop
          </h2>
          <p className="text-lg md:text-xl font-medium mb-8 text-primary-foreground/90">
            Save up to 30% on selected professional power tools this week only.
          </p>
          <Link href="/products?sale=true" className={buttonVariants({ size: "lg", variant: "secondary", className: "text-md h-12 px-8 uppercase tracking-wide font-semibold text-primary" })}>
            Shop The Sale
          </Link>
        </div>
      </section>

      {/* Why Toolia */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold font-heading uppercase tracking-tight mb-12">Why Choose Toolia?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-card border rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold font-heading uppercase tracking-wide mb-2">Quality</h3>
              <p className="text-sm text-muted-foreground">Reliable products from trusted manufacturers built for professionals.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card border rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-bold font-heading uppercase tracking-wide mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Get your tools when you need them with our expedited shipping options.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card border rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold font-heading uppercase tracking-wide mb-2">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">Safe and reliable checkout with industry-standard encryption.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card border rounded-lg">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <HeadphonesIcon className="h-6 w-6" />
              </div>
              <h3 className="font-bold font-heading uppercase tracking-wide mb-2">Expert Support</h3>
              <p className="text-sm text-muted-foreground">Our team of experts is ready to help you choose the right tool for the job.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
