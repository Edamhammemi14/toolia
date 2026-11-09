import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, brand: true },
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold font-heading uppercase">Manage Products</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="pl-9" />
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {products.length} products total
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Product</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Category</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Price</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Stock</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-muted rounded shrink-0 border"></div>
                      <div className="font-medium text-foreground line-clamp-1">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {product.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">{product.price.toFixed(2)} TND</td>
                  <td className="px-6 py-4">
                    {product.stock > 10 ? (
                      <span className="text-green-600 font-medium">{product.stock}</span>
                    ) : product.stock > 0 ? (
                      <span className="text-amber-500 font-medium">{product.stock} (Low)</span>
                    ) : (
                      <span className="text-destructive font-medium">Out of Stock</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
