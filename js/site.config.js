/**
 * ==============================================================================
 * CLIENT CONFIGURATION FILE (site.config.js)
 * ==============================================================================
 * 
 * AURA STUDIO — Contemporary Ready-to-Wear Clothing Boutique
 * 
 * Clean, modern boutique profile and clothing catalogue.
 * Ready-made clothing only.
 * ==============================================================================
 */

const SITE_CONFIG = {
  // ----------------------------------------------------------------------------
  // 1. BRAND & IDENTITY
  // ----------------------------------------------------------------------------
  brand: {
    name: "AURA STUDIO",
    tagline: "Contemporary Ready-to-Wear",
    shortDescription: "A curated collection of modern everyday pieces, statement silhouettes, and effortless style.",
    logoImage: null, // Renders clean modern typography wordmark
    logoAlt: "AURA STUDIO Ready-to-Wear Boutique",
    establishedYear: 2020,
  },

  // ----------------------------------------------------------------------------
  // 2. THEME & STYLING TOKENS
  // Warm Ivory, Soft Stone, Charcoal & Near-Black Palette
  // ----------------------------------------------------------------------------
  theme: {
    colors: {
      primary: "#181716",        // Near-black brand primary
      accent: "#6E665E",         // Subtle stone / taupe accent
      accentHover: "#181716",    // Near-black on hover
      accentSoft: "#F2EDE4",     // Pale warm stone
      secondary: "#5C5854",      // Warm charcoal
      bgMain: "#FAF8F5",         // Warm white / ivory canvas
      bgDark: "#181716",         // Dark footer background
    },
    fonts: {
      serif: "'Playfair Display', Georgia, serif",
      sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }
  },

  // ----------------------------------------------------------------------------
  // 3. NAVIGATION (Clean & Minimal)
  // ----------------------------------------------------------------------------
  navigation: [
    { label: "Home", href: "#top" },
    { label: "Collection", href: "#collections" },
    { label: "About", href: "#about" },
    { label: "Lookbook", href: "#lookbook" },
    { label: "Contact", href: "#contact" }
  ],

  // ----------------------------------------------------------------------------
  // 4. TOP ANNOUNCEMENT BAR
  // ----------------------------------------------------------------------------
  announcement: {
    text: "Spring / Summer 2026 Ready-to-Wear Collection Now Available",
    linkText: "Explore Collection",
    linkHref: "#collections"
  },

  // ----------------------------------------------------------------------------
  // 5. HERO SECTION CONFIGURATION
  // ----------------------------------------------------------------------------
  hero: {
    eyebrow: "Spring / Summer 2026",
    headline: "AURA STUDIO",
    subheadline: "Contemporary Ready-to-Wear. A curated collection of modern everyday pieces, statement silhouettes, and effortless style.",

    primaryCta: {
      text: "Explore Collection",
      href: "#collections"
    },

    secondaryCta: {
      text: "Chat on WhatsApp",
      href: "#contact",
      isWhatsApp: true,
      whatsAppMessage: "Hello Aura Studio! I would like to inquire about your ready-to-wear collection."
    },

    image: "assets/images/hero-boutique.svg",
    imageAlt: "Aura Studio Contemporary Ready-to-Wear Fashion",

    // Clutter items disabled for clean boutique aesthetic
    floatingBadge: null,
    featuresList: [],
    socialProof: ""
  },

  // ----------------------------------------------------------------------------
  // 6. VALUE HIGHLIGHTS / BRAND PILLARS
  // ----------------------------------------------------------------------------
  valueHighlights: [
    {
      icon: "scissors",
      title: "Curated Silhouettes",
      description: "Thoughtfully designed modern essentials and versatile cuts tailored for effortless daily wear."
    },
    {
      icon: "sparkles",
      title: "Quality Natural Fabrics",
      description: "Breathable organic cottons, natural European flax linen, and softly structured twills."
    },
    {
      icon: "gem",
      title: "Ready-to-Wear",
      description: "Carefully finished, pre-washed, and ready to slip on without complicated fittings."
    },
    {
      icon: "calendar",
      title: "Styling & Fit Guidance",
      description: "Direct sizing advice and wardrobe styling recommendations directly on WhatsApp."
    }
  ],

  // ----------------------------------------------------------------------------
  // 7. COLLECTIONS / READY-TO-WEAR CATEGORIES
  // ----------------------------------------------------------------------------
  collectionsSection: {
    eyebrow: "Wardrobe Edit",
    headline: "Collections",
    subheadline: "Explore our ready-made clothing lines, thoughtfully designed to be mixed, layered, and worn every day.",
    ctaText: "View Collection"
  },

  categories: [
    {
      id: "dresses",
      name: "Dresses",
      label: "Ready-to-Wear",
      shortDescription: "Effortless midi & wrap silhouettes cut in breathable washed linen.",
      image: "assets/images/cat-dresses.svg",
      imageAlt: "Aura Studio Ready-to-Wear Dresses",
      link: "#featured-collection",
      itemCount: "12 Styles"
    },
    {
      id: "tops",
      name: "Tops",
      label: "Everyday Staples",
      shortDescription: "Heavyweight combed cotton tees, ribbed tanks, and soft daily basics.",
      image: "assets/images/cat-tops.svg",
      imageAlt: "Aura Studio Modern Tops",
      link: "#featured-collection",
      itemCount: "16 Styles"
    },
    {
      id: "shirts",
      name: "Shirts",
      label: "Classic Poplin & Linen",
      shortDescription: "Crisp organic poplin button-downs and relaxed seasonal overshirts.",
      image: "assets/images/cat-shirts.svg",
      imageAlt: "Aura Studio Relaxed Shirts",
      link: "#featured-collection",
      itemCount: "14 Styles"
    },
    {
      id: "trousers",
      name: "Trousers",
      label: "Relaxed Proportions",
      shortDescription: "Wide-leg pleated trousers, linen pants, and washed cotton chinos.",
      image: "assets/images/cat-trousers.svg",
      imageAlt: "Aura Studio Trousers & Pants",
      link: "#featured-collection",
      itemCount: "10 Styles"
    },
    {
      id: "jackets",
      name: "Jackets",
      label: "Transitional Layers",
      shortDescription: "Structured canvas utility overshirts and clean minimalist blazers.",
      image: "assets/images/cat-jackets.svg",
      imageAlt: "Aura Studio Jackets & Outerwear",
      link: "#featured-collection",
      itemCount: "8 Styles"
    }
  ],

  // ----------------------------------------------------------------------------
  // 8. PRODUCT CATALOGUE / READY-MADE PIECES
  // ----------------------------------------------------------------------------
  catalogSection: {
    eyebrow: "The Boutique Catalogue",
    headline: "Featured Pieces",
    subheadline: "A curated showcase of ready-made clothing items. Clean lines, quality textiles, and modern proportions.",
    allFilterLabel: "All Pieces",
    viewDetailsLabel: "View Details",
    enquireWhatsAppLabel: "Inquire on WhatsApp"
  },

  commerce: {
    currencySymbol: "$",
    priceFormat: (p) => `$${p.toLocaleString()}`
  },

  products: [
    {
      id: "prod-01",
      name: "Washed Linen Wrap Midi Dress",
      category: "dresses",
      categoryName: "Dresses",
      price: 145,
      originalPrice: 165,
      badge: "Bestseller",
      badgeType: "accent",
      image: "assets/images/product-01.svg",
      imageAlt: "Washed Linen Wrap Midi Dress in Natural Oatmeal",
      description: "A contemporary wrap midi dress cut from breathable mid-weight European flax linen. Features an adjustable self-fabric waist tie, deep side pockets, and an elegant midi hemline.",
      availability: "In Stock",
      fabrics: "100% Washed European Flax Linen",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Natural Oatmeal", "Warm Charcoal", "Olive Moss"],
      whatsappMessage: "Hello Aura Studio! I would like to order the Washed Linen Wrap Midi Dress ($145)."
    },
    {
      id: "prod-02",
      name: "Relaxed Poplin Overshirt",
      category: "shirts",
      categoryName: "Shirts",
      price: 95,
      originalPrice: null,
      badge: "Essential",
      badgeType: "new",
      image: "assets/images/product-02.svg",
      imageAlt: "Relaxed Poplin Overshirt in Chalk White",
      description: "Cut in a generous boxy silhouette from crisp 100% organic cotton poplin. Features dropped shoulders, clean spread collar, and subtle tonal buttons.",
      availability: "In Stock",
      fabrics: "100% GOTS-Certified Organic Cotton Poplin",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Chalk White", "Washed Slate", "Soft Taupe"],
      whatsappMessage: "Hello Aura Studio! I would like to inquire about the Relaxed Poplin Overshirt ($95)."
    },
    {
      id: "prod-03",
      name: "Heavyweight Boxy Crewneck Tee",
      category: "tops",
      categoryName: "Tops",
      price: 48,
      originalPrice: null,
      badge: "Everyday Core",
      badgeType: "new",
      image: "assets/images/product-03.svg",
      imageAlt: "Heavyweight Boxy Crewneck Tee in Sandstone",
      description: "Constructed from 260 GSM combed organic cotton jersey with a tight rib collar that retains shape through continuous wear. Pre-shrunk with a clean modern drape.",
      availability: "In Stock",
      fabrics: "260 GSM Heavyweight Organic Cotton",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Sandstone", "Charcoal Black", "Optic White"],
      whatsappMessage: "Hello Aura Studio! I would like to inquire about the Heavyweight Boxy Crewneck Tee ($48)."
    },
    {
      id: "prod-04",
      name: "Pleated Linen-Cotton Trousers",
      category: "trousers",
      categoryName: "Trousers",
      price: 135,
      originalPrice: 150,
      badge: "Seasonal",
      badgeType: "sale",
      image: "assets/images/product-04.svg",
      imageAlt: "Pleated Linen-Cotton Trousers in Warm Stone",
      description: "Tailored with double forward pleats, comfortable side waist adjusters, and a relaxed straight leg. Blended from breathable French linen and soft combed cotton.",
      availability: "In Stock",
      fabrics: "55% French Linen, 45% Organic Cotton",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Warm Stone", "Dark Charcoal", "Toasted Oat"],
      whatsappMessage: "Hello Aura Studio! I would like to order the Pleated Linen-Cotton Trousers ($135)."
    },
    {
      id: "prod-05",
      name: "Minimalist Utility Jacket",
      category: "jackets",
      categoryName: "Jackets",
      price: 175,
      originalPrice: null,
      badge: "Signature",
      badgeType: "accent",
      image: "assets/images/product-05.svg",
      imageAlt: "Minimalist Utility Jacket in Raw Canvas",
      description: "An unlined transitional jacket crafted in sturdy cotton canvas twill. Features twin oversized patch pockets, clean horn buttons, and a relaxed boxy cut.",
      availability: "In Stock",
      fabrics: "100% Heavy Cotton Twill (Pre-Washed)",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Raw Canvas", "Washed Olive", "Midnight Black"],
      whatsappMessage: "Hello Aura Studio! I would like to order the Minimalist Utility Jacket ($175)."
    },
    {
      id: "prod-06",
      name: "Ribbed Knit Sleeveless Top",
      category: "tops",
      categoryName: "Tops",
      price: 55,
      originalPrice: null,
      badge: "New",
      badgeType: "new",
      image: "assets/images/product-06.svg",
      imageAlt: "Ribbed Knit Sleeveless Top in Soft Bone",
      description: "A refined high-neck ribbed knit tank with flattering armhole shaping. Spun from soft combed cotton with subtle stretch for comfortable all-day wear.",
      availability: "In Stock",
      fabrics: "95% Organic Cotton, 5% Elastane",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Soft Bone", "Espresso", "Charcoal"],
      whatsappMessage: "Hello Aura Studio! I would like to inquire about the Ribbed Knit Sleeveless Top ($55)."
    }
  ],

  // ----------------------------------------------------------------------------
  // 9. ABOUT SECTION (Clean Boutique Profile)
  // ----------------------------------------------------------------------------
  about: {
    eyebrow: "About the Boutique",
    headline: "Clean Aesthetics & Modern Living",
    establishedYear: 2020,
    establishedText: "Ready-to-Wear Boutique",

    storyParagraphs: [
      "AURA STUDIO is a contemporary boutique offering a curated selection of ready-to-wear clothing. We focus on modern silhouettes, quality fabrics, and effortless everyday elegance.",
      "Each piece in our collection is carefully chosen for its versatility, tactile comfort, and enduring style. We believe great dressing should feel natural, effortless, and accessible without compromise."
    ],

    quote: "Quiet confidence through modern ready-to-wear essentials that move with you.",
    quoteAuthor: "AURA STUDIO",

    image: "assets/images/about-boutique.svg",
    imageAlt: "Aura Studio Contemporary Boutique Space",

    stats: [], // Strictly no patron or atelier stats

    primaryCta: {
      text: "Chat on WhatsApp",
      href: "#contact",
      isWhatsApp: true,
      whatsAppMessage: "Hello Aura Studio! I would like to ask about sizing and styling advice."
    },
    secondaryCta: {
      text: "Explore Collections",
      href: "#collections"
    }
  },

  // ----------------------------------------------------------------------------
  // 10. LOOKBOOK SECTION (Spring / Summer 2026 Editorial)
  // ----------------------------------------------------------------------------
  lookbookSection: {
    eyebrow: "Editorial Journal",
    headline: "SPRING / SUMMER 2026",
    subheadline: "A visual journal of our latest ready-to-wear pieces."
  },

  lookbook: [
    {
      id: "look-01",
      title: "Look 01 — Urban Linen",
      category: "Dresses & Shirting",
      image: "assets/images/lookbook-01.svg",
      imageAlt: "Aura Studio Spring / Summer 2026 Look 01",
      description: "Washed linen wrap midi dress paired with relaxed minimalist accessories."
    },
    {
      id: "look-02",
      title: "Look 02 — Tactile Layers",
      category: "Tops & Trousers",
      image: "assets/images/lookbook-02.svg",
      imageAlt: "Aura Studio Spring / Summer 2026 Look 02",
      description: "Heavyweight boxy crewneck tee layered over pleated linen-cotton trousers."
    },
    {
      id: "look-03",
      title: "Look 03 — Neutral Form",
      category: "Jackets & Essentials",
      image: "assets/images/lookbook-03.svg",
      imageAlt: "Aura Studio Spring / Summer 2026 Look 03",
      description: "Clean canvas utility jacket combined with relaxed shirting."
    },
    {
      id: "look-04",
      title: "Look 04 — Modern Motion",
      category: "Full Ensemble",
      image: "assets/images/lookbook-04.svg",
      imageAlt: "Aura Studio Spring / Summer 2026 Look 04",
      description: "Effortless everyday styling in warm stone and chalk ivory tones."
    }
  ],

  // ----------------------------------------------------------------------------
  // 11. TESTIMONIALS / CUSTOMER REVIEWS
  // ----------------------------------------------------------------------------
  testimonialsSection: {
    eyebrow: "Customer Feedback",
    headline: "What Our Customers Say",
    subheadline: "Real impressions on fabric feel, fit, and everyday wearability."
  },

  testimonials: [
    {
      clientName: "Maya Lin",
      occasion: "Everyday Wear",
      location: "New York",
      rating: 5,
      featured: true,
      quote: "The linen wrap dress has become my go-to piece this season. The fabric is wonderfully soft, breathable, and holds its shape beautifully throughout the day."
    },
    {
      clientName: "Priya Sharma",
      occasion: "Work & Weekend",
      location: "San Francisco",
      rating: 5,
      featured: false,
      quote: "Exceptional quality for ready-to-wear clothing. The trousers fit like a dream right off the rack, and the customer team on WhatsApp answered all my sizing questions immediately."
    },
    {
      clientName: "Elena Vance",
      occasion: "Seasonal Capsule",
      location: "Chicago",
      rating: 5,
      featured: false,
      quote: "I love the clean, modern aesthetic. The poplin overshirt is perfectly proportioned—relaxed without feeling oversized. A truly understated boutique."
    }
  ],

  // ----------------------------------------------------------------------------
  // 12. CONTACT & BOUTIQUE LOCATION
  // ----------------------------------------------------------------------------
  contact: {
    boutiqueName: "AURA STUDIO Boutique",
    phoneDisplay: "+1 (555) 342-9180",
    phoneHref: "+15553429180",
    whatsappNumber: "+15553429180",
    whatsappDefaultMessage: "Hello Aura Studio! I would like to inquire about your ready-to-wear clothing.",
    email: "hello@aurastudio.com",
    address: {
      street: "142 Mercer Street",
      district: "SoHo",
      city: "New York",
      state: "NY",
      postalCode: "10012",
      fullAddress: "142 Mercer Street, SoHo, New York, NY 10012"
    },
    hours: [
      { days: "Monday – Saturday", time: "11:00 AM – 7:00 PM" },
      { days: "Sunday", time: "12:00 PM – 6:00 PM" }
    ],
    instagramHandle: "@aurastudio.boutique"
  },

  // ----------------------------------------------------------------------------
  // 13. SOCIAL LINKS
  // ----------------------------------------------------------------------------
  socialLinks: {
    instagram: "https://instagram.com/aurastudio.boutique",
    whatsapp: "https://wa.me/15553429180"
  }
};

// Freeze configuration object to prevent runtime mutations
if (typeof Object.freeze === 'function') {
  Object.freeze(SITE_CONFIG);
}
