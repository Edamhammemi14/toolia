import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // 1. Clear existing data
  await prisma.review.deleteMany();
  await prisma.specification.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Toolia Admin",
      email: "admin@toolia.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const customerPassword = await bcrypt.hash("Customer123!", 10);
  const customer = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "customer@toolia.com",
      password: customerPassword,
      role: "CUSTOMER",
    },
  });

  console.log(`Users created: ${admin.email}, ${customer.email}`);

  // 3. Create Brands
  const brandNames = ["Bosch", "Makita", "DeWalt", "Stanley", "Milwaukee", "Knipex"];
  const brands = await Promise.all(
    brandNames.map((name) =>
      prisma.brand.create({
        data: { name, description: `Professional tools by ${name}` },
      })
    )
  );
  
  const brandMap = brands.reduce((acc, brand) => {
    acc[brand.name] = brand.id;
    return acc;
  }, {} as Record<string, string>);

  // 4. Create Categories
  const categoryNames = [
    "Power Tools",
    "Hand Tools",
    "Measuring Tools",
    "Electrical Tools",
    "Plumbing",
    "Gardening",
    "Automotive",
    "Workshop Equipment",
  ];
  
  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.category.create({
        data: { name, description: `High-quality ${name.toLowerCase()}` },
      })
    )
  );

  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.name] = cat.id;
    return acc;
  }, {} as Record<string, string>);

  // 5. Create Products
  const productsData = [
    { name: "Bosch Professional Cordless Drill", brand: "Bosch", cat: "Power Tools", price: 149.99, discount: 10, stock: 45 },
    { name: "Makita Impact Driver", brand: "Makita", cat: "Power Tools", price: 129.50, discount: null, stock: 30 },
    { name: "DeWalt Circular Saw", brand: "DeWalt", cat: "Power Tools", price: 189.99, discount: 20, stock: 15 },
    { name: "Stanley Hammer", brand: "Stanley", cat: "Hand Tools", price: 24.99, discount: null, stock: 100 },
    { name: "Milwaukee Angle Grinder", brand: "Milwaukee", cat: "Power Tools", price: 119.00, discount: null, stock: 25 },
    { name: "Knipex Pliers", brand: "Knipex", cat: "Hand Tools", price: 34.50, discount: null, stock: 60 },
    { name: "Bosch Laser Measure", brand: "Bosch", cat: "Measuring Tools", price: 89.99, discount: 5, stock: 40 },
    { name: "Makita Jigsaw", brand: "Makita", cat: "Power Tools", price: 139.99, discount: null, stock: 12 },
    { name: "Stanley Screwdriver Set", brand: "Stanley", cat: "Hand Tools", price: 39.99, discount: null, stock: 85 },
    { name: "DeWalt Tool Box", brand: "DeWalt", cat: "Workshop Equipment", price: 59.99, discount: null, stock: 50 },
    { name: "Milwaukee Cordless Ratchet", brand: "Milwaukee", cat: "Automotive", price: 179.00, discount: 15, stock: 18 },
    { name: "Knipex Wire Strippers", brand: "Knipex", cat: "Electrical Tools", price: 45.00, discount: null, stock: 35 },
    { name: "Bosch Rotary Hammer", brand: "Bosch", cat: "Power Tools", price: 249.99, discount: 30, stock: 8 },
    { name: "Makita String Trimmer", brand: "Makita", cat: "Gardening", price: 159.00, discount: null, stock: 22 },
    { name: "DeWalt Table Saw", brand: "DeWalt", cat: "Power Tools", price: 399.00, discount: 50, stock: 5 },
    { name: "Stanley Tape Measure 8m", brand: "Stanley", cat: "Measuring Tools", price: 14.99, discount: null, stock: 120 },
    { name: "Milwaukee Pipe Wrench", brand: "Milwaukee", cat: "Plumbing", price: 49.99, discount: null, stock: 40 },
    { name: "Bosch Heat Gun", brand: "Bosch", cat: "Power Tools", price: 79.99, discount: null, stock: 25 },
    { name: "Knipex Bolt Cutter", brand: "Knipex", cat: "Hand Tools", price: 65.00, discount: null, stock: 15 },
    { name: "DeWalt Air Compressor", brand: "DeWalt", cat: "Workshop Equipment", price: 299.00, discount: null, stock: 10 },
    { name: "Makita Chain Saw", brand: "Makita", cat: "Gardening", price: 229.00, discount: 25, stock: 14 },
    { name: "Stanley Utility Knife", brand: "Stanley", cat: "Hand Tools", price: 9.99, discount: null, stock: 200 },
    { name: "Milwaukee Multimeter", brand: "Milwaukee", cat: "Electrical Tools", price: 129.99, discount: null, stock: 20 },
    { name: "Bosch Planer", brand: "Bosch", cat: "Power Tools", price: 159.50, discount: null, stock: 18 },
    { name: "DeWalt Orbital Sander", brand: "DeWalt", cat: "Power Tools", price: 89.00, discount: null, stock: 30 },
    { name: "Knipex Water Pump Pliers", brand: "Knipex", cat: "Plumbing", price: 38.50, discount: null, stock: 45 },
    { name: "Makita Blower", brand: "Makita", cat: "Gardening", price: 119.99, discount: 10, stock: 28 },
    { name: "Stanley Socket Set", brand: "Stanley", cat: "Automotive", price: 89.99, discount: null, stock: 32 },
    { name: "Milwaukee Work Light", brand: "Milwaukee", cat: "Workshop Equipment", price: 69.00, discount: null, stock: 55 },
    { name: "Bosch Inspection Camera", brand: "Bosch", cat: "Automotive", price: 199.99, discount: 20, stock: 12 },
  ];

  const imageMap: Record<string, string> = {
    drill: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=640&q=80',
    saw: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=640&q=80', // Fallback to hero
    hammer: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=640&q=80',
    grinder: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=640&q=80',
    pliers: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=640&q=80',
    measure: 'https://images.unsplash.com/photo-1540104539488-92a51bbc0410?w=640&q=80',
    screwdriver: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=640&q=80',
    toolbox: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=640&q=80',
    wrench: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=640&q=80',
    multimeter: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=640&q=80',
    tool: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=640&q=80',
  };

  const getKeyword = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('drill') || n.includes('driver')) return 'drill';
    if (n.includes('hammer')) return 'hammer';
    if (n.includes('measure') || n.includes('tape')) return 'measure';
    if (n.includes('screwdriver')) return 'screwdriver';
    if (n.includes('box')) return 'toolbox';
    if (n.includes('wrench') || n.includes('pliers') || n.includes('cutter') || n.includes('stripper')) return 'wrench';
    if (n.includes('multimeter')) return 'multimeter';
    return 'tool';
  };

  for (let i = 0; i < productsData.length; i++) {
    const p = productsData[i];
    const keyword = getKeyword(p.name);
    const imageUrl = imageMap[keyword] || imageMap.tool;
    
    await prisma.product.create({
      data: {
        name: p.name,
        description: `Professional grade ${p.name.toLowerCase()} suitable for all your project needs. Durable, reliable, and built to last.`,
        price: p.price,
        discount: p.discount,
        stock: p.stock,
        rating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)), // Random rating between 3.5 and 5.0
        image: imageUrl,
        categoryId: categoryMap[p.cat],
        brandId: brandMap[p.brand],
        specifications: {
          create: [
            { name: "Brand", value: p.brand },
            { name: "Category", value: p.cat },
            { name: "Warranty", value: "2 Years" },
          ],
        },
      },
    });
  }

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
