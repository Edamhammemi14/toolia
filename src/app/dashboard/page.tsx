import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

export default async function DashboardOverview() {
  const [totalProducts, totalUsers, totalOrders, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.order.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    }),
  ]);

  // Demo total revenue calculation
  const allOrders = await prisma.order.findMany();
  const totalRevenue = allOrders.reduce((acc, order) => acc + order.total, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold font-heading uppercase mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground uppercase text-sm tracking-wide">Total Revenue</h3>
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{totalRevenue.toFixed(2)} TND</p>
          <p className="text-xs text-muted-foreground mt-2">+12% from last month</p>
        </div>
        
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground uppercase text-sm tracking-wide">Orders</h3>
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <ShoppingCart className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{totalOrders}</p>
          <p className="text-xs text-muted-foreground mt-2">+8% from last month</p>
        </div>
        
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground uppercase text-sm tracking-wide">Products</h3>
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{totalProducts}</p>
          <p className="text-xs text-muted-foreground mt-2">12 low in stock</p>
        </div>
        
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground uppercase text-sm tracking-wide">Customers</h3>
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{totalUsers}</p>
          <p className="text-xs text-muted-foreground mt-2">+3 new today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold font-heading uppercase text-lg mb-6">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium uppercase tracking-wider text-xs">Order ID</th>
                  <th className="pb-3 font-medium uppercase tracking-wider text-xs">Customer</th>
                  <th className="pb-3 font-medium uppercase tracking-wider text-xs">Date</th>
                  <th className="pb-3 font-medium uppercase tracking-wider text-xs">Total</th>
                  <th className="pb-3 font-medium uppercase tracking-wider text-xs">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">No recent orders</td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-4 font-mono">{order.id.slice(0, 8)}...</td>
                      <td className="py-4 font-medium">{order.user.name || order.user.email}</td>
                      <td className="py-4 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 font-semibold">{order.total.toFixed(2)} TND</td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold font-heading uppercase text-lg mb-6">Inventory Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
              <div>
                <p className="font-medium text-sm text-foreground">DeWalt 20V MAX Drill</p>
                <p className="text-xs text-destructive mt-1">Only 2 left in stock</p>
              </div>
              <button className="text-xs font-semibold text-primary uppercase hover:underline">Restock</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
              <div>
                <p className="font-medium text-sm text-foreground">Milwaukee Packout Kit</p>
                <p className="text-xs text-destructive mt-1">Out of stock</p>
              </div>
              <button className="text-xs font-semibold text-primary uppercase hover:underline">Restock</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
