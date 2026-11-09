import Link from "next/link";
import { ShoppingCart, Search, User, Menu, LogOut } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { auth, signOut } from "@/auth";

export default async function Header() {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4">
        <div className="mr-4 flex md:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-semibold uppercase tracking-wider text-primary">Toolia</Link>
                <Link href="/products" className="text-lg font-medium hover:text-primary transition-colors">Shop All</Link>
                <Link href="/categories" className="text-lg font-medium hover:text-primary transition-colors">Categories</Link>
                {isAdmin && (
                  <Link href="/dashboard" className="text-lg font-medium text-amber-500 hover:text-primary transition-colors">Admin Dashboard</Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-heading font-bold text-2xl tracking-tighter text-primary">TOOLIA</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/products" className="transition-colors hover:text-primary">Shop</Link>
          <Link href="/categories" className="transition-colors hover:text-primary">Categories</Link>
          {isAdmin && (
            <Link href="/dashboard" className="transition-colors text-amber-500 hover:text-primary">Dashboard</Link>
          )}
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <form action="/products" className="w-full max-w-sm hidden md:flex items-center space-x-2">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                name="q"
                type="search"
                placeholder="Search tools..."
                className="w-full bg-muted/50 pl-8 focus-visible:ring-primary rounded-full border-none"
              />
            </div>
          </form>
          <nav className="flex items-center space-x-2">
            {session ? (
              <div className="hidden sm:flex items-center gap-4 text-sm">
                <Link href="/account" className="text-muted-foreground font-medium hover:text-primary transition-colors flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Hi, {session.user?.name?.split(' ')[0]}
                </Link>
                <form action={async () => {
                  "use server";
                  await signOut();
                }}>
                  <Button variant="ghost" size="icon" type="submit" title="Logout">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            ) : (
              <Link href="/login" className={buttonVariants({ variant: "ghost", size: "icon", className: "hidden sm:flex" })}>
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            )}
            
            <Link href="/cart" className={buttonVariants({ variant: "ghost", size: "icon", className: "relative" })}>
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                0
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
