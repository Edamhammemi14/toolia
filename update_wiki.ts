import { PrismaClient } from "./src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const wikiMap: Record<string, string> = {
  "Bosch Professional Cordless Drill": "Drill",
  "Makita Impact Driver": "Impact driver",
  "DeWalt Circular Saw": "Circular saw",
  "Stanley Hammer": "Hammer",
  "Milwaukee Angle Grinder": "Angle grinder",
  "Knipex Pliers": "Pliers",
  "Bosch Laser Measure": "Tape measure",
  "Makita Jigsaw": "Jigsaw (tool)",
  "Stanley Screwdriver Set": "Screwdriver",
  "DeWalt Tool Box": "Toolbox",
  "Milwaukee Cordless Ratchet": "Socket wrench",
  "Knipex Wire Strippers": "Wire stripper",
  "Bosch Rotary Hammer": "Rotary hammer",
  "Makita String Trimmer": "String trimmer",
  "DeWalt Table Saw": "Table saw",
  "Stanley Tape Measure 8m": "Tape measure",
  "Milwaukee Pipe Wrench": "Pipe wrench",
  "Bosch Heat Gun": "Heat gun",
  "Knipex Bolt Cutter": "Bolt cutter",
  "DeWalt Air Compressor": "Air compressor",
  "Makita Chain Saw": "Chainsaw",
  "Stanley Utility Knife": "Utility knife",
  "Milwaukee Multimeter": "Multimeter",
  "Bosch Planer": "Thickness planer",
  "DeWalt Orbital Sander": "Random orbital sander",
  "Knipex Water Pump Pliers": "Plumber wrench",
  "Makita Blower": "Leaf blower",
  "Stanley Socket Set": "Socket wrench",
  "Milwaukee Work Light": "Flashlight",
  "Bosch Inspection Camera": "Borescope",
};

async function getWikiImage(title: string): Promise<string | null> {
  try {
    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=640`);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === "-1") return null;
    return pages[pageId].thumbnail?.source || null;
  } catch (e) {
    console.error(`Failed to fetch for ${title}`, e);
    return null;
  }
}

async function main() {
  const products = await prisma.product.findMany();
  for (const product of products) {
    const wikiTitle = wikiMap[product.name];
    if (wikiTitle) {
      const imageUrl = await getWikiImage(wikiTitle);
      if (imageUrl) {
        await prisma.product.update({
          where: { id: product.id },
          data: { image: imageUrl },
        });
        console.log(`Updated ${product.name} with ${imageUrl}`);
      } else {
        console.log(`No image found for ${wikiTitle}`);
      }
    }
  }
}

main().catch(console.error).finally(() => process.exit(0));
