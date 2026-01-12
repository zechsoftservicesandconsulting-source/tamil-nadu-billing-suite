// Customization Defaults for Universal Billing Software

export interface InvoiceCustomization {
  showLogo: boolean;
  showGstin: boolean;
  showAddress: boolean;
  showMobile: boolean;
  showEmail: boolean;
  showHsnCode: boolean;
  showBarcode: boolean;
  showDiscount: boolean;
  showRoundOff: boolean;
  showPaymentMode: boolean;
  showFooter: boolean;
  showSignature: boolean;
  showQrCode: boolean;
  showTerms: boolean;
  invoiceTitle: string;
  invoiceTitleTamil: string;
  termsText: string;
  format: 'thermal' | 'a4' | 'a5';
  fontSize: 'small' | 'medium' | 'large';
}

export interface BillingCustomization {
  enableGst: boolean;
  defaultGstPercent: number;
  enableDiscount: boolean;
  enableRoundOff: boolean;
  roundOffTo: 'none' | 'nearest' | 'up' | 'down';
  enablePartialPayment: boolean;
  enableCreditSales: boolean;
  showMrp: boolean;
  showStock: boolean;
  showProductImage: boolean;
  quickQuantities: number[];
  defaultPaymentMode: string;
  printAfterSale: boolean;
  confirmBeforeSale: boolean;
  enableNegativeStock: boolean;
  enableBarcodeScanner: boolean;
}

export interface ProductFieldsCustomization {
  showTamilName: boolean;
  showHsnCode: boolean;
  showBarcode: boolean;
  showMrp: boolean;
  showGst: boolean;
  showStock: boolean;
  showUnit: boolean;
  showLowStockThreshold: boolean;
  showBatchNumber: boolean;
  showExpiryDate: boolean;
  showManufacturer: boolean;
  showSupplier: boolean;
  customFields: { name: string; nameTamil: string; type: 'text' | 'number' | 'date' | 'select'; options?: string[] }[];
}

export interface CustomerFieldsCustomization {
  showEmail: boolean;
  showAddress: boolean;
  showGstin: boolean;
  showCreditLimit: boolean;
  showLoyaltyPoints: boolean;
  showBirthday: boolean;
  showNotes: boolean;
  customFields: { name: string; nameTamil: string; type: 'text' | 'number' | 'date' | 'select'; options?: string[] }[];
}

export interface DashboardCustomization {
  showTodaySales: boolean;
  showMonthSales: boolean;
  showYearSales: boolean;
  showPendingDues: boolean;
  showTotalBills: boolean;
  showSalesChart: boolean;
  showHourlyChart: boolean;
  showTopSelling: boolean;
  showLowStock: boolean;
  showGstSummary: boolean;
  showRecentBills: boolean;
  showQuickActions: boolean;
  chartType: 'area' | 'bar' | 'line';
  cardLayout: 'grid' | 'list';
}

export interface TableColumnsCustomization {
  products: string[];
  customers: string[];
  bills: string[];
  expenses: string[];
  purchases: string[];
  stock: string[];
}

export interface AppearanceCustomization {
  primaryColor: string;
  accentColor: string;
  fontFamily: 'inter' | 'noto-sans-tamil' | 'roboto' | 'poppins';
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  borderRadius: 'none' | 'small' | 'medium' | 'large';
  sidebarPosition: 'left' | 'right';
  sidebarCollapsed: boolean;
  compactMode: boolean;
  showAnimations: boolean;
  showTooltips: boolean;
  numberFormat: 'indian' | 'international';
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
  currencySymbol: '₹' | 'Rs.' | 'INR';
  currencyPosition: 'before' | 'after';
}

export interface TaxCustomization {
  enableGst: boolean;
  gstRates: number[];
  defaultGstRate: number;
  showGstBreakup: boolean;
  inclusiveGst: boolean;
  enableCess: boolean;
  cessPercent: number;
}

export interface NotificationCustomization {
  enableLowStockAlert: boolean;
  lowStockThreshold: number;
  enableDueReminder: boolean;
  dueReminderDays: number;
  enableDailySummary: boolean;
  enableSoundEffects: boolean;
  enableEmailNotifications: boolean;
}

export interface PaymentModesCustomization {
  modes: {
    id: string;
    name: string;
    nameTamil: string;
    icon: string;
    enabled: boolean;
    isDefault: boolean;
  }[];
}

export interface UnitsCustomization {
  units: {
    id: string;
    name: string;
    nameTamil: string;
    symbol: string;
    enabled: boolean;
  }[];
}

export interface CategoriesCustomization {
  productCategories: {
    id: string;
    name: string;
    nameTamil: string;
    icon: string;
    enabled: boolean;
    color: string;
  }[];
  expenseCategories: {
    id: string;
    name: string;
    nameTamil: string;
    icon: string;
    enabled: boolean;
  }[];
}

export interface CustomizationSettings {
  invoice: InvoiceCustomization;
  billing: BillingCustomization;
  productFields: ProductFieldsCustomization;
  customerFields: CustomerFieldsCustomization;
  dashboard: DashboardCustomization;
  tableColumns: TableColumnsCustomization;
  appearance: AppearanceCustomization;
  tax: TaxCustomization;
  notifications: NotificationCustomization;
  paymentModes: PaymentModesCustomization;
  units: UnitsCustomization;
  categories: CategoriesCustomization;
}

export const defaultInvoiceCustomization: InvoiceCustomization = {
  showLogo: true,
  showGstin: true,
  showAddress: true,
  showMobile: true,
  showEmail: false,
  showHsnCode: true,
  showBarcode: false,
  showDiscount: true,
  showRoundOff: true,
  showPaymentMode: true,
  showFooter: true,
  showSignature: false,
  showQrCode: false,
  showTerms: true,
  invoiceTitle: 'Tax Invoice',
  invoiceTitleTamil: 'வரி விலைப்பட்டியல்',
  termsText: 'Goods once sold will not be taken back. Subject to Tamil Nadu jurisdiction.',
  format: 'thermal',
  fontSize: 'medium',
};

export const defaultBillingCustomization: BillingCustomization = {
  enableGst: true,
  defaultGstPercent: 5,
  enableDiscount: true,
  enableRoundOff: true,
  roundOffTo: 'nearest',
  enablePartialPayment: true,
  enableCreditSales: true,
  showMrp: true,
  showStock: true,
  showProductImage: false,
  quickQuantities: [1, 2, 5, 10],
  defaultPaymentMode: 'cash',
  printAfterSale: false,
  confirmBeforeSale: false,
  enableNegativeStock: false,
  enableBarcodeScanner: true,
};

export const defaultProductFieldsCustomization: ProductFieldsCustomization = {
  showTamilName: true,
  showHsnCode: true,
  showBarcode: true,
  showMrp: true,
  showGst: true,
  showStock: true,
  showUnit: true,
  showLowStockThreshold: true,
  showBatchNumber: false,
  showExpiryDate: false,
  showManufacturer: false,
  showSupplier: false,
  customFields: [],
};

export const defaultCustomerFieldsCustomization: CustomerFieldsCustomization = {
  showEmail: true,
  showAddress: true,
  showGstin: true,
  showCreditLimit: true,
  showLoyaltyPoints: false,
  showBirthday: false,
  showNotes: false,
  customFields: [],
};

export const defaultDashboardCustomization: DashboardCustomization = {
  showTodaySales: true,
  showMonthSales: true,
  showYearSales: false,
  showPendingDues: true,
  showTotalBills: true,
  showSalesChart: true,
  showHourlyChart: true,
  showTopSelling: true,
  showLowStock: true,
  showGstSummary: true,
  showRecentBills: true,
  showQuickActions: true,
  chartType: 'area',
  cardLayout: 'grid',
};

export const defaultTableColumnsCustomization: TableColumnsCustomization = {
  products: ['name', 'category', 'price', 'gst', 'stock', 'status', 'actions'],
  customers: ['name', 'mobile', 'type', 'outstanding', 'totalPurchases', 'actions'],
  bills: ['billNumber', 'customer', 'date', 'amount', 'status'],
  expenses: ['date', 'category', 'description', 'amount', 'paymentMode'],
  purchases: ['date', 'supplier', 'amount', 'status'],
  stock: ['product', 'category', 'stock', 'value', 'status'],
};

export const defaultAppearanceCustomization: AppearanceCustomization = {
  primaryColor: '#4f46e5',
  accentColor: '#f97316',
  fontFamily: 'inter',
  fontSize: 'medium',
  borderRadius: 'medium',
  sidebarPosition: 'left',
  sidebarCollapsed: false,
  compactMode: false,
  showAnimations: true,
  showTooltips: true,
  numberFormat: 'indian',
  dateFormat: 'DD/MM/YYYY',
  currencySymbol: '₹',
  currencyPosition: 'before',
};

export const defaultTaxCustomization: TaxCustomization = {
  enableGst: true,
  gstRates: [0, 5, 12, 18, 28],
  defaultGstRate: 5,
  showGstBreakup: true,
  inclusiveGst: false,
  enableCess: false,
  cessPercent: 0,
};

export const defaultNotificationCustomization: NotificationCustomization = {
  enableLowStockAlert: true,
  lowStockThreshold: 10,
  enableDueReminder: true,
  dueReminderDays: 7,
  enableDailySummary: false,
  enableSoundEffects: true,
  enableEmailNotifications: false,
};

export const defaultPaymentModesCustomization: PaymentModesCustomization = {
  modes: [
    { id: 'cash', name: 'Cash', nameTamil: 'பணம்', icon: '💵', enabled: true, isDefault: true },
    { id: 'upi', name: 'UPI', nameTamil: 'UPI', icon: '📱', enabled: true, isDefault: false },
    { id: 'card', name: 'Card', nameTamil: 'கார்டு', icon: '💳', enabled: true, isDefault: false },
    { id: 'bank', name: 'Bank Transfer', nameTamil: 'வங்கி பரிமாற்றம்', icon: '🏦', enabled: true, isDefault: false },
    { id: 'credit', name: 'Credit', nameTamil: 'கடன்', icon: '📝', enabled: true, isDefault: false },
    { id: 'cheque', name: 'Cheque', nameTamil: 'காசோலை', icon: '📄', enabled: false, isDefault: false },
  ],
};

export const defaultUnitsCustomization: UnitsCustomization = {
  units: [
    { id: 'pcs', name: 'Pieces', nameTamil: 'துண்டுகள்', symbol: 'pcs', enabled: true },
    { id: 'kg', name: 'Kilogram', nameTamil: 'கிலோ', symbol: 'kg', enabled: true },
    { id: 'g', name: 'Gram', nameTamil: 'கிராம்', symbol: 'g', enabled: true },
    { id: 'l', name: 'Litre', nameTamil: 'லிட்டர்', symbol: 'L', enabled: true },
    { id: 'ml', name: 'Millilitre', nameTamil: 'மில்லி', symbol: 'ml', enabled: true },
    { id: 'm', name: 'Metre', nameTamil: 'மீட்டர்', symbol: 'm', enabled: false },
    { id: 'cm', name: 'Centimetre', nameTamil: 'சென்டி மீட்டர்', symbol: 'cm', enabled: false },
    { id: 'box', name: 'Box', nameTamil: 'பெட்டி', symbol: 'box', enabled: true },
    { id: 'pack', name: 'Pack', nameTamil: 'பேக்', symbol: 'pack', enabled: true },
    { id: 'dozen', name: 'Dozen', nameTamil: 'டஜன்', symbol: 'dz', enabled: true },
  ],
};

export const defaultCategoriesCustomization: CategoriesCustomization = {
  productCategories: [
    { id: 'groceries', name: 'Groceries', nameTamil: 'மளிகை பொருட்கள்', icon: '🛒', enabled: true, color: '#22c55e' },
    { id: 'dairy', name: 'Dairy', nameTamil: 'பால் பொருட்கள்', icon: '🥛', enabled: true, color: '#3b82f6' },
    { id: 'personal-care', name: 'Personal Care', nameTamil: 'தனிப்பட்ட பராமரிப்பு', icon: '🧴', enabled: true, color: '#ec4899' },
    { id: 'household', name: 'Household', nameTamil: 'வீட்டு பொருட்கள்', icon: '🏠', enabled: true, color: '#f97316' },
    { id: 'snacks', name: 'Snacks', nameTamil: 'தின்பண்டங்கள்', icon: '🍪', enabled: true, color: '#eab308' },
    { id: 'beverages', name: 'Beverages', nameTamil: 'பானங்கள்', icon: '☕', enabled: true, color: '#8b5cf6' },
    { id: 'ready-to-cook', name: 'Ready to Cook', nameTamil: 'சமைக்க தயார்', icon: '🍳', enabled: true, color: '#ef4444' },
    { id: 'medicines', name: 'Medicines', nameTamil: 'மருந்துகள்', icon: '💊', enabled: false, color: '#06b6d4' },
    { id: 'electronics', name: 'Electronics', nameTamil: 'மின்னணு சாதனங்கள்', icon: '📱', enabled: false, color: '#6366f1' },
    { id: 'stationery', name: 'Stationery', nameTamil: 'எழுது பொருட்கள்', icon: '📝', enabled: false, color: '#14b8a6' },
  ],
  expenseCategories: [
    { id: 'rent', name: 'Rent', nameTamil: 'வாடகை', icon: '🏪', enabled: true },
    { id: 'electricity', name: 'Electricity', nameTamil: 'மின்சாரம்', icon: '⚡', enabled: true },
    { id: 'salary', name: 'Staff Salary', nameTamil: 'ஊழியர் சம்பளம்', icon: '👥', enabled: true },
    { id: 'transport', name: 'Transport', nameTamil: 'போக்குவரத்து', icon: '🚛', enabled: true },
    { id: 'maintenance', name: 'Maintenance', nameTamil: 'பராமரிப்பு', icon: '🔧', enabled: true },
    { id: 'misc', name: 'Miscellaneous', nameTamil: 'இதர செலவுகள்', icon: '📦', enabled: true },
    { id: 'internet', name: 'Internet', nameTamil: 'இணையம்', icon: '🌐', enabled: false },
    { id: 'insurance', name: 'Insurance', nameTamil: 'காப்பீடு', icon: '🛡️', enabled: false },
    { id: 'taxes', name: 'Taxes', nameTamil: 'வரிகள்', icon: '📋', enabled: false },
  ],
};

export const defaultCustomizationSettings: CustomizationSettings = {
  invoice: defaultInvoiceCustomization,
  billing: defaultBillingCustomization,
  productFields: defaultProductFieldsCustomization,
  customerFields: defaultCustomerFieldsCustomization,
  dashboard: defaultDashboardCustomization,
  tableColumns: defaultTableColumnsCustomization,
  appearance: defaultAppearanceCustomization,
  tax: defaultTaxCustomization,
  notifications: defaultNotificationCustomization,
  paymentModes: defaultPaymentModesCustomization,
  units: defaultUnitsCustomization,
  categories: defaultCategoriesCustomization,
};

// Color Palette Options
export const colorPalettes = [
  { name: 'Indigo', primary: '#4f46e5', accent: '#f97316' },
  { name: 'Blue', primary: '#2563eb', accent: '#f59e0b' },
  { name: 'Green', primary: '#16a34a', accent: '#ef4444' },
  { name: 'Purple', primary: '#9333ea', accent: '#14b8a6' },
  { name: 'Rose', primary: '#e11d48', accent: '#0ea5e9' },
  { name: 'Amber', primary: '#d97706', accent: '#6366f1' },
  { name: 'Teal', primary: '#0d9488', accent: '#f43f5e' },
  { name: 'Slate', primary: '#475569', accent: '#22c55e' },
];

// Font Options
export const fontOptions = [
  { id: 'inter', name: 'Inter', sample: 'Modern & Clean' },
  { id: 'noto-sans-tamil', name: 'Noto Sans Tamil', sample: 'தமிழ் எழுத்துரு' },
  { id: 'roboto', name: 'Roboto', sample: 'Classic & Readable' },
  { id: 'poppins', name: 'Poppins', sample: 'Friendly & Geometric' },
];
