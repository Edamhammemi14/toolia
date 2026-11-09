import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { Package, MapPin, User, Settings } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/account");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-heading uppercase mb-8">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold uppercase">
                {user.name?.[0] || user.email?.[0]}
              </div>
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <nav className="space-y-2">
              <Link href="/account" className="flex items-center gap-3 px-3 py-2 bg-muted text-foreground rounded-md text-sm font-medium transition-colors">
                <Package className="h-4 w-4" />
                Order History
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted/50 rounded-md text-sm font-medium transition-colors">
                <MapPin className="h-4 w-4" />
                Addresses
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted/50 rounded-md text-sm font-medium transition-colors">
                <User className="h-4 w-4" />
                Profile Settings
              </Link>
            </nav>
          </div>
        </aside>

        <main className="flex-1">
          <div className="bg-card border rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold font-heading uppercase">Order History</h2>
              <p className="text-sm text-muted-foreground mt-1">View and track your recent orders.</p>
            </div>
            
            <div className="p-0">
              {user.orders.length === 0 ? (
                <div className="text-center py-16">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                    <Package className="h-8 w-8 opacity-50" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">When you place orders, they will appear here.</p>
                  <Link href="/products" className={buttonVariants()}>Start Shopping</Link>
                </div>
              ) : (
                <div className="divide-y">
                  {user.orders.map((order) => (
                    <div key={order.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-lg">Order #{order.id.slice(0, 8).toUpperCase()}</span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 sm:justify-end">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                          <p className="font-bold text-lg">{order.total.toFixed(2)} TND</p>
                        </div>
                        <Link href={`/account/orders/${order.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>View Details</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
