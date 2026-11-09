import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Lock } from "lucide-react";
import Link from "next/link";

export default async function CheckoutPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/checkout");
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold font-heading uppercase mb-8">Secure Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold font-heading uppercase mb-4 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center text-sm">1</span>
              Shipping Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <Input placeholder="John" defaultValue={session.user.name?.split(' ')[0] || ''} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <Input placeholder="Doe" defaultValue={session.user.name?.split(' ')[1] || ''} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input placeholder="123 Main St" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <Input placeholder="New York" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Postal Code</label>
                <Input placeholder="10001" />
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold font-heading uppercase mb-4 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center text-sm">2</span>
              Payment Method
            </h2>
            <div className="space-y-4">
              <div className="border rounded-md p-4 bg-muted/20 flex items-center justify-between border-primary">
                <div className="flex items-center gap-3">
                  <input type="radio" checked readOnly className="text-primary focus:ring-primary" />
                  <span className="font-medium">Credit Card</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-5 bg-zinc-200 rounded"></div>
                  <div className="w-8 h-5 bg-zinc-200 rounded"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <Input placeholder="0000 0000 0000 0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry Date</label>
                  <Input placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVC</label>
                  <Input placeholder="123" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-semibold font-heading uppercase mb-4">Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 pb-4 border-b">
                <div className="w-12 h-12 bg-muted rounded border shrink-0"></div>
                <div>
                  <p className="text-sm font-medium line-clamp-1">DeWalt 20V MAX Drill</p>
                  <p className="text-xs text-muted-foreground">Qty: 1</p>
                  <p className="text-sm font-semibold mt-1">149.99 TND</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>149.99 TND</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>12.00 TND</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                <span>Total</span>
                <span className="text-primary">161.99 TND</span>
              </div>
            </div>
            
            <form action="/account">
              <Button type="submit" className="w-full h-12 text-md uppercase font-bold tracking-wide">
                <Lock className="h-4 w-4 mr-2" /> Place Order
              </Button>
            </form>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              Your payment information is encrypted and secure.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
