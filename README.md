# 🛠️ Toolia — Plateforme E-Commerce B2C d'Outillage Professionnel

<p align="center">
  <strong>Projet de Fin d'Études (PFA / PFE) — ISET de Sfax</strong><br>
  Développé en partenariat avec <strong>EDI Solutions</strong> (Sfax, Tunisie)
</p>

---

## 📌 Présentation du Projet

**Toolia** est une plateforme web e-commerce moderne dédiée à la vente et à la distribution d'outillage professionnel et de matériel de quincaillerie en Tunisie (marques majeures : **Bosch**, **Makita**, **DeWalt**, **Stanley**, etc.).

Conçue pour répondre aux besoins des artisans, professionnels du bâtiment et passionnés de bricolage, la plateforme digitalise l'intégralité du cycle commercial :
- Consultation d'un catalogue technique riche avec gestion des stocks en temps réel.
- Moteur de recherche prédictif et filtrage multicritère (par marque, catégorie et prix).
- Panier d'achat et liste de favoris (Wishlist) persistants en base de données.
- Tunnel de commande sécurisé avec gestion des adresses de livraison en Tunisie et transactions atomiques.
- Espace client pour le suivi des commandes et la gestion de la sécurité du compte.
- Tableau de bord administrateur (Back-Office) avec visualisations statistiques (Recharts), alertes de stock bas et gestion des commandes.

---

## 🚀 Stack Technologique

| Couche | Technologies |
| :--- | :--- |
| **Framework Full-Stack** | [Next.js 16](https://nextjs.org/) (App Router, Server Components & Server Actions) |
| **Bibliothèque UI** | [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/) |
| **ORM & Base de données** | [Prisma ORM 7](https://www.prisma.io/) avec SQLite / LibSQL (`dev.db`) |
| **Design & Composants** | [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/) & [Lucide Icons](https://lucide.dev/) |
| **Visualisation de données** | [Recharts](https://recharts.org/) (Statistiques & Dashboard Admin) |
| **Authentification & Sécurité** | [NextAuth.js v5](https://authjs.dev/) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js) (Salage et hachage sécurisé) |
| **Localisation & Devises** | Dinars Tunisiens (**TND**) |

---

## 🗄️ Modélisation des Données (Prisma)

Le schéma relationnel comprend 10 entités interconnectées :

- **`User`** : Comptes utilisateurs avec gestion des rôles (`CUSTOMER`, `ADMIN`).
- **`Address`** : Carnet d'adresses de livraison en Tunisie lié à l'utilisateur.
- **`Category`** : Catégories d'outils (Électroportatif, Outillage à main, Mesure, etc.).
- **`Brand`** : Fabricants réputés (Bosch, Makita, DeWalt, Stanley...).
- **`Product`** : Articles techniques avec prix en TND, stock, image et caractéristiques.
- **`Cart` & `CartItem`** : Panier persistant sauvegardé en base de données.
- **`Order` & `OrderItem`** : Commandes figées avec statut logistique (`PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`) et snapshot du prix d'achat.
- **`Review`** : Avis et évaluations clients (notes de 1 à 5 étoiles).
- **`Wishlist`** : Articles favoris sauvegardés par l'utilisateur.

---

## 📂 Structure du Projet

```text
pfa/
├── prisma/
│   ├── schema.prisma       # Schéma relationnel de la base de données
│   └── seed.ts             # Script d'alimentation initiale (produits, marques, catégories)
├── src/
│   ├── app/
│   │   ├── (auth)/         # Authentification (login, register)
│   │   ├── account/        # Espace personnel client (profil, commandes, sécurité)
│   │   ├── cart/           # Page du panier dynamique
│   │   ├── checkout/       # Tunnel de validation de commande
│   │   ├── dashboard/      # Back-Office Administrateur (Recharts, produits, stocks, commandes)
│   │   ├── products/       # Catalogue général et fiches produits détaillées
│   │   ├── layout.tsx      # Layout racine de l'application
│   │   └── page.tsx        # Page d'accueil publique (Hero banner, marques vedettes)
│   ├── components/         # Composants UI réutilisables (Shadcn UI, cartes produits, navigation)
│   ├── lib/                # Client Prisma, utilitaires et configuration NextAuth
│   └── generated/          # Code généré par le client Prisma
├── public/                 # Fichiers statiques et médias
├── .env                    # Variables d'environnement
├── package.json            # Dépendances du projet
└── tsconfig.json           # Configuration TypeScript
```

---

## ⚙️ Installation et Démarrage Local

### 1. Prérequis
- [Node.js](https://nodejs.org/) (version 20 LTS ou supérieure recommandée)
- npm, yarn ou pnpm

### 2. Cloner le projet et installer les dépendances
```bash
git clone <URL_DU_DEPOT_GIT>
cd pfa
npm install
```

### 3. Configurer les variables d'environnement
Créez un fichier `.env` à la racine du projet en vous basant sur l'exemple ci-dessous :
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="votre_cle_secrete_generee_aleatoirement"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Initialiser la base de données
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer le schéma à la base SQLite locale
npx prisma db push

# (Optionnel) Alimenter la base avec des données de test
npx tsx prisma/seed.ts
```

### 5. Lancer le serveur de développement
```bash
npm run dev
```
Ouvrez ensuite [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🛠️ Commandes Utiles

- **Lancer Prisma Studio** (Interface graphique d'administration de la base) :
  ```bash
  npx prisma studio
  ```
- **Créer une version de production (Build)** :
  ```bash
  npm run build
  npm run start
  ```
- **Vérifier la qualité du code (Linting)** :
  ```bash
  npm run lint
  ```

---

## 🎓 Informations Académiques

- **Étudiante :** Edam Hammemi (Groupe DSI 32 – CIN : 1117339)
- **Établissement :** Institut Supérieur des Études Technologiques de Sfax (ISET Sfax)
- **Département :** Technologies de l'Informatique
- **Parcours :** Licence Nationale en Technologies de l'Informatique (DSI)
- **Organisme d'accueil :** EDI Solutions, Sfax
- **Encadrant professionnel :** M. Morched Gwia (Responsable Technique)
- **Année Universitaire :** 2025 – 2026

---

## 📄 Licence

Ce projet a été réalisé dans le cadre d'un projet de fin d'études universitaire au sein de l'ISET de Sfax en collaboration avec EDI Solutions. Tous droits réservés.
