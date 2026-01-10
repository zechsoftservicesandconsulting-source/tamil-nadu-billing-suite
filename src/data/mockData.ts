// Universal Billing Software - Tamil Nadu
// Complete Mock Data for Demo

export interface Product {
  id: string;
  name: string;
  nameTamil: string;
  category: string;
  price: number;
  mrp: number;
  gstPercent: number;
  hsnCode: string;
  stock: number;
  unit: string;
  barcode: string;
  lowStockThreshold: number;
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  address?: string;
  gstin?: string;
  type: 'retail' | 'wholesale' | 'credit';
  creditLimit: number;
  outstandingBalance: number;
  totalPurchases: number;
  lastPurchaseDate: string;
}

export interface Bill {
  id: string;
  billNumber: string;
  date: string;
  customerId: string;
  customerName: string;
  items: BillItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  discount: number;
  roundOff: number;
  total: number;
  paymentMode: string;
  status: 'paid' | 'pending' | 'partial';
  paidAmount: number;
}

export interface BillItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  gstPercent: number;
  discount: number;
  total: number;
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  paymentMode: string;
}

export interface Staff {
  id: string;
  name: string;
  mobile: string;
  role: 'owner' | 'manager' | 'cashier' | 'accountant';
  email: string;
  isActive: boolean;
  salesCount: number;
  totalSales: number;
}

export interface BusinessProfile {
  businessName: string;
  ownerName: string;
  mobile: string;
  email: string;
  category: string;
  gstin: string;
  address: string;
  state: string;
  district: string;
  pincode: string;
  logo?: string;
  invoiceFooter: string;
  financialYear: string;
}

// Products - Tamil Nadu Style Names
export const mockProducts: Product[] = [
  {
    id: 'P001',
    name: 'Basmati Rice (1kg)',
    nameTamil: 'பாஸ்மதி அரிசி (1கிலோ)',
    category: 'Groceries',
    price: 120,
    mrp: 140,
    gstPercent: 5,
    hsnCode: '1006',
    stock: 150,
    unit: 'kg',
    barcode: '8901234567890',
    lowStockThreshold: 20,
    isActive: true,
  },
  {
    id: 'P002',
    name: 'Toor Dal (1kg)',
    nameTamil: 'துவரம் பருப்பு (1கிலோ)',
    category: 'Groceries',
    price: 145,
    mrp: 160,
    gstPercent: 5,
    hsnCode: '0713',
    stock: 80,
    unit: 'kg',
    barcode: '8901234567891',
    lowStockThreshold: 15,
    isActive: true,
  },
  {
    id: 'P003',
    name: 'Sunflower Oil (1L)',
    nameTamil: 'சூரியகாந்தி எண்ணெய் (1L)',
    category: 'Groceries',
    price: 135,
    mrp: 150,
    gstPercent: 5,
    hsnCode: '1512',
    stock: 60,
    unit: 'L',
    barcode: '8901234567892',
    lowStockThreshold: 10,
    isActive: true,
  },
  {
    id: 'P004',
    name: 'Mysore Sandal Soap',
    nameTamil: 'மைசூர் சந்தன சோப்பு',
    category: 'Personal Care',
    price: 52,
    mrp: 55,
    gstPercent: 18,
    hsnCode: '3401',
    stock: 200,
    unit: 'pcs',
    barcode: '8901234567893',
    lowStockThreshold: 25,
    isActive: true,
  },
  {
    id: 'P005',
    name: 'Aashirvaad Atta (5kg)',
    nameTamil: 'ஆசீர்வாத் ஆட்டா (5கிலோ)',
    category: 'Groceries',
    price: 280,
    mrp: 300,
    gstPercent: 5,
    hsnCode: '1101',
    stock: 45,
    unit: 'kg',
    barcode: '8901234567894',
    lowStockThreshold: 10,
    isActive: true,
  },
  {
    id: 'P006',
    name: 'Amul Butter (500g)',
    nameTamil: 'அமுல் வெண்ணெய் (500g)',
    category: 'Dairy',
    price: 280,
    mrp: 295,
    gstPercent: 12,
    hsnCode: '0405',
    stock: 30,
    unit: 'pcs',
    barcode: '8901234567895',
    lowStockThreshold: 8,
    isActive: true,
  },
  {
    id: 'P007',
    name: 'Parle-G Biscuits',
    nameTamil: 'பார்லே-ஜி பிஸ்கட்',
    category: 'Snacks',
    price: 10,
    mrp: 10,
    gstPercent: 18,
    hsnCode: '1905',
    stock: 500,
    unit: 'pcs',
    barcode: '8901234567896',
    lowStockThreshold: 50,
    isActive: true,
  },
  {
    id: 'P008',
    name: 'Colgate Toothpaste (200g)',
    nameTamil: 'கோல்கேட் டூத்பேஸ்ட் (200g)',
    category: 'Personal Care',
    price: 115,
    mrp: 120,
    gstPercent: 18,
    hsnCode: '3306',
    stock: 75,
    unit: 'pcs',
    barcode: '8901234567897',
    lowStockThreshold: 15,
    isActive: true,
  },
  {
    id: 'P009',
    name: 'Surf Excel (1kg)',
    nameTamil: 'சர்ஃப் எக்செல் (1கிலோ)',
    category: 'Household',
    price: 180,
    mrp: 195,
    gstPercent: 18,
    hsnCode: '3402',
    stock: 40,
    unit: 'kg',
    barcode: '8901234567898',
    lowStockThreshold: 10,
    isActive: true,
  },
  {
    id: 'P010',
    name: 'Filter Coffee Powder (500g)',
    nameTamil: 'பில்டர் காபி (500g)',
    category: 'Beverages',
    price: 320,
    mrp: 350,
    gstPercent: 5,
    hsnCode: '0901',
    stock: 25,
    unit: 'pcs',
    barcode: '8901234567899',
    lowStockThreshold: 5,
    isActive: true,
  },
  {
    id: 'P011',
    name: 'Dosa Batter (1kg)',
    nameTamil: 'தோசை மாவு (1கிலோ)',
    category: 'Ready to Cook',
    price: 80,
    mrp: 90,
    gstPercent: 5,
    hsnCode: '1901',
    stock: 20,
    unit: 'kg',
    barcode: '8901234567900',
    lowStockThreshold: 8,
    isActive: true,
  },
  {
    id: 'P012',
    name: 'Curd (500ml)',
    nameTamil: 'தயிர் (500ml)',
    category: 'Dairy',
    price: 35,
    mrp: 38,
    gstPercent: 5,
    hsnCode: '0403',
    stock: 50,
    unit: 'pcs',
    barcode: '8901234567901',
    lowStockThreshold: 15,
    isActive: true,
  },
];

// Categories
export const productCategories = [
  { id: 'groceries', name: 'Groceries', nameTamil: 'மளிகை பொருட்கள்', icon: '🛒' },
  { id: 'dairy', name: 'Dairy', nameTamil: 'பால் பொருட்கள்', icon: '🥛' },
  { id: 'personal-care', name: 'Personal Care', nameTamil: 'தனிப்பட்ட பராமரிப்பு', icon: '🧴' },
  { id: 'household', name: 'Household', nameTamil: 'வீட்டு பொருட்கள்', icon: '🏠' },
  { id: 'snacks', name: 'Snacks', nameTamil: 'தின்பண்டங்கள்', icon: '🍪' },
  { id: 'beverages', name: 'Beverages', nameTamil: 'பானங்கள்', icon: '☕' },
  { id: 'ready-to-cook', name: 'Ready to Cook', nameTamil: 'சமைக்க தயார்', icon: '🍳' },
];

// Customers - Tamil Nadu Names
export const mockCustomers: Customer[] = [
  {
    id: 'C001',
    name: 'Murugan Stores',
    mobile: '9876543210',
    email: 'murugan.stores@email.com',
    address: '123, Anna Nagar, Chennai - 600040',
    gstin: '33AABCU9603R1ZM',
    type: 'wholesale',
    creditLimit: 50000,
    outstandingBalance: 12500,
    totalPurchases: 245000,
    lastPurchaseDate: '2026-01-08',
  },
  {
    id: 'C002',
    name: 'Lakshmi Traders',
    mobile: '9876543211',
    email: 'lakshmi.traders@email.com',
    address: '45, T Nagar, Chennai - 600017',
    gstin: '33AABCU9603R1ZN',
    type: 'wholesale',
    creditLimit: 75000,
    outstandingBalance: 8000,
    totalPurchases: 380000,
    lastPurchaseDate: '2026-01-09',
  },
  {
    id: 'C003',
    name: 'Selvam (Walk-in)',
    mobile: '9876543212',
    type: 'retail',
    creditLimit: 0,
    outstandingBalance: 0,
    totalPurchases: 5600,
    lastPurchaseDate: '2026-01-10',
  },
  {
    id: 'C004',
    name: 'Anbu Supermarket',
    mobile: '9876543213',
    email: 'anbu.super@email.com',
    address: '78, Velachery Main Road, Chennai - 600042',
    gstin: '33AABCU9603R1ZP',
    type: 'credit',
    creditLimit: 100000,
    outstandingBalance: 45000,
    totalPurchases: 890000,
    lastPurchaseDate: '2026-01-10',
  },
  {
    id: 'C005',
    name: 'Karthik Provisions',
    mobile: '9876543214',
    address: '12, Adyar, Chennai - 600020',
    type: 'credit',
    creditLimit: 25000,
    outstandingBalance: 3500,
    totalPurchases: 125000,
    lastPurchaseDate: '2026-01-07',
  },
];

// Bills
export const mockBills: Bill[] = [
  {
    id: 'B001',
    billNumber: 'INV-2026-0001',
    date: '2026-01-10',
    customerId: 'C003',
    customerName: 'Selvam (Walk-in)',
    items: [
      { productId: 'P001', productName: 'Basmati Rice (1kg)', quantity: 2, price: 120, gstPercent: 5, discount: 0, total: 252 },
      { productId: 'P003', productName: 'Sunflower Oil (1L)', quantity: 1, price: 135, gstPercent: 5, discount: 0, total: 141.75 },
    ],
    subtotal: 375,
    cgst: 9.38,
    sgst: 9.38,
    discount: 0,
    roundOff: 0.24,
    total: 394,
    paymentMode: 'Cash',
    status: 'paid',
    paidAmount: 394,
  },
  {
    id: 'B002',
    billNumber: 'INV-2026-0002',
    date: '2026-01-10',
    customerId: 'C001',
    customerName: 'Murugan Stores',
    items: [
      { productId: 'P005', productName: 'Aashirvaad Atta (5kg)', quantity: 10, price: 280, gstPercent: 5, discount: 100, total: 2840 },
      { productId: 'P002', productName: 'Toor Dal (1kg)', quantity: 20, price: 145, gstPercent: 5, discount: 50, total: 2997.5 },
    ],
    subtotal: 5650,
    cgst: 141.25,
    sgst: 141.25,
    discount: 150,
    roundOff: 0.50,
    total: 5783,
    paymentMode: 'UPI',
    status: 'paid',
    paidAmount: 5783,
  },
  {
    id: 'B003',
    billNumber: 'INV-2026-0003',
    date: '2026-01-09',
    customerId: 'C004',
    customerName: 'Anbu Supermarket',
    items: [
      { productId: 'P007', productName: 'Parle-G Biscuits', quantity: 100, price: 10, gstPercent: 18, discount: 0, total: 1180 },
      { productId: 'P008', productName: 'Colgate Toothpaste (200g)', quantity: 24, price: 115, gstPercent: 18, discount: 60, total: 3199.2 },
    ],
    subtotal: 3700,
    cgst: 333,
    sgst: 333,
    discount: 60,
    roundOff: -0.20,
    total: 4306,
    paymentMode: 'Credit',
    status: 'pending',
    paidAmount: 0,
  },
];

// Expenses
export const mockExpenses: Expense[] = [
  { id: 'E001', date: '2026-01-10', category: 'Electricity', description: 'EB Bill - January', amount: 4500, paymentMode: 'Bank Transfer' },
  { id: 'E002', date: '2026-01-09', category: 'Transport', description: 'Stock delivery charges', amount: 800, paymentMode: 'Cash' },
  { id: 'E003', date: '2026-01-08', category: 'Staff Salary', description: 'Advance to Ravi', amount: 5000, paymentMode: 'Cash' },
  { id: 'E004', date: '2026-01-07', category: 'Maintenance', description: 'AC repair', amount: 2500, paymentMode: 'UPI' },
  { id: 'E005', date: '2026-01-05', category: 'Rent', description: 'Shop rent - January', amount: 25000, paymentMode: 'Bank Transfer' },
];

// Expense Categories
export const expenseCategories = [
  { id: 'rent', name: 'Rent', nameTamil: 'வாடகை', icon: '🏪' },
  { id: 'electricity', name: 'Electricity', nameTamil: 'மின்சாரம்', icon: '⚡' },
  { id: 'salary', name: 'Staff Salary', nameTamil: 'ஊழியர் சம்பளம்', icon: '👥' },
  { id: 'transport', name: 'Transport', nameTamil: 'போக்குவரத்து', icon: '🚛' },
  { id: 'maintenance', name: 'Maintenance', nameTamil: 'பராமரிப்பு', icon: '🔧' },
  { id: 'misc', name: 'Miscellaneous', nameTamil: 'இதர செலவுகள்', icon: '📦' },
];

// Staff
export const mockStaff: Staff[] = [
  { id: 'S001', name: 'Rajesh Kumar', mobile: '9876543220', role: 'owner', email: 'rajesh@business.com', isActive: true, salesCount: 0, totalSales: 0 },
  { id: 'S002', name: 'Priya Devi', mobile: '9876543221', role: 'manager', email: 'priya@business.com', isActive: true, salesCount: 145, totalSales: 125000 },
  { id: 'S003', name: 'Ravi Shankar', mobile: '9876543222', role: 'cashier', email: 'ravi@business.com', isActive: true, salesCount: 320, totalSales: 85000 },
  { id: 'S004', name: 'Meena Kumari', mobile: '9876543223', role: 'cashier', email: 'meena@business.com', isActive: true, salesCount: 280, totalSales: 72000 },
  { id: 'S005', name: 'Arun Prasad', mobile: '9876543224', role: 'accountant', email: 'arun@business.com', isActive: false, salesCount: 0, totalSales: 0 },
];

// Business Categories
export const businessCategories = [
  { id: 'retail', name: 'Retail Shop', nameTamil: 'சில்லறை கடை' },
  { id: 'wholesale', name: 'Wholesale', nameTamil: 'மொத்த வணிகம்' },
  { id: 'supermarket', name: 'Supermarket', nameTamil: 'சூப்பர்மார்க்கெட்' },
  { id: 'hotel', name: 'Hotel', nameTamil: 'ஹோட்டல்' },
  { id: 'restaurant', name: 'Restaurant', nameTamil: 'உணவகம்' },
  { id: 'bakery', name: 'Bakery', nameTamil: 'பேக்கரி' },
  { id: 'medical', name: 'Medical Shop', nameTamil: 'மருந்து கடை' },
  { id: 'pharmacy', name: 'Pharmacy', nameTamil: 'பார்மசி' },
  { id: 'service', name: 'Service Business', nameTamil: 'சேவை வணிகம்' },
  { id: 'manufacturing', name: 'Manufacturing', nameTamil: 'உற்பத்தி' },
  { id: 'distributor', name: 'Distributor', nameTamil: 'விநியோகஸ்தர்' },
  { id: 'freelancer', name: 'Freelancer', nameTamil: 'தனித்தொழில்' },
];

// Dashboard Statistics
export const dashboardStats = {
  todaySales: 15780,
  monthSales: 425600,
  yearSales: 4850000,
  pendingDues: 69000,
  todayBillsCount: 28,
  monthBillsCount: 456,
  topSellingItems: [
    { name: 'Basmati Rice', quantity: 145, revenue: 17400 },
    { name: 'Sunflower Oil', quantity: 98, revenue: 13230 },
    { name: 'Toor Dal', quantity: 87, revenue: 12615 },
    { name: 'Filter Coffee', quantity: 65, revenue: 20800 },
    { name: 'Amul Butter', quantity: 52, revenue: 14560 },
  ],
  lowStockItems: [
    { name: 'Dosa Batter', stock: 20, threshold: 8 },
    { name: 'Filter Coffee', stock: 25, threshold: 5 },
    { name: 'Amul Butter', stock: 30, threshold: 8 },
  ],
  salesTrend: [
    { date: '01 Jan', amount: 12500 },
    { date: '02 Jan', amount: 18900 },
    { date: '03 Jan', amount: 15200 },
    { date: '04 Jan', amount: 22100 },
    { date: '05 Jan', amount: 19800 },
    { date: '06 Jan', amount: 25600 },
    { date: '07 Jan', amount: 21300 },
    { date: '08 Jan', amount: 28400 },
    { date: '09 Jan', amount: 24700 },
    { date: '10 Jan', amount: 15780 },
  ],
  gstSummary: {
    cgstCollected: 8450,
    sgstCollected: 8450,
    totalGst: 16900,
  },
  hourlyData: [
    { hour: '9 AM', sales: 2500 },
    { hour: '10 AM', sales: 4200 },
    { hour: '11 AM', sales: 3800 },
    { hour: '12 PM', sales: 5100 },
    { hour: '1 PM', sales: 2200 },
    { hour: '2 PM', sales: 3400 },
    { hour: '3 PM', sales: 4800 },
    { hour: '4 PM', sales: 5600 },
    { hour: '5 PM', sales: 6200 },
    { hour: '6 PM', sales: 7800 },
    { hour: '7 PM', sales: 8500 },
    { hour: '8 PM', sales: 6100 },
  ],
};

// Payment Modes
export const paymentModes = [
  { id: 'cash', name: 'Cash', nameTamil: 'ரொக்கம்', icon: '💵' },
  { id: 'upi', name: 'UPI', nameTamil: 'யூபிஐ', icon: '📱' },
  { id: 'card', name: 'Card', nameTamil: 'கார்டு', icon: '💳' },
  { id: 'credit', name: 'Credit', nameTamil: 'கடன்', icon: '📝' },
  { id: 'bank', name: 'Bank Transfer', nameTamil: 'வங்கி', icon: '🏦' },
];

// Tamil Nadu Districts
export const tamilNaduDistricts = [
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
  'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode', 'Thoothukkudi',
  'Dindigul', 'Thanjavur', 'Ranipet', 'Sivaganga', 'Karur',
  'Namakkal', 'Kanchipuram', 'Cuddalore', 'Tiruvannamalai', 'Krishnagiri',
];

// Default Business Profile
export const defaultBusinessProfile: BusinessProfile = {
  businessName: 'Sri Lakshmi Stores',
  ownerName: 'Rajesh Kumar',
  mobile: '9876543210',
  email: 'srilakshmistores@gmail.com',
  category: 'retail',
  gstin: '33AABCU9603R1ZM',
  address: '45, Gandhi Road, T Nagar',
  state: 'Tamil Nadu',
  district: 'Chennai',
  pincode: '600017',
  invoiceFooter: 'Thank you for shopping with us! | நன்றி!',
  financialYear: '2025-26',
};

// Translations
export const translations = {
  en: {
    dashboard: 'Dashboard',
    billing: 'Billing',
    products: 'Products',
    customers: 'Customers',
    reports: 'Reports',
    settings: 'Settings',
    todaySales: "Today's Sales",
    monthSales: 'This Month',
    yearSales: 'This Year',
    pendingDues: 'Pending Dues',
    newBill: 'New Bill',
    addProduct: 'Add Product',
    addCustomer: 'Add Customer',
    search: 'Search...',
    total: 'Total',
    subtotal: 'Subtotal',
    discount: 'Discount',
    cgst: 'CGST',
    sgst: 'SGST',
    grandTotal: 'Grand Total',
    pay: 'Pay',
    print: 'Print',
    save: 'Save',
    cancel: 'Cancel',
    quantity: 'Quantity',
    price: 'Price',
    amount: 'Amount',
    logout: 'Logout',
    profile: 'Profile',
    help: 'Help',
  },
  ta: {
    dashboard: 'டாஷ்போர்டு',
    billing: 'பில்லிங்',
    products: 'பொருட்கள்',
    customers: 'வாடிக்கையாளர்கள்',
    reports: 'அறிக்கைகள்',
    settings: 'அமைப்புகள்',
    todaySales: 'இன்றைய விற்பனை',
    monthSales: 'இந்த மாதம்',
    yearSales: 'இந்த ஆண்டு',
    pendingDues: 'நிலுவை தொகை',
    newBill: 'புதிய பில்',
    addProduct: 'பொருள் சேர்',
    addCustomer: 'வாடிக்கையாளர் சேர்',
    search: 'தேடு...',
    total: 'மொத்தம்',
    subtotal: 'உப மொத்தம்',
    discount: 'தள்ளுபடி',
    cgst: 'சிஜிஎஸ்டி',
    sgst: 'எஸ்ஜிஎஸ்டி',
    grandTotal: 'மொத்த தொகை',
    pay: 'செலுத்து',
    print: 'அச்சிடு',
    save: 'சேமி',
    cancel: 'ரத்து',
    quantity: 'அளவு',
    price: 'விலை',
    amount: 'தொகை',
    logout: 'வெளியேறு',
    profile: 'சுயவிவரம்',
    help: 'உதவி',
  },
};
