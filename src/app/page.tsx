"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Check,
  ChevronDown,
  Database,
  Download,
  Expand,
  FileText,
  Layers3,
  LockKeyhole,
  Menu,
  Network,
  Play,
  Search,
  Server,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  UserRound,
  UsersRound,
  Wrench,
  X,
  Zap,
} from "lucide-react";

const navy = "#0b1630";

const slides = [
  {
    kicker: "SOUTENANCE · 2025—2026",
    title: "TOOLIA",
    subtitle: "Conception et réalisation d’une plateforme e-commerce B2C dédiée à l’outillage professionnel.",
    type: "cover",
    note: "Bonjour à toutes et à tous. Je vais vous présenter Toolia, une plateforme e-commerce B2C conçue pour moderniser la vente d’outillage professionnel. Ce projet a été réalisé dans le cadre de mon stage chez TIF, avec Next.js et Prisma ORM.",
  },
  {
    kicker: "01 · INTRODUCTION",
    title: "Du comptoir au parcours digital",
    subtitle: "Le commerce traditionnel de l’outillage reste dépendant du point de vente, de l’appel et de la ressaisie.",
    type: "context",
    note: "Le point de départ est un processus encore très manuel : le client se déplace, téléphone ou consulte un catalogue papier. Cette organisation rend l’information moins accessible et complique la vérification des stocks et le suivi de la commande.",
  },
  {
    kicker: "02 · PROBLÉMATIQUE",
    title: "Une question de visibilité et de fiabilité",
    subtitle: "Comment numériser le cycle de vente tout en sécurisant les opérations et en donnant à l’administration des outils de pilotage ?",
    type: "problem",
    note: "La problématique combine trois enjeux : rendre la disponibilité visible, fiabiliser le passage de commande et améliorer le pilotage administratif. Toolia est pensée comme une réponse complète à ces trois dimensions.",
  },
  {
    kicker: "03 · SOLUTION",
    title: "Toolia, une expérience unifiée",
    subtitle: "Un catalogue multi-marques, un checkout cohérent et un espace de gestion centralisé.",
    type: "solution",
    note: "Toolia centralise tout le parcours : découverte, recherche, fiche produit, panier, wishlist, commande et suivi. En parallèle, l’administration dispose d’un espace pour gérer le catalogue, les stocks, les clients et les commandes.",
  },
  {
    kicker: "04 · ACTEURS",
    title: "Deux rôles, deux besoins",
    subtitle: "Les fonctionnalités sont organisées autour du client et de l’administrateur.",
    type: "actors",
    note: "Le CUSTOMER cherche, compare et achète. L’ADMIN structure l’offre, surveille les stocks et pilote les ventes. La séparation des rôles est ensuite appliquée par l’authentification et le RBAC.",
  },
  {
    kicker: "05 · MODÉLISATION",
    title: "Cas d’utilisation",
    subtitle: "Un système centré sur la découverte, la commande et le pilotage.",
    type: "usecase",
    note: "Le diagramme de cas d’utilisation met en évidence les interactions principales. Le client agit sur le catalogue et son parcours d’achat, tandis que l’administrateur intervient sur les données et les opérations de gestion.",
  },
  {
    kicker: "06 · DONNÉES",
    title: "Un modèle métier cohérent",
    subtitle: "Les entités Prisma traduisent les objets réels du commerce en ligne.",
    type: "data",
    note: "Le modèle relie l’utilisateur à ses adresses, son panier, ses favoris et ses commandes. Les produits sont rattachés à une catégorie et une marque. Les lignes de commande conservent le prix historique, ce qui protège l’intégrité de l’historique.",
  },
  {
    kicker: "07 · ARCHITECTURE",
    title: "Une architecture en couches",
    subtitle: "Chaque couche a une responsabilité claire, du rendu jusqu’à la persistance.",
    type: "architecture",
    note: "L’architecture N-Tier sépare la présentation, les règles métier, l’accès aux données et la persistance. Les Server Actions portent les mutations, Prisma joue le rôle d’accès aux données, et SQLite via LibSQL assure le stockage.",
  },
  {
    kicker: "08 · TECHNOLOGIES",
    title: "Une stack full-stack maîtrisée",
    subtitle: "Des choix alignés avec les besoins de performance, de sécurité et de maintenabilité.",
    type: "stack",
    note: "Le frontend s’appuie sur Next.js, React, TypeScript, Tailwind et Shadcn UI. Le backend utilise les Server Actions et Prisma. Auth.js et bcryptjs couvrent l’authentification, tandis que Recharts apporte la visualisation analytique.",
  },
  {
    kicker: "09 · ESPACE CLIENT",
    title: "Un parcours d’achat continu",
    subtitle: "De l’inscription au suivi, le client retrouve ses données et ses actions au même endroit.",
    type: "customer",
    note: "Le parcours client couvre l’inscription, la recherche, les filtres par marque, la fiche détaillée, le panier, la wishlist, les adresses tunisiennes, le checkout et l’historique des commandes.",
  },
  {
    kicker: "10 · ADMINISTRATION",
    title: "Piloter l’activité depuis un seul espace",
    subtitle: "Le dashboard rend visibles les produits, les commandes, les clients et les alertes de stock.",
    type: "admin",
    note: "L’espace administrateur propose les opérations CRUD sur les produits et les catégories, la gestion des clients et des rôles, les alertes de stock et le suivi des statuts. Les indicateurs donnent une lecture synthétique de l’activité.",
  },
  {
    kicker: "11 · SÉCURITÉ",
    title: "Sécuriser les accès et les données",
    subtitle: "L’authentification, l’autorisation et la validation côté serveur forment une même chaîne de confiance.",
    type: "security",
    note: "NextAuth.js gère la session avec Credentials Provider, bcryptjs protège les mots de passe et le RBAC sépare CUSTOMER et ADMIN. Les routes et les mutations sont contrôlées côté serveur.",
  },
  {
    kicker: "12 · ZOOM TECHNIQUE",
    title: "Le checkout comme transaction atomique",
    subtitle: "Une commande n’est validée que si toutes les écritures peuvent être réalisées ensemble.",
    type: "checkout",
    note: "Au checkout, le stock est vérifié puis décrémenté, la commande et ses lignes sont créées, les prix sont figés et le panier est vidé. Si le stock est insuffisant, la transaction est annulée intégralement : aucune donnée partielle ne reste en base.",
  },
  {
    kicker: "13 · VALIDATION",
    title: "Des scénarios fonctionnels ciblés",
    subtitle: "La validation porte sur les parcours critiques, sans inventer de métriques de performance.",
    type: "validation",
    note: "Les contrôles couvrent les comptes, les routes protégées, la recherche, la persistance du panier et de la wishlist, les montants, les adresses, les stocks, les statuts et l’annulation complète en cas de stock insuffisant.",
  },
  {
    kicker: "14 · CONCLUSION",
    title: "Un cycle de vente mieux maîtrisé",
    subtitle: "Toolia transforme un processus traditionnel en une expérience numérique centralisée, accessible et sécurisée.",
    type: "outlook",
    note: "Pour conclure, Toolia améliore la visibilité, la fiabilité et le pilotage. Les perspectives sont l’intégration d’une passerelle tunisienne comme Konnect ou Flouci, l’évolution vers une PWA, le suivi GPS des livraisons et l’enrichissement des analyses.",
  },
];

function Pill({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <span className={`deck-pill ${dark ? "deck-pill-dark" : ""}`}>{children}</span>;
}

function DiagramNode({ label, tone = "blue" }: { label: string; tone?: "blue" | "dark" | "cyan" }) {
  return <div className={`diagram-node ${tone}`}>{label}</div>;
}

function SlideContent({ slide }: { slide: (typeof slides)[number] }) {
  switch (slide.type) {
    case "cover":
      return <div className="cover-layout"><div className="cover-copy"><Pill dark>PROJET DE FIN D’ÉTUDES</Pill><h1>TOOLIA<span>.</span></h1><p>{slide.subtitle}</p><div className="cover-meta"><strong>Edam Hammemi</strong><span>ISET Sfax · DSI</span><span>TIF · Morched Gwia</span><span>05 mai — 31 mai 2026</span></div></div><div className="cover-art"><div className="cover-ring ring-one"/><div className="cover-ring ring-two"/><div className="tool-orbit"><WrenchIcon/><span>CATALOGUE</span></div><div className="cover-card card-top"><span>STOCK</span><strong>24 / 32</strong><small>produits disponibles</small></div><div className="cover-card card-bottom"><span>CHECKOUT</span><strong>ORDER_042</strong><small>transaction sécurisée</small></div></div></div>;
    case "context": return <div className="context-layout"><div className="before-card"><span className="mini-label">AVANT</span><div className="route-line"><div className="route-step"><PhoneIcon/><strong>Appel</strong><small>disponibilité</small></div><div className="route-arrow">→</div><div className="route-step"><FileText/><strong>Catalogue</strong><small>papier / devis</small></div><div className="route-arrow">→</div><div className="route-step"><UsersRound/><strong>Magasin</strong><small>ressaisie</small></div></div><div className="pain-list"><span>Visibilité limitée</span><span>Informations dispersées</span><span>Erreurs de quantité</span></div></div><div className="after-card"><span className="mini-label">APRÈS</span><div className="digital-box"><Sparkles/><strong>Un parcours disponible 24/7</strong><p>Catalogue · stock · commande · suivi</p></div><div className="blue-bar"><span>Une seule source de vérité</span><ArrowRight/></div></div></div>;
    case "problem": return <div className="problem-layout"><div className="quote-mark">“</div><div className="problem-quote">Comment numériser le cycle de vente d’outillage afin d’améliorer la visibilité des disponibilités, la fiabilité des commandes et la qualité du suivi&nbsp;?</div><div className="problem-tags"><Pill>VISIBILITÉ</Pill><Pill>FIABILITÉ</Pill><Pill>PILOTAGE</Pill><Pill>SÉCURITÉ</Pill></div><div className="answer-callout"><span>RÉPONSE</span><strong>Toolia centralise le cycle, sécurise les écritures et donne à l’administration des outils de décision.</strong></div></div>;
    case "solution": return <div className="solution-layout"><div className="solution-card main-solution"><div className="solution-logo">T<span>o</span></div><strong>Une plateforme B2C<br/>dédiée à l’outillage</strong><small>prix en TND · multi-marques</small></div><div className="feature-grid">{[[Search,"Recherche multicritère"],[Box,"Fiches techniques"],[ShoppingCart,"Panier persistant"],[Zap,"Wishlist & commande"],[ShieldCheck,"Suivi sécurisé"],[UsersRound,"Espace administrateur"]].map(([Icon,label], i)=><div className="feature-tile" key={i}><Icon/><span>{label as string}</span></div>)}</div></div>;
    case "actors": return <div className="actors-layout"><div className="actor-card customer"><div className="actor-icon"><UserRound/></div><div><span className="mini-label">ACTEUR 01</span><h3>CUSTOMER</h3><p>Découvrir, choisir, acheter.</p></div><ul><li>Consulter et rechercher</li><li>Gérer panier et favoris</li><li>Commander et suivre</li><li>Gérer son compte</li></ul></div><div className="actor-card admin"><div className="actor-icon"><ShieldCheck/></div><div><span className="mini-label">ACTEUR 02</span><h3>ADMIN</h3><p>Structurer, surveiller, piloter.</p></div><ul><li>Gérer produits et catégories</li><li>Gérer clients et rôles</li><li>Surveiller les stocks</li><li>Suivre les commandes & KPI</li></ul></div></div>;
    case "usecase": return <div className="usecase-layout"><div className="actor-stick customer-stick">CUSTOMER</div><div className="usecase-cloud"><div className="cloud-title">PLATEFORME TOOLIA</div><div className="usecase-row"><DiagramNode label="Consulter le catalogue"/><DiagramNode label="Rechercher / filtrer"/><DiagramNode label="Gérer le panier"/></div><div className="usecase-row"><DiagramNode label="Passer commande" tone="cyan"/><DiagramNode label="Suivre ses achats" tone="cyan"/><DiagramNode label="Gérer les produits" tone="dark"/></div><div className="usecase-row"><DiagramNode label="Gérer les stocks" tone="dark"/><DiagramNode label="Gérer les clients" tone="dark"/><DiagramNode label="Analyser les ventes" tone="dark"/></div></div><div className="actor-stick admin-stick">ADMIN</div></div>;
    case "data": return <div className="data-layout"><div className="data-graph"><div className="data-line l1"/><div className="data-line l2"/><div className="data-line l3"/><div className="entity central"><Database/><strong>Product</strong><small>price · stock · brand</small></div><div className="entity e-user"><UserRound/><strong>User</strong><small>address · orders</small></div><div className="entity e-order"><ShoppingCart/><strong>Order</strong><small>items · status</small></div><div className="entity e-category"><Layers3/><strong>Category</strong><small>products</small></div><div className="entity e-cart"><Box/><strong>Cart</strong><small>cart items</small></div></div><div className="entity-list"><span>11 entités métier</span>{["User / Address","Category / Brand","Product / Review","Cart / CartItem","Order / OrderItem","Wishlist"].map((x)=><div key={x}><Check/>{x}</div>)}</div></div>;
    case "architecture": return <div className="architecture-layout"><div className="layer-stack">{[["01","Presentation Layer","Next.js App Router · React Components",Layers3],["02","Application Layer","Server Actions · règles métier",Network],["03","Data Access Layer","Prisma Client",Database],["04","Persistence Layer","SQLite / LibSQL",Server]].map(([n,t,d,Icon])=><div className="arch-layer" key={n as string}><span>{n as string}</span><Icon/><div><strong>{t as string}</strong><small>{d as string}</small></div><ArrowRight/></div>)}</div><div className="auth-note"><LockKeyhole/><span><strong>NextAuth.js</strong> traverse la chaîne pour authentifier et protéger les routes.</span></div></div>;
    case "stack": return <div className="stack-layout"><div className="stack-column"><span className="mini-label">FRONTEND</span>{[["N16","Next.js 16"],["R19","React 19"],["TS","TypeScript"],["TW","Tailwind CSS v4"],["UI","Shadcn UI"]].map(([a,b])=><div className="stack-row" key={a}><b>{a}</b><span>{b}</span></div>)}</div><div className="stack-column active-stack"><span className="mini-label">BACKEND & DATA</span>{[["SA","Server Actions"],["P7","Prisma ORM 7"],["SQL","SQLite / LibSQL"],["AU","Auth.js v5 Beta"],["RC","Recharts"]].map(([a,b])=><div className="stack-row" key={a}><b>{a}</b><span>{b}</span></div>)}</div><div className="stack-caption"><Sparkles/> Une stack cohérente, légère et adaptée au périmètre du projet.</div></div>;
    case "customer": return <div className="journey-layout"><div className="journey-track">{[[UserRound,"Compte"],[Search,"Catalogue"],[Box,"Produit"],[ShoppingCart,"Panier"],[Check,"Commande"],[FileText,"Suivi"]].map(([Icon,label],i)=><div className="journey-step" key={i}><div className={`journey-icon ${i === 4 ? "selected" : ""}`}><Icon/></div><span>{label as string}</span>{i<5&&<div className="journey-connector"/>}</div>)}</div><div className="journey-panel"><div className="mock-browser"><div className="browser-bar"><span/><span/><span/><em>toolia.tn / checkout</em></div><div className="mock-content"><div className="mock-sidebar"/><div className="mock-main"><div className="mock-line long"/><div className="mock-line short"/><div className="mock-order"><Check/><span>Commande confirmée</span><b>248,00 TND</b></div><div className="mock-line mid"/></div></div></div><div className="journey-caption">Un parcours où les données client restent disponibles entre les sessions.</div></div></div>;
    case "admin": return <div className="admin-layout"><div className="dashboard-mock"><div className="dash-sidebar"><div className="dash-brand">TOOLIA<span>.</span></div><small>OVERVIEW</small><b>Dashboard</b><small>GESTION</small><span>Produits</span><span>Commandes</span><span>Clients</span></div><div className="dash-body"><div className="dash-top"><div><span className="mini-label">MONDAY, 25 MAY</span><h3>Bonjour, Admin</h3></div><div className="dash-avatar">A</div></div><div className="kpi-grid"><div><small>CHIFFRE D’AFFAIRES</small><strong>12 480 <i>TND</i></strong><em>+12.8%</em></div><div><small>COMMANDES</small><strong>148</strong><em>+8.2%</em></div><div><small>STOCK FAIBLE</small><strong className="alert-number">07</strong><em className="alert">à surveiller</em></div></div><div className="dash-chart"><small>VENTES · MAI 2026</small><div className="bars">{[35,52,42,68,58,76,90,63,85,72,96,82].map((h,i)=><span key={i} style={{height:`${h}%`}} className={i===10?"highlight":""}/>)}</div></div></div></div><div className="admin-badges"><Pill dark>CRUD PRODUITS</Pill><Pill dark>ALERTES STOCK</Pill><Pill dark>RBAC</Pill></div></div>;
    case "security": return <div className="security-layout"><div className="security-core"><div className="shield-large"><ShieldCheck/></div><strong>Toolia<br/>Security Layer</strong><small>contrôles côté serveur</small></div><div className="security-items">{[[LockKeyhole,"AUTHENTIFICATION","NextAuth.js · Credentials Provider · bcryptjs"],[UsersRound,"AUTORISATION","RBAC · CUSTOMER / ADMIN · routes protégées"],[Check,"INTÉGRITÉ","Validation serveur · prix historiques · stock cohérent"]].map(([Icon,t,d])=><div className="security-item" key={t as string}><Icon/><div><strong>{t as string}</strong><span>{d as string}</span></div></div>)}</div></div>;
    case "checkout": return <div className="checkout-layout"><div className="checkout-flow">{[[Search,"Vérifier","stock disponible"],[Zap,"Décrémenter","quantités"],[ShoppingCart,"Créer","Order + items"],[Database,"Figer","prix unitaires"],[X,"Vider","le panier"]].map(([Icon,t,d],i)=><div className="checkout-step" key={i}><div className="checkout-index">0{i+1}</div><Icon/><strong>{t as string}</strong><small>{d as string}</small>{i<4&&<ArrowRight/>}</div>)}</div><div className="atomic-note"><div className="atomic-icon">ACID</div><div><strong>Tout ou rien.</strong><span>Si le stock est insuffisant, la transaction est annulée intégralement. Aucune écriture partielle ne persiste.</span></div></div></div>;
    case "validation": return <div className="validation-layout"><div className="validation-score"><span>SCÉNARIOS</span><strong>09</strong><small>parcours critiques contrôlés</small></div><div className="check-grid">{["Inscription & connexion","Protection des routes","Recherche & filtres","Panier & wishlist persistants","Calcul des montants","Adresses tunisiennes","Disponibilité du stock","Transition des statuts","Rollback si stock insuffisant"].map((x)=><div key={x}><Check/>{x}</div>)}</div></div>;
    case "outlook": return <div className="outlook-layout"><div className="outlook-statement">Toolia ne se limite pas à vendre des outils en ligne&nbsp;: elle transforme un processus de vente traditionnel en une expérience numérique centralisée, accessible et mieux maîtrisée.</div><div className="perspectives"><span className="mini-label">PERSPECTIVES</span><div><Pill>Konnect / Flouci</Pill><Pill>PWA</Pill><Pill>GPS livraison</Pill><Pill>Analyses enrichies</Pill></div></div><div className="thanks">MERCI POUR VOTRE ATTENTION <span>— Avez-vous des questions&nbsp;?</span></div></div>;
    default: return null;
  }
}

function WrenchIcon(){return <div className="wrench-icon"><Wrench/></div>}
function PhoneIcon(){return <span className="tiny-icon">⌕</span>}

export default function Presentation() {
  const [index, setIndex] = useState(0);
  const [notes, setNotes] = useState(false);
  const slide = slides[index];
  const progress = useMemo(() => ((index + 1) / slides.length) * 100, [index]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") setIndex((i) => Math.min(i + 1, slides.length - 1));
      if (event.key === "ArrowLeft" || event.key === "PageUp") setIndex((i) => Math.max(i - 1, 0));
      if (event.key.toLowerCase() === "n") setNotes((value) => !value);
      if (event.key.toLowerCase() === "f") document.documentElement.requestFullscreen?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return <main className="presentation-shell"><div className="deck-topbar"><div className="deck-brand"><span className="brand-mark">T</span><span>TOOLIA <em>/ SOUTENANCE</em></span></div><div className="deck-top-actions"><span className="deck-status"><span/> PRÉSENTATION</span><button onClick={() => setNotes(!notes)} aria-label="Afficher les notes"><FileText/> <span>Notes</span></button><button onClick={() => window.print()} aria-label="Imprimer la présentation"><Download/> <span>PDF</span></button><button onClick={() => document.documentElement.requestFullscreen?.()} aria-label="Plein écran"><Expand/></button></div></div><section className="slide-viewport"><div className={`slide-canvas slide-${slide.type}`}><div className="slide-heading"><span>{slide.kicker}</span><div className="slide-count">{String(index + 1).padStart(2,"0")} <i>/ {String(slides.length).padStart(2,"0")}</i></div></div><div className="slide-title"><h2>{slide.title}</h2><p>{slide.subtitle}</p></div><SlideContent slide={slide}/><div className="slide-footer"><span>Edam Hammemi · ISET Sfax · DSI</span><span>TOOLIA <b>•</b> 2026</span></div></div></section><div className="deck-controls"><button className="nav-button" onClick={() => setIndex((i) => Math.max(0,i-1))} disabled={index === 0} aria-label="Diapositive précédente"><ArrowLeft/></button><div className="progress-wrap"><div className="progress-track"><div className="progress-value" style={{width:`${progress}%`}}/></div><span>Utilisez ← → pour naviguer · N pour les notes · F pour le plein écran</span></div><button className="nav-button filled" onClick={() => setIndex((i) => Math.min(slides.length-1,i+1))} disabled={index === slides.length-1} aria-label="Diapositive suivante"><ArrowRight/></button></div>{notes&&<aside className="notes-drawer"><div><span className="mini-label">NOTES DU PRÉSENTATEUR · {String(index+1).padStart(2,"0")}</span><button onClick={()=>setNotes(false)} aria-label="Fermer les notes"><X/></button></div><p>{slide.note}</p><div className="notes-tip"><ChevronDown/> Transition suggérée : passez à la diapositive suivante après avoir posé cette idée.</div></aside>}</main>;
}
