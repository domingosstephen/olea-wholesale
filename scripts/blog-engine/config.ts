/**
 * Blog Engine Configuration — Olea Wholesale
 *
 * Topic clusters, keyword targets, and content strategy
 * for weekly blog post generation optimized for SEO, AEO, and GEO.
 */

import type { BlogCategory, BlogAuthor } from '../../types/blog'

// ---------------------------------------------------------------------------
// Authors — rotate for E-E-A-T diversity
// ---------------------------------------------------------------------------
export const AUTHORS: BlogAuthor[] = [
  {
    name: 'Stephano Leonessi',
    title: 'Founder & Managing Director at Olea Wholesale',
    bio: 'Stephano has over 15 years of experience in international commodities trading and supply chain management for edible oils. He founded Olea Wholesale to bring transparency and reliability to the global bulk cooking oil supply chain.',
  },
  {
    name: 'Maria Santos',
    title: 'Head of Supply Chain at Olea Wholesale',
    bio: 'Maria oversees sourcing and logistics across 12+ origin countries. A former logistics director at a Fortune 500 food manufacturer, she coordinates shipments to 40+ markets worldwide.',
  },
  {
    name: 'Ahmed Al-Rashid',
    title: 'Head of Quality Assurance at Olea Wholesale',
    bio: 'Ahmed holds a PhD in Food Science and spent 10+ years as an ISO auditor specializing in edible oils QA. He ensures every batch meets ISO 22000 and international food safety standards.',
  },
]

// ---------------------------------------------------------------------------
// Competitor sites for content gap analysis
// ---------------------------------------------------------------------------
export const COMPETITORS = [
  'https://www.oilworld.biz',
  'https://www.aak.com',
  'https://www.bunge.com',
  'https://www.cargill.com/food-beverage/edible-oils',
  'https://www.wilmar-international.com',
]

// ---------------------------------------------------------------------------
// Topic clusters — organized by category with keyword targets
// ---------------------------------------------------------------------------
export interface TopicCluster {
  category: BlogCategory
  topics: TopicSeed[]
}

export interface TopicSeed {
  title: string
  primaryKeyword: string
  secondaryKeywords: string[]
  searchIntent: 'informational' | 'commercial' | 'transactional' | 'navigational'
  targetRegions: string[]
  priority: 1 | 2 | 3
  aiQueryTargets: string[]
}

export const TOPIC_CLUSTERS: TopicCluster[] = [
  // =========================================================================
  // CLUSTER 1: Product Guides (highest commercial intent)
  // =========================================================================
  {
    category: 'product-guide',
    topics: [
      {
        title: 'Refined vs Crude Sunflower Oil: Which One Does Your Operation Need?',
        primaryKeyword: 'refined vs crude sunflower oil',
        secondaryKeywords: ['sunflower oil grades', 'high oleic sunflower oil', 'sunflower oil for frying', 'crude sunflower oil specifications'],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['What is the difference between refined and crude sunflower oil?', 'Which sunflower oil is best for industrial frying?'],
      },
      {
        title: 'Complete Guide to Palm Oil Grades: CPO, RBD, and Olein Explained',
        primaryKeyword: 'palm oil grades explained',
        secondaryKeywords: ['crude palm oil vs refined', 'RBD palm oil', 'palm olein for cooking', 'palm oil specifications'],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['What are the different grades of palm oil?', 'What is RBD palm oil?'],
      },
      {
        title: 'High-Oleic Oils for Industrial Frying: Performance, Stability, and Cost',
        primaryKeyword: 'high oleic oil industrial frying',
        secondaryKeywords: ['frying oil oxidative stability', 'best oil for deep frying industrial', 'high oleic sunflower vs canola'],
        searchIntent: 'commercial',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['What is the best oil for industrial deep frying?', 'Why use high oleic oil for frying?'],
      },
      {
        title: 'Used Cooking Oil (UCO) for Biodiesel: Specifications, Sourcing, and Market',
        primaryKeyword: 'used cooking oil biodiesel',
        secondaryKeywords: ['UCO specifications', 'used cooking oil supplier', 'UCO for biofuel', 'waste cooking oil market'],
        searchIntent: 'commercial',
        targetRegions: ['Europe', 'Global'],
        priority: 2,
        aiQueryTargets: ['What is UCO used for?', 'What specifications does UCO need for biodiesel?'],
      },
      {
        title: 'Non-GMO Canola Oil: Why Food Manufacturers Are Switching',
        primaryKeyword: 'non-GMO canola oil bulk',
        secondaryKeywords: ['canola oil non-GMO certification', 'expeller pressed canola oil', 'canola oil food manufacturing'],
        searchIntent: 'commercial',
        targetRegions: ['North America', 'Europe'],
        priority: 2,
        aiQueryTargets: ['Is non-GMO canola oil better?', 'Where to buy non-GMO canola oil in bulk?'],
      },
    ],
  },

  // =========================================================================
  // CLUSTER 2: Buying Guides
  // =========================================================================
  {
    category: 'buying-guide',
    topics: [
      {
        title: 'How to Choose a Bulk Cooking Oil Supplier: 7 Critical Factors',
        primaryKeyword: 'how to choose bulk cooking oil supplier',
        secondaryKeywords: ['wholesale cooking oil supplier', 'bulk oil supplier checklist', 'cooking oil procurement', 'B2B oil supplier'],
        searchIntent: 'commercial',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['How do I find a reliable bulk cooking oil supplier?', 'What should I look for in a wholesale oil supplier?'],
      },
      {
        title: 'Bulk Cooking Oil Price Guide: What Drives Costs and How to Save',
        primaryKeyword: 'bulk cooking oil prices',
        secondaryKeywords: ['wholesale cooking oil cost', 'cooking oil commodity prices', 'edible oil price factors', 'volume pricing cooking oil'],
        searchIntent: 'commercial',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['How much does bulk cooking oil cost?', 'What affects cooking oil prices?'],
      },
      {
        title: 'Sunflower Oil vs Canola Oil vs Soybean Oil: Choosing the Right Bulk Oil',
        primaryKeyword: 'sunflower oil vs canola oil vs soybean oil',
        secondaryKeywords: ['best bulk cooking oil', 'cooking oil comparison industrial', 'cheapest bulk cooking oil'],
        searchIntent: 'commercial',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['Which cooking oil is best for industrial use?', 'What is the cheapest bulk cooking oil?'],
      },
      {
        title: 'Certificate of Analysis (COA) for Edible Oils: How to Read and Verify',
        primaryKeyword: 'certificate of analysis edible oil',
        secondaryKeywords: ['COA cooking oil', 'oil quality specifications', 'free fatty acid limits', 'peroxide value edible oil'],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 2,
        aiQueryTargets: ['What is a certificate of analysis for cooking oil?', 'How to read an oil COA?'],
      },
    ],
  },

  // =========================================================================
  // CLUSTER 3: Shipping & Logistics
  // =========================================================================
  {
    category: 'shipping',
    topics: [
      {
        title: 'Flexitank vs IBC vs Drum: Best Container for Shipping Bulk Edible Oil',
        primaryKeyword: 'flexitank vs IBC shipping oil',
        secondaryKeywords: ['bulk oil container options', 'flexitank edible oil', 'IBC tote cooking oil', 'oil shipping containers'],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['What is the best way to ship bulk cooking oil?', 'What is a flexitank for edible oil?'],
      },
      {
        title: 'Shipping Documentation for Bulk Edible Oils: Complete Checklist',
        primaryKeyword: 'shipping documentation edible oil',
        secondaryKeywords: ['bill of lading edible oil', 'phytosanitary certificate oil', 'export documents cooking oil'],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['What documents are needed to ship edible oil internationally?'],
      },
      {
        title: 'CIF vs FOB for Edible Oil Imports: Which Incoterm Is Right for You?',
        primaryKeyword: 'CIF vs FOB edible oil',
        secondaryKeywords: ['incoterms cooking oil', 'FOB oil trading', 'CIF delivered price oil'],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 2,
        aiQueryTargets: ['What is the difference between CIF and FOB for oil imports?'],
      },
    ],
  },

  // =========================================================================
  // CLUSTER 4: Market Insights
  // =========================================================================
  {
    category: 'market-insight',
    topics: [
      {
        title: 'Global Edible Oil Market Trends: Prices, Supply, and Demand Forecast',
        primaryKeyword: 'edible oil market trends',
        secondaryKeywords: ['cooking oil price forecast', 'vegetable oil market analysis', 'palm oil price trends', 'sunflower oil market'],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['What are the current trends in the edible oil market?', 'Will cooking oil prices go up or down?'],
      },
      {
        title: 'Ukraine Sunflower Oil Supply: Impact on Global Markets and Alternatives',
        primaryKeyword: 'Ukraine sunflower oil supply',
        secondaryKeywords: ['Ukraine cooking oil exports', 'sunflower oil shortage', 'alternative to Ukrainian sunflower oil'],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['How does the Ukraine conflict affect sunflower oil supply?', 'Is there a sunflower oil shortage?'],
      },
      {
        title: 'Palm Oil Price Drivers: RSPO, Indonesian Export Levy, and El Nino',
        primaryKeyword: 'palm oil price drivers',
        secondaryKeywords: ['palm oil export levy Indonesia', 'RSPO premium', 'palm oil supply forecast'],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 2,
        aiQueryTargets: ['Why are palm oil prices rising?', 'What affects palm oil prices?'],
      },
    ],
  },

  // =========================================================================
  // CLUSTER 5: Sustainability & Certification
  // =========================================================================
  {
    category: 'sustainability',
    topics: [
      {
        title: 'RSPO Certification for Palm Oil: What Buyers Need to Know',
        primaryKeyword: 'RSPO certification palm oil',
        secondaryKeywords: ['sustainable palm oil', 'RSPO certified supplier', 'deforestation-free palm oil'],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['What is RSPO certification?', 'How do I buy RSPO certified palm oil?'],
      },
      {
        title: 'EU Organic Certification for Edible Oils: Requirements and Benefits',
        primaryKeyword: 'EU organic certification edible oil',
        secondaryKeywords: ['organic cooking oil bulk', 'organic sunflower oil wholesale', 'EU organic standards food'],
        searchIntent: 'informational',
        targetRegions: ['Europe'],
        priority: 2,
        aiQueryTargets: ['What does EU organic certification mean for cooking oil?'],
      },
    ],
  },

  // =========================================================================
  // CLUSTER 6: Regulation & Compliance
  // =========================================================================
  {
    category: 'regulation',
    topics: [
      {
        title: 'ISO 22000 for Edible Oil Suppliers: What It Means for Your Supply Chain',
        primaryKeyword: 'ISO 22000 edible oil',
        secondaryKeywords: ['food safety management cooking oil', 'ISO certification oil supplier', 'HACCP edible oils'],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['What is ISO 22000 certification for food?', 'Why is ISO 22000 important for oil suppliers?'],
      },
      {
        title: 'EU Deforestation Regulation (EUDR): Impact on Palm Oil and Soy Oil Trade',
        primaryKeyword: 'EUDR palm oil regulation',
        secondaryKeywords: ['EU deforestation regulation cooking oil', 'EUDR compliance edible oil', 'deforestation-free supply chain'],
        searchIntent: 'informational',
        targetRegions: ['Europe'],
        priority: 1,
        aiQueryTargets: ['What is the EU Deforestation Regulation?', 'How does EUDR affect palm oil imports?'],
      },
    ],
  },

  // =========================================================================
  // CLUSTER 7: How-To Guides
  // =========================================================================
  {
    category: 'how-to',
    topics: [
      {
        title: 'How to Test Cooking Oil Quality: Lab Methods and Field Checks',
        primaryKeyword: 'how to test cooking oil quality',
        secondaryKeywords: ['oil quality testing methods', 'FFA test cooking oil', 'peroxide value test', 'oil freshness check'],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['How do you test the quality of cooking oil?', 'What is a peroxide value test?'],
      },
      {
        title: 'How to Store Bulk Cooking Oil: Temperature, Light, and Shelf Life',
        primaryKeyword: 'how to store bulk cooking oil',
        secondaryKeywords: ['cooking oil storage temperature', 'oil shelf life bulk', 'edible oil storage best practices'],
        searchIntent: 'informational',
        targetRegions: ['Global'],
        priority: 2,
        aiQueryTargets: ['How should bulk cooking oil be stored?', 'What is the shelf life of cooking oil?'],
      },
    ],
  },

  // =========================================================================
  // CLUSTER 8: Comparisons (high AI citation rate)
  // =========================================================================
  {
    category: 'comparison',
    topics: [
      {
        title: 'Palm Oil vs Sunflower Oil for Food Manufacturing: Full Comparison',
        primaryKeyword: 'palm oil vs sunflower oil',
        secondaryKeywords: ['palm oil sunflower oil comparison', 'best oil for food manufacturing', 'palm oil alternative'],
        searchIntent: 'commercial',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['Is palm oil or sunflower oil better for food manufacturing?', 'Can sunflower oil replace palm oil?'],
      },
      {
        title: 'Soybean Oil vs Canola Oil: Cost, Performance, and Health Comparison',
        primaryKeyword: 'soybean oil vs canola oil',
        secondaryKeywords: ['cheapest cooking oil bulk', 'soybean oil vs canola for frying', 'industrial cooking oil comparison'],
        searchIntent: 'commercial',
        targetRegions: ['Global'],
        priority: 1,
        aiQueryTargets: ['Is soybean oil or canola oil cheaper?', 'Soybean oil vs canola oil for frying?'],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Content generation settings
// ---------------------------------------------------------------------------
export const GENERATION_CONFIG = {
  /** Number of articles to generate per run */
  articlesPerRun: 3,

  /** Minimum word count per article */
  minWordCount: 1800,

  /** Maximum word count per article */
  maxWordCount: 3000,

  /** Number of FAQ items to include per article */
  faqItemsPerArticle: 5,
}
