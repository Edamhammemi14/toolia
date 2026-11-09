# Projet de Fin d'Études: Toolia E-Commerce Platform

## 30-Day Development Journal

### Day 1: Project Kickoff and Requirements Gathering

Today marked the official start of the project. I defined the scope of the e-commerce platform for professional tools, which we named 'Toolia'. I spent the day documenting the core requirements: a product catalog, shopping cart, user authentication, and an admin dashboard. I also researched the target audience (contractors and DIY enthusiasts in Tunisia) to ensure the platform meets their specific needs. By the end of the day, I had a solid project charter and a clear vision of the final deliverable.

<div class="page-break"></div>

### Day 2: Architecture Planning and Tech Stack Selection

I dedicated today to architectural decisions. After evaluating various options, I chose Next.js (App Router) for its excellent SSR capabilities and performance. For the database, I opted for SQLite via libSQL, managed by Prisma ORM, which provides type safety and rapid development. I decided on Tailwind CSS and Shadcn UI for styling to ensure a clean, modern, and responsive design. I documented this tech stack and created high-level system architecture diagrams.

<div class="page-break"></div>

### Day 3: UI/UX Design and Wireframing

Today was focused on the user experience. I created wireframes for the critical paths: the home page, the product listing page, the product detail page, and the checkout flow. I established a rugged, professional visual identity suited for a hardware/tools store. I planned out the navigation hierarchy, ensuring that users can easily find tools by category or brand. These wireframes will serve as the blueprint for the frontend development phase.

<div class="page-break"></div>

### Day 4: Environment Setup and Repository Initialization

I set up the development environment today. I initialized a new Next.js project using `npx create-next-app`, configured TypeScript, and set up ESLint and Prettier for code consistency. I also initialized the Git repository and created the initial directory structure (`src/app`, `src/components`, `src/lib`). I made sure that the development server runs correctly and pushed the initial commit to the remote repository.

<div class="page-break"></div>

### Day 5: Tailwind CSS and UI Components Configuration

Today, I configured the styling framework. I extended the Tailwind CSS configuration to include custom colors (industrial grays, safety orange/yellow accents) and fonts. I also installed and configured Shadcn UI, adding base components like Buttons, Inputs, Cards, and Badges. I built a temporary style guide page to verify that all components align with the project's visual identity.

<div class="page-break"></div>

### Day 6: Database Modeling (Part 1: Core Entities)

I started working on the backend by designing the core database schema in Prisma. I defined the `User` model with roles (Customer, Admin). Then, I focused on the product catalog, designing the `Category`, `Brand`, and `Product` models. I carefully established the relationships, such as one-to-many between categories/brands and products. I reviewed the schema to ensure it supports future scalability.

<div class="page-break"></div>

### Day 7: Database Modeling (Part 2: E-commerce Logic)

Continuing with the database design, I modeled the transactional side of the application. I created the `Order` and `OrderItem` schemas to track purchases. I also added models for `Cart`, `CartItem`, `Wishlist`, and `Review`. I defined cascading delete rules and indexes for frequently queried fields. The complete Prisma schema is now ready for database generation.

<div class="page-break"></div>

### Day 8: Database Initialization and Migrations

Today I connected the application to the libSQL database. I set up the Prisma client with the `@prisma/adapter-libsql` and executed the first migration using `prisma db push` (and later migrations). I verified that the SQLite file (`dev.db`) was created successfully and used Prisma Studio to inspect the empty tables, confirming that the database connection is perfectly stable.

<div class="page-break"></div>

### Day 9: Writing the Database Seeding Script

To facilitate development, I wrote a comprehensive seeding script (`prisma/seed.ts`). I created realistic mock data for 30 professional tools across 8 categories (Power Tools, Hand Tools, Plumbing, etc.) and top brands (Bosch, Makita, DeWalt). I added logic to generate realistic descriptions, prices, and stock levels. Running this script populated the database with high-quality test data.

<div class="page-break"></div>

### Day 10: Building the Data Access Layer

I spent today writing the server-side logic to fetch data from the database. In Next.js Server Components, I implemented Prisma queries to retrieve featured products, category lists, and product details. I optimized these queries to include necessary relations (like fetching a product's brand and category in a single query) and handled potential null values safely.

<div class="page-break"></div>

### Day 11: Developing the Home Page

Frontend development officially started. I built the Home Page (`src/app/page.tsx`). I implemented a striking Hero section with a background image and strong call-to-action buttons. Below that, I created a 'Shop by Category' grid and a 'Featured Tools' section that dynamically renders the top-rated products from the database. The page is fully responsive across mobile and desktop.

<div class="page-break"></div>

### Day 12: Building the Product Catalog Page

Today I developed the main Shop page (`/products`). I created a responsive grid layout to display product cards. Each card shows the tool's image, name, category, price, and discount badge if applicable. I implemented server-side rendering for this page so that the product list is fetched directly from the database before being sent to the client, ensuring optimal SEO.

<div class="page-break"></div>

### Day 13: Implementing Search and Filtering

I added interactivity to the product catalog by implementing search and filtering. I used Next.js `searchParams` to handle URL-based state. Users can now type a keyword in the search bar to find specific tools, or click on a category in the sidebar to filter the list. The Prisma queries dynamically adjust based on these parameters using the `contains` operator.

<div class="page-break"></div>

### Day 14: Implementing Sorting Functionality

To improve user experience, I added sorting capabilities to the product catalog. I implemented logic to sort products by 'Newest Arrivals', 'Price: Low to High', 'Price: High to Low', and 'Highest Rated'. I updated the Prisma `orderBy` clauses based on the URL query parameters. This feature allows users to quickly find the cheapest or most premium tools.

<div class="page-break"></div>

### Day 15: Developing the Product Details Page (Part 1)

I started building the dynamic Product Details page (`/products/[id]`). I implemented the layout to display the product image prominently on the left and the critical information (name, brand, rating, price, description) on the right. I handled the 404 state securely, ensuring that if a user navigates to an invalid product ID, the app gracefully shows a 'Not Found' page.

<div class="page-break"></div>

### Day 16: Developing the Product Details Page (Part 2)

I finished the Product Details page today by adding the secondary information. I rendered the dynamic specifications table, displaying technical details like warranty and dimensions. I also implemented the stock status indicator (In Stock vs Out of Stock) dynamically based on the database. Finally, I laid out the quantity selector and the 'Add to Cart' button.

<div class="page-break"></div>

### Day 17: Building Shopping Cart State Logic

Today was dedicated to the shopping cart architecture. I decided to store the cart in the database tied to the user session, ensuring cross-device persistence. I wrote the backend actions to handle adding an item, updating quantities, and removing items. I implemented Prisma queries that either create a new cart for a user or update their existing one.

<div class="page-break"></div>

### Day 18: Creating the Shopping Cart UI

I built the Cart Page (`/cart`). It displays a list of all items currently in the user's cart, showing the image, price, and quantity. I implemented the math logic to automatically calculate the subtotal, apply an 8% tax rate, and determine if the user qualifies for free shipping. The layout includes an 'Order Summary' sticky sidebar that updates dynamically.

<div class="page-break"></div>

### Day 19: Setting up User Authentication

Security and authentication were today's focus. I integrated NextAuth.js (Auth.js) into the application. I configured the Prisma Adapter to store sessions and users in the database. I set up the credentials provider for email/password login, utilizing `bcryptjs` to securely hash and verify passwords. I tested the authentication flow to ensure sessions are created correctly.

<div class="page-break"></div>

### Day 20: Building Login and Registration Flows

With the auth backend ready, I built the user-facing Login and Registration pages. I created form components with proper validation and error handling. If a user enters incorrect credentials, they receive clear feedback. I also implemented redirect logic, so if an unauthenticated user tries to access a protected route (like the Cart), they are redirected to the login page.

<div class="page-break"></div>

### Day 21: Developing the User Dashboard

Today I created the authenticated user area. I built the Dashboard layout (`/account`), which provides a personalized greeting and navigation links. I created the profile settings page where users can view their information. I ensured that all these routes are protected by server-side session checks, guaranteeing that user data remains private and secure.

<div class="page-break"></div>

### Day 22: Implementing Order History

I added the Order History feature to the user dashboard. I wrote Prisma queries to fetch all past orders associated with the logged-in user, including the nested order items and product details. I designed a clean table layout to display order dates, status (e.g., 'Delivered', 'Pending'), and totals, allowing users to easily review their purchase history.

<div class="page-break"></div>

### Day 23: Implementing the Checkout Flow

Today was a major milestone: building the Checkout process. I created the checkout page where users confirm their shipping address and payment method. I implemented the server action that takes the active cart, creates a new `Order` and associated `OrderItems` in the database, clears the cart, and redirects the user to an order confirmation page.

<div class="page-break"></div>

### Day 24: Market Localization (Pricing Strategy)

I adapted the platform for the local Tunisian market. I wrote a migration script to update all database prices from USD to Tunisian Dinar (TND), taking into account exchange rates and import taxes. I adjusted the pricing algorithms to ensure prices end in realistic retail digits (e.g., 9 TND). I updated all UI components across the app to format currency correctly as 'TND'.

<div class="page-break"></div>

### Day 25: Market Localization (UI Adjustments)

Continuing with localization, I refined the user interface to better suit local expectations. I adjusted the shipping threshold logic (e.g., Free shipping over 50 TND instead of 50 USD). I reviewed the entire application to ensure that terminology, formatting, and UX copy felt natural and relevant to the target audience in Tunisia.

<div class="page-break"></div>

### Day 26: Dynamic Image Assets Integration

I tackled the challenge of missing product images. I wrote an automated script that queries the Wikipedia API using the specific tool names (e.g., 'Circular saw', 'Rotary hammer'). The script successfully downloaded highly relevant, real-world images and updated the database. For remaining items, I mapped high-quality fallback stock images from Unsplash. The catalog now looks incredibly professional.

<div class="page-break"></div>

### Day 27: Admin Dashboard Initialization

I started working on the administration panel. I implemented Role-Based Access Control (RBAC) in NextAuth, distinguishing between 'CUSTOMER' and 'ADMIN' roles. I created a protected `/dashboard` route group that explicitly rejects non-admin users. I designed the admin layout with a sidebar navigation for managing products, orders, and customers.

<div class="page-break"></div>

### Day 28: Admin Management Views

Today I built the data tables for the Admin Dashboard. I created the 'Manage Products' and 'Manage Orders' views. Administrators can now see a comprehensive list of all inventory and incoming orders. I added summary statistics cards at the top of the dashboard to display total revenue, total active products, and pending orders in real-time.

<div class="page-break"></div>

### Day 29: End-to-End Testing and Bug Fixing

With all features complete, I dedicated the day to rigorous testing. I tested the complete user journey: registering an account, searching for a product, adding it to the cart, and checking out. I identified and fixed several minor hydration errors and UI glitches on mobile devices. I optimized image loading to ensure the site is fast and responsive.

<div class="page-break"></div>

### Day 30: Final Review and Documentation

The final day! I conducted a comprehensive code review, cleaning up unused imports and formatting the codebase. I prepared this project journal to document the 30-day development journey. I ensured all environment variables are documented and the project is fully ready for deployment and the final PFA presentation. The Toolia platform is now complete and functional.

