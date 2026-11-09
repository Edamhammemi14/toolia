import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { Button } from "@/components/ui/button";
import { Search, Filter, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold font-heading uppercase">Order Management</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filter Status
        </Button>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search by order ID or email..." className="pl-9" />
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {orders.length} orders total
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Order ID</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Customer</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Date</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Total</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{order.user.name || "Customer"}</div>
                      <div className="text-xs text-muted-foreground">{order.user.email}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-semibold">{order.total.toFixed(2)} TND</td>
                    <td className="px-6 py-4">
                      <select 
                        defaultValue={order.status}
                        className="bg-transparent border rounded text-xs font-medium py-1 px-2 uppercase focus:ring-primary focus:border-primary"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
