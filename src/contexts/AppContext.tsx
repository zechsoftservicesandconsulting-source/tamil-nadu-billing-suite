import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  mockProducts, 
  mockCustomers, 
  mockBills, 
  mockExpenses, 
  mockStaff,
  defaultBusinessProfile,
  translations,
  Product,
  Customer,
  Bill,
  Expense,
  Staff,
  BusinessProfile,
  BillItem
} from '@/data/mockData';
import {
  CustomizationSettings,
  defaultCustomizationSettings,
} from '@/data/customizationDefaults';

type Language = 'en' | 'ta';
type Theme = 'light' | 'dark';

interface CartItem extends BillItem {
  productId: string;
}

interface AppContextType {
  // Auth
  isAuthenticated: boolean;
  currentUser: Staff | null;
  login: (email: string, password: string) => boolean;
  demoLogin: () => void;
  logout: () => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;

  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Business Profile
  businessProfile: BusinessProfile;
  updateBusinessProfile: (profile: Partial<BusinessProfile>) => void;

  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Customers
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;

  // Bills
  bills: Bill[];
  addBill: (bill: Bill) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartGst: { cgst: number; sgst: number };

  // Expenses
  expenses: Expense[];
  addExpense: (expense: Expense) => void;

  // Staff
  staff: Staff[];

  // UI State
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer | null) => void;
  billDiscount: number;
  setBillDiscount: (discount: number) => void;

  // Customization
  customization: CustomizationSettings;
  updateCustomization: <K extends keyof CustomizationSettings>(
    section: K,
    updates: Partial<CustomizationSettings[K]>
  ) => void;
  resetCustomization: (section?: keyof CustomizationSettings) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<Staff | null>(null);

  // Language & Theme
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');

  // Data State
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(defaultBusinessProfile);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [staff] = useState<Staff[]>(mockStaff);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [billDiscount, setBillDiscount] = useState(0);

  // Customization State
  const [customization, setCustomization] = useState<CustomizationSettings>(defaultCustomizationSettings);

  // Auth Functions
  const login = useCallback((email: string, password: string) => {
    const user = staff.find(s => s.email === email) || staff[0];
    setCurrentUser(user);
    setIsAuthenticated(true);
    return true;
  }, [staff]);

  const demoLogin = useCallback(() => {
    setCurrentUser(staff[0]);
    setIsAuthenticated(true);
  }, [staff]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCart([]);
    setSelectedCustomer(null);
  }, []);

  // Translation Function
  const t = useCallback((key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  }, [language]);

  // Theme Effect
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Apply appearance customization
  React.useEffect(() => {
    const root = document.documentElement;
    
    // Apply font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '20px',
    };
    root.style.setProperty('--base-font-size', fontSizeMap[customization.appearance.fontSize]);
    
    // Apply border radius
    const borderRadiusMap = {
      none: '0px',
      small: '4px',
      medium: '8px',
      large: '16px',
    };
    root.style.setProperty('--custom-radius', borderRadiusMap[customization.appearance.borderRadius]);
    
    // Apply compact mode
    if (customization.appearance.compactMode) {
      root.classList.add('compact-mode');
    } else {
      root.classList.remove('compact-mode');
    }
    
    // Apply animations toggle
    if (!customization.appearance.showAnimations) {
      root.classList.add('no-animations');
    } else {
      root.classList.remove('no-animations');
    }
  }, [customization.appearance]);

  // Business Profile
  const updateBusinessProfile = useCallback((profile: Partial<BusinessProfile>) => {
    setBusinessProfile(prev => ({ ...prev, ...profile }));
  }, []);

  // Product Functions
  const addProduct = useCallback((product: Product) => {
    setProducts(prev => [...prev, product]);
  }, []);

  const updateProduct = useCallback((id: string, product: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...product } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  // Customer Functions
  const addCustomer = useCallback((customer: Customer) => {
    setCustomers(prev => [...prev, customer]);
  }, []);

  const updateCustomer = useCallback((id: string, customer: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...customer } : c));
  }, []);

  // Bill Functions
  const addBill = useCallback((bill: Bill) => {
    setBills(prev => [bill, ...prev]);
  }, []);

  // Cart Functions
  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                total: (item.quantity + quantity) * product.price * (1 + product.gstPercent / 100)
              }
            : item
        );
      }
      const gstAmount = product.price * quantity * (product.gstPercent / 100);
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          quantity,
          price: product.price,
          gstPercent: product.gstPercent,
          discount: 0,
          total: product.price * quantity + gstAmount
        }
      ];
    });
  }, []);

  const updateCartItem = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.productId !== productId));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.productId === productId
            ? {
                ...item,
                quantity,
                total: quantity * item.price * (1 + item.gstPercent / 100) - item.discount
              }
            : item
        )
      );
    }
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setBillDiscount(0);
  }, []);

  // Cart Calculations
  const cartTotal = cart.reduce((sum, item) => sum + item.total, 0) - billDiscount;
  const cartGst = cart.reduce(
    (acc, item) => {
      const itemGst = (item.price * item.quantity * item.gstPercent) / 100;
      return {
        cgst: acc.cgst + itemGst / 2,
        sgst: acc.sgst + itemGst / 2,
      };
    },
    { cgst: 0, sgst: 0 }
  );

  // Expense Functions
  const addExpense = useCallback((expense: Expense) => {
    setExpenses(prev => [expense, ...prev]);
  }, []);

  // Customization Functions
  const updateCustomization = useCallback(<K extends keyof CustomizationSettings>(
    section: K,
    updates: Partial<CustomizationSettings[K]>
  ) => {
    setCustomization(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }));
  }, []);

  const resetCustomization = useCallback((section?: keyof CustomizationSettings) => {
    if (section) {
      setCustomization(prev => ({
        ...prev,
        [section]: defaultCustomizationSettings[section]
      }));
    } else {
      setCustomization(defaultCustomizationSettings);
    }
  }, []);

  const value: AppContextType = {
    isAuthenticated,
    currentUser,
    login,
    demoLogin,
    logout,
    language,
    setLanguage,
    t,
    theme,
    setTheme,
    businessProfile,
    updateBusinessProfile,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    customers,
    addCustomer,
    updateCustomer,
    bills,
    addBill,
    cart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    cartTotal,
    cartGst,
    expenses,
    addExpense,
    staff,
    selectedCustomer,
    setSelectedCustomer,
    billDiscount,
    setBillDiscount,
    customization,
    updateCustomization,
    resetCustomization,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
