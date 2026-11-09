import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function OrderDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/account" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Account
      </Link>
      
      <div className="bg-card border rounded-xl p-8 shadow-sm text-center">
        <h1 className="text-3xl font-bold font-heading uppercase mb-4">Order Details</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Detailed view for order #{params.id} is coming soon in a future update!
        </p>
        <Link href="/account" className={buttonVariants({ size: "lg" })}>
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
