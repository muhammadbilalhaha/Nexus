// src/utils/dummyData.js

export const initialInventory = [
  // ---------- Dairy & Eggs ----------
  {
    id: "ITM-0001",
    name: "Organic Whole Milk",
    category: "Dairy & Eggs",
    subCategory: "Milk",
    variant: "1 L",
    stock: 248,
    threshold: 40,
    purchasePrice: 2.4,
    sellingPrice: 3.8,
    status: "in-stock",
    company: "Green Valley Dairy",
    barcode: "890123450001",
    notes: "Regular replenishment",
    lastUpdated: "2026-10-07T18:33:53Z"
  },
  {
    id: "ITM-0002",
    name: "Farm Fresh Eggs",
    category: "Dairy & Eggs",
    subCategory: "Eggs",
    variant: "12 pack",
    stock: 136,
    threshold: 30,
    purchasePrice: 1.8,
    sellingPrice: 3.2,
    status: "in-stock",
    company: "Sunrise Farms",
    barcode: "890123450002",
    notes: "Weekly delivery",
    lastUpdated: "2026-10-07T18:15:00Z"
  },
  {
    id: "ITM-0004",
    name: "Greek Yogurt",
    category: "Dairy & Eggs",
    subCategory: "Yogurt",
    variant: "Plain - 250 g",
    stock: 18,
    threshold: 25,
    purchasePrice: 1.5,
    sellingPrice: 2.9,
    status: "low-stock",
    company: "Green Valley Dairy",
    barcode: "890123450004",
    notes: "",
    lastUpdated: "2026-10-07T16:41:00Z"
  },
  {
    id: "ITM-0014",
    name: "Cheddar Cheese Block",
    category: "Dairy & Eggs",
    subCategory: "Cheese",
    variant: "400 g",
    stock: 0,
    threshold: 15,
    purchasePrice: 4.2,
    sellingPrice: 7.5,
    status: "out-of-stock",
    company: "Alpine Dairy Co.",
    barcode: "890123450014",
    notes: "Pending supplier restock",
    lastUpdated: "2026-10-06T11:20:00Z"
  },

  // ---------- Bakery ----------
  {
    id: "ITM-0003",
    name: "Sourdough Bread",
    category: "Bakery",
    subCategory: "Bread",
    variant: "500 g",
    stock: 64,
    threshold: 20,
    purchasePrice: 2.1,
    sellingPrice: 4.5,
    status: "in-stock",
    company: "Artisan Bakehouse",
    barcode: "890123450003",
    notes: "",
    lastUpdated: "2026-10-07T17:59:00Z"
  },
  {
    id: "ITM-0015",
    name: "Whole Wheat Baguette",
    category: "Bakery",
    subCategory: "Bread",
    variant: "350 g",
    stock: 12,
    threshold: 15,
    purchasePrice: 1.6,
    sellingPrice: 3.4,
    status: "low-stock",
    company: "Artisan Bakehouse",
    barcode: "890123450015",
    notes: "",
    lastUpdated: "2026-10-07T17:45:00Z"
  },
  {
    id: "ITM-0016",
    name: "Blueberry Muffins",
    category: "Bakery",
    subCategory: "Pastry",
    variant: "4 pack",
    stock: 42,
    threshold: 10,
    purchasePrice: 3.0,
    sellingPrice: 5.9,
    status: "in-stock",
    company: "Sweet Corner Bakery",
    barcode: "890123450016",
    notes: "Fresh batch daily",
    lastUpdated: "2026-10-07T17:00:00Z"
  },

  // ---------- Beverages ----------
  {
    id: "ITM-0006",
    name: "Fresh Orange Juice",
    category: "Beverages",
    subCategory: "Juices",
    variant: "1 L",
    stock: 0,
    threshold: 20,
    purchasePrice: 2.7,
    sellingPrice: 4.9,
    status: "out-of-stock",
    company: "Citrus Co.",
    barcode: "890123450006",
    notes: "",
    lastUpdated: "2026-10-07T15:20:00Z"
  },
  {
    id: "ITM-0010",
    name: "Arabica Coffee Beans",
    category: "Beverages",
    subCategory: "Coffee & Tea",
    variant: "250 g",
    stock: 12,
    threshold: 20,
    purchasePrice: 5.4,
    sellingPrice: 9.9,
    status: "low-stock",
    company: "Roast Master",
    barcode: "890123450010",
    notes: "",
    lastUpdated: "2026-10-07T14:10:00Z"
  },
  {
    id: "ITM-0012",
    name: "Mango Juice",
    category: "Beverages",
    subCategory: "Juices",
    variant: "250 ml",
    stock: 8,
    threshold: 20,
    purchasePrice: 1.2,
    sellingPrice: 2.5,
    status: "low-stock",
    company: "Tropicana",
    barcode: "890123450012",
    notes: "",
    lastUpdated: "2026-10-07T14:00:00Z"
  },
  {
    id: "ITM-0017",
    name: "Green Tea Bags",
    category: "Beverages",
    subCategory: "Coffee & Tea",
    variant: "20 pack",
    stock: 88,
    threshold: 25,
    purchasePrice: 2.2,
    sellingPrice: 4.6,
    status: "in-stock",
    company: "Leaf & Co.",
    barcode: "890123450017",
    notes: "",
    lastUpdated: "2026-10-06T10:00:00Z"
  },

  // ---------- Pantry ----------
  {
    id: "ITM-0018",
    name: "Extra Virgin Olive Oil",
    category: "Pantry",
    subCategory: "Oils & Sauces",
    variant: "500 ml",
    stock: 85,
    threshold: 15,
    purchasePrice: 6.8,
    sellingPrice: 12.5,
    status: "in-stock",
    company: "Mediterranean Co.",
    barcode: "890123450018",
    notes: "Weekly delivery",
    lastUpdated: "2026-10-05T09:30:00Z"
  },
  {
    id: "ITM-0019",
    name: "Basmati Rice",
    category: "Pantry",
    subCategory: "Grains",
    variant: "1 kg",
    stock: 210,
    threshold: 50,
    purchasePrice: 3.4,
    sellingPrice: 6.2,
    status: "in-stock",
    company: "Golden Harvest",
    barcode: "890123450019",
    notes: "",
    lastUpdated: "2026-10-05T09:00:00Z"
  }
];

export const initialMovements = [
  // ==================== RECENT (Last 7 days) ====================

  // ---------- Stock In ----------
  { id: "SIN-1084", productId: "ITM-0001", type: "Stock In",   qty: 120, date: "2026-10-07T18:33:53Z", company: "Green Valley Dairy", notes: "Regular replenishment" },
  { id: "SIN-1083", productId: "ITM-0002", type: "Stock In",   qty: 80,  date: "2026-10-07T18:15:00Z", company: "Sunrise Farms",      notes: "Weekly delivery" },
  { id: "SIN-1082", productId: "ITM-0003", type: "Stock In",   qty: 50,  date: "2026-10-07T17:59:00Z", company: "Artisan Bakehouse",  notes: "" },
  { id: "SIN-1081", productId: "ITM-0004", type: "Stock In",   qty: 60,  date: "2026-10-07T16:41:00Z", company: "Green Valley Dairy", notes: "Regular replenishment" },
  { id: "SIN-1080", productId: "ITM-0010", type: "Stock In",   qty: 40,  date: "2026-10-07T14:10:00Z", company: "Roast Master",       notes: "Weekly delivery" },
  { id: "SIN-1079", productId: "ITM-0016", type: "Stock In",   qty: 60,  date: "2026-10-07T13:00:00Z", company: "Sweet Corner Bakery",notes: "Morning batch" },
  { id: "SIN-1078", productId: "ITM-0017", type: "Stock In",   qty: 100, date: "2026-10-06T10:00:00Z", company: "Leaf & Co.",         notes: "Bulk order" },
  { id: "SIN-1077", productId: "ITM-0018", type: "Stock In",   qty: 90,  date: "2026-10-05T09:30:00Z", company: "Mediterranean Co.",  notes: "Weekly delivery" },
  { id: "SIN-1076", productId: "ITM-0019", type: "Stock In",   qty: 250, date: "2026-10-05T09:00:00Z", company: "Golden Harvest",     notes: "Bulk order" },
  { id: "SIN-1075", productId: "ITM-0015", type: "Stock In",   qty: 40,  date: "2026-10-04T16:00:00Z", company: "Artisan Bakehouse",  notes: "" },

  // ---------- Stock Out (POS sales) ----------
  { id: "SOUT-2051", productId: "ITM-0001", type: "Stock Out", qty: 24, date: "2026-10-07T19:05:00Z", company: "POS Sale", notes: "Automated" },
  { id: "SOUT-2050", productId: "ITM-0002", type: "Stock Out", qty: 12, date: "2026-10-07T18:40:00Z", company: "POS Sale", notes: "Automated" },
  { id: "SOUT-2049", productId: "ITM-0003", type: "Stock Out", qty: 8,  date: "2026-10-07T17:20:00Z", company: "POS Sale", notes: "Automated" },
  { id: "SOUT-2048", productId: "ITM-0016", type: "Stock Out", qty: 6,  date: "2026-10-07T15:10:00Z", company: "POS Sale", notes: "Automated" },
  { id: "SOUT-2047", productId: "ITM-0017", type: "Stock Out", qty: 14, date: "2026-10-07T12:00:00Z", company: "POS Sale", notes: "Automated" },
  { id: "SOUT-2046", productId: "ITM-0018", type: "Stock Out", qty: 5,  date: "2026-10-06T14:30:00Z", company: "POS Sale", notes: "Automated" },
  { id: "SOUT-2045", productId: "ITM-0019", type: "Stock Out", qty: 40, date: "2026-10-06T11:00:00Z", company: "POS Sale", notes: "Automated" },
  { id: "SOUT-2044", productId: "ITM-0001", type: "Stock Out", qty: 18, date: "2026-10-05T19:20:00Z", company: "POS Sale", notes: "Automated" },

  // ---------- Adjustment ----------
  { id: "ADJ-3001", productId: "ITM-0004", type: "Adjustment", qty: -2, date: "2026-10-07T16:50:00Z", company: "—", notes: "Corrected count after physical inventory" },
  { id: "ADJ-3002", productId: "ITM-0010", type: "Adjustment", qty: 5,  date: "2026-10-07T15:30:00Z", company: "—", notes: "Recount correction" },
  { id: "ADJ-3003", productId: "ITM-0015", type: "Adjustment", qty: -3, date: "2026-10-06T13:00:00Z", company: "—", notes: "Shrinkage identified" },
  { id: "ADJ-3004", productId: "ITM-0018", type: "Adjustment", qty: 10, date: "2026-10-05T17:00:00Z", company: "—", notes: "Found extra units in storage" },

  // ---------- Damaged ----------
  { id: "DMG-4001", productId: "ITM-0003", type: "Damaged", qty: -3, date: "2026-10-07T13:00:00Z", company: "—", notes: "Dropped during unloading" },
  { id: "DMG-4002", productId: "ITM-0010", type: "Damaged", qty: -1, date: "2026-10-07T12:00:00Z", company: "—", notes: "Water damage" },
  { id: "DMG-4003", productId: "ITM-0017", type: "Damaged", qty: -4, date: "2026-10-06T10:30:00Z", company: "—", notes: "Box crushed during transit" },
  { id: "DMG-4004", productId: "ITM-0019", type: "Damaged", qty: -2, date: "2026-10-05T11:00:00Z", company: "—", notes: "Torn packaging" },

  // ---------- Expired ----------
  { id: "EXP-5001", productId: "ITM-0004", type: "Expired", qty: -4, date: "2026-10-07T10:00:00Z", company: "—", notes: "Past expiry date" },
  { id: "EXP-5002", productId: "ITM-0016", type: "Expired", qty: -2, date: "2026-10-06T09:00:00Z", company: "—", notes: "Stale pastry" },
  { id: "EXP-5003", productId: "ITM-0012", type: "Expired", qty: -3, date: "2026-10-04T08:30:00Z", company: "—", notes: "Past best-before date" },

  // ==================== 3 WEEKS AGO (Sep 15, 2026) ====================
  // Only visible with "Last 30 days", "Last 3 months", "Last 6 months", "Last 1 year"

  { id: "SIN-1060", productId: "ITM-0001", type: "Stock In",   qty: 150, date: "2026-09-15T10:00:00Z", company: "Green Valley Dairy", notes: "Monthly bulk order" },
  { id: "SIN-1061", productId: "ITM-0018", type: "Stock In",   qty: 60,  date: "2026-09-15T11:00:00Z", company: "Mediterranean Co.",  notes: "" },
  { id: "SOUT-2030", productId: "ITM-0002", type: "Stock Out", qty: 20,  date: "2026-09-15T15:00:00Z", company: "POS Sale",           notes: "Automated" },

  // ==================== 2 MONTHS AGO (Aug 10, 2026) ====================
  // Only visible with "Last 3 months", "Last 6 months", "Last 1 year"

  { id: "SIN-1040", productId: "ITM-0019", type: "Stock In",   qty: 300, date: "2026-08-10T09:00:00Z", company: "Golden Harvest",     notes: "Quarterly stock" },
  { id: "SOUT-2020", productId: "ITM-0010", type: "Stock Out", qty: 30,  date: "2026-08-10T14:00:00Z", company: "POS Sale",           notes: "Automated" },
  { id: "ADJ-3010",  productId: "ITM-0018", type: "Adjustment", qty: -5, date: "2026-08-10T16:00:00Z", company: "—",                  notes: "Recount correction" },

  // ==================== 5 MONTHS AGO (May 20, 2026) ====================
  // Only visible with "Last 6 months", "Last 1 year"

  { id: "SIN-1020", productId: "ITM-0004", type: "Stock In",   qty: 80,  date: "2026-05-20T09:30:00Z", company: "Green Valley Dairy", notes: "Bulk order" },
  { id: "DMG-4010", productId: "ITM-0003", type: "Damaged",    qty: -5,  date: "2026-05-20T11:00:00Z", company: "—",                  notes: "Long-term storage damage" },

  // ==================== 10 MONTHS AGO (Dec 15, 2025) ====================
  // Only visible with "Last 1 year"

  { id: "SIN-1000", productId: "ITM-0019", type: "Stock In",   qty: 400, date: "2025-12-15T09:00:00Z", company: "Golden Harvest",     notes: "Year-end bulk purchase" },
  { id: "EXP-5010", productId: "ITM-0004", type: "Expired",    qty: -6,  date: "2025-12-15T12:00:00Z", company: "—",                  notes: "Expired batch found in storage" }
];