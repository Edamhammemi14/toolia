"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md bg-card border rounded-xl p-8 shadow-sm">
        <div className="flex justify-center mb-6 text-primary">
          <ShieldCheck className="h-12 w-12" />
        </div>
        <h1 className="text-2xl font-bold font-heading uppercase text-center mb-2">Welcome Back</h1>
        <p className="text-muted-foreground text-center mb-8">
          Sign in to your Toolia account
        </p>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="admin@toolia.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <div className="text-xs text-muted-foreground bg-muted p-3 rounded-md mt-4">
            <strong>Demo Credentials:</strong><br />
            Admin: admin@toolia.com / Admin123!<br />
            Customer: customer@toolia.com / Customer123!
          </div>

          <Button type="submit" className="w-full h-12 text-md mt-4 uppercase font-bold tracking-wide" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
