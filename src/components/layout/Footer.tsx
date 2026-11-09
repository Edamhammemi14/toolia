import Link from "next/link";
import { Globe, Mail, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="font-heading font-bold text-2xl tracking-tighter text-primary">
              TOOLIA
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional tools for every project. The right tool. The right job.
              We provide the highest quality equipment for professionals and serious DIYers.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Website</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
                <span className="sr-only">Phone</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">Chat</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 font-heading tracking-wide uppercase">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary transition-colors">Power Tools</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Hand Tools</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Workshop Equipment</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Automotive</Link></li>
              <li><Link href="/products?sort=new" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 font-heading tracking-wide uppercase">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Warranty Info</Link></li>
              <li><Link href="/account" className="hover:text-primary transition-colors">Track Order</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 font-heading tracking-wide uppercase">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Toolia. All rights reserved. (University Demo Project)</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
