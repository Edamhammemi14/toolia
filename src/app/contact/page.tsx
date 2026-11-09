export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold font-heading uppercase mb-6">Contact Us</h1>
      <p className="text-lg text-muted-foreground max-w-2xl text-center mb-8">
        Have a question about a product or need support with your order? Our professional 
        support team is ready to assist you.
      </p>
      <div className="text-center font-medium">
        <p>Email: support@toolia.com</p>
        <p>Phone: 1-800-555-TOOL</p>
      </div>
    </div>
  );
}
