import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold font-heading uppercase mb-6">Create Account</h1>
      <p className="text-lg text-muted-foreground max-w-2xl text-center mb-8">
        Registration is currently disabled for this demo project. Please log in using the demo 
        credentials provided.
      </p>
      <Link href="/login" className={buttonVariants({ size: "lg" })}>
        Go to Login
      </Link>
    </div>
  );
}
