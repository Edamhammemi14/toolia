import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { auth } from "@/auth";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Trash2, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

export default async function CartPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold font-heading uppercase mb-4">Your Cart</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Please sign in to view and manage your shopping cart.
        </p>
        <Link href="/login" className={buttonVariants({ size: "lg" })}>
          Sign In
        </Link>
      </div>
    );
  }

  // Fetch user's cart
  const cart = await prisma.cart.findFirst({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  const cartItems = cart?.items || [];
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 15; // Free shipping over 50 TND
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-6 text-muted-foreground">
          <Trash2 className="h-10 w-10 opacity-20" />
        </div>
        <h1 className="text-3xl font-bold font-heading uppercase mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven't added any tools to your cart yet. Discover our professional equipment collection.
        </p>
        <Link href="/products" className={buttonVariants({ size: "lg" })}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-heading uppercase mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="bg-card border rounded-xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b bg-muted/30 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 items-center">
                  <div className="col-span-1 sm:col-span-6 flex gap-4 items-center">
                    <div className="w-20 h-20 bg-muted/50 rounded-md shrink-0 flex items-center justify-center border overflow-hidden">
                      {item.product.image ? (
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-zinc-200 rounded-sm" />
                      )}
                    </div>
                    <div>
                      <Link href={`/products/${item.product.id}`} className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                        {item.product.name}
                      </Link>
                      <button className="text-sm text-destructive hover:underline mt-1 flex items-center">
                        <Trash2 className="h-3 w-3 mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 sm:col-span-2 text-left sm:text-center font-medium">
                    <span className="sm:hidden text-muted-foreground text-sm mr-2">Price:</span>
                    {item.product.price.toFixed(2)} TND
                  </div>
                  
                  <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-center">
                    <div className="flex items-center border rounded-md h-9">
                      <button className="px-2 hover:bg-muted transition-colors h-full">-</button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button className="px-2 hover:bg-muted transition-colors h-full">+</button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 sm:col-span-2 text-left sm:text-right font-bold text-lg">
                    <span className="sm:hidden text-muted-foreground text-sm font-normal mr-2">Total:</span>
                    {(item.product.price * item.quantity).toFixed(2)} TND
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-card border rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold font-heading uppercase mb-6 border-b pb-4">Order Summary</h2>
            
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{subtotal.toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : `${shipping.toFixed(2)} TND`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span className="font-medium">{tax.toFixed(2)} TND</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="font-semibold uppercase tracking-wide">Total</span>
                <span className="text-2xl font-bold text-primary">{total.toFixed(2)} TND</span>
              </div>
            </div>
            
            <Link href="/checkout" className={buttonVariants({ className: "w-full h-12 text-md uppercase font-bold tracking-wide flex items-center justify-center gap-2" })}>
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            
            <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1">
              Secure checkout guaranteed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
