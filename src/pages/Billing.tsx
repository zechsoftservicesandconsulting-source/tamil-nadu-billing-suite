import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  User, 
  CreditCard, 
  Banknote, 
  Smartphone,
  X,
  Percent,
  Receipt,
  Check,
  ArrowRight,
  Building2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApp } from '@/contexts/AppContext';
import { formatCurrency, generateBillNumber, roundOff } from '@/utils/formatters';
import { paymentModes, productCategories } from '@/data/mockData';
import { AppLayout } from '@/components/layout/AppLayout';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Billing() {
  const { 
    language, 
    products, 
    customers,
    cart, 
    addToCart, 
    updateCartItem, 
    removeFromCart, 
    clearCart,
    cartTotal,
    cartGst,
    selectedCustomer,
    setSelectedCustomer,
    billDiscount,
    setBillDiscount,
    addBill,
    businessProfile
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showCustomerSelect, setShowCustomerSelect] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('cash');
  const [discountInput, setDiscountInput] = useState('');
  const [showDiscount, setShowDiscount] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F2') {
        e.preventDefault();
        document.getElementById('product-search')?.focus();
      } else if (e.key === 'F4') {
        e.preventDefault();
        if (cart.length > 0) setShowPayment(true);
      } else if (e.key === 'Escape') {
        setShowPayment(false);
        setShowDiscount(false);
        setShowCustomerSelect(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cart]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.nameTamil.includes(searchQuery) ||
                           product.barcode.includes(searchQuery);
      const matchesCategory = !selectedCategory || 
                             product.category.toLowerCase().replace(' ', '-') === selectedCategory;
      return matchesSearch && matchesCategory && product.isActive;
    });
  }, [products, searchQuery, selectedCategory]);

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalGst = cartGst.cgst + cartGst.sgst;
  const { rounded: finalTotal, roundOff: roundOffAmount } = roundOff(subtotal + totalGst - billDiscount);

  const handleApplyDiscount = () => {
    const discount = parseFloat(discountInput) || 0;
    setBillDiscount(discount);
    setShowDiscount(false);
    setDiscountInput('');
    toast.success(language === 'ta' ? 'தள்ளுபடி சேர்க்கப்பட்டது' : 'Discount applied');
  };

  const handleCompleteSale = () => {
    const billNumber = generateBillNumber();
    const newBill = {
      id: `B${Date.now()}`,
      billNumber,
      date: new Date().toISOString().split('T')[0],
      customerId: selectedCustomer?.id || 'WALK-IN',
      customerName: selectedCustomer?.name || 'Walk-in Customer',
      items: cart,
      subtotal,
      cgst: cartGst.cgst,
      sgst: cartGst.sgst,
      discount: billDiscount,
      roundOff: roundOffAmount,
      total: finalTotal,
      paymentMode: selectedPaymentMode,
      status: 'paid' as const,
      paidAmount: finalTotal,
    };

    addBill(newBill);
    setShowPayment(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      clearCart();
      setSelectedCustomer(null);
    }, 2000);
  };

  const quickQuantities = [1, 2, 5, 10];

  return (
    <AppLayout>
      <div className="h-[calc(100vh-7rem)] flex gap-4 lg:gap-6">
        {/* Left Panel - Products */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Search & Categories */}
          <div className="space-y-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="product-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ta' ? 'பொருள் தேடு அல்லது பார்கோடு... (F2)' : 'Search product or scan barcode... (F2)'}
                className="pl-10 h-12 text-lg"
              />
            </div>

            <ScrollArea className="w-full">
              <div className="flex gap-2 pb-2">
                <Button
                  variant={selectedCategory === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="shrink-0"
                >
                  {language === 'ta' ? 'அனைத்தும்' : 'All'}
                </Button>
                {productCategories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    className="shrink-0 gap-1.5"
                  >
                    <span>{cat.icon}</span>
                    <span>{language === 'ta' ? cat.nameTamil : cat.name}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Products Grid */}
          <ScrollArea className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary group"
                    onClick={() => addToCart(product, 1)}
                  >
                    <CardContent className="p-3 text-center">
                      <div className="h-10 w-10 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center text-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        📦
                      </div>
                      <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">
                        {language === 'ta' ? product.nameTamil : product.name}
                      </h3>
                      <p className="text-lg font-bold font-mono text-primary mt-1">
                        {formatCurrency(product.price)}
                      </p>
                      {product.stock < product.lowStockThreshold && (
                        <span className="text-xs text-warning">Stock: {product.stock}</span>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel - Cart */}
        <Card className="w-full lg:w-96 flex flex-col shrink-0">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Receipt className="h-5 w-5 text-primary" />
                {language === 'ta' ? 'பில்' : 'Bill'}
              </CardTitle>
              {cart.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Customer Selection */}
            <Dialog open={showCustomerSelect} onOpenChange={setShowCustomerSelect}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-2 mt-2">
                  <User className="h-4 w-4" />
                  {selectedCustomer 
                    ? selectedCustomer.name 
                    : (language === 'ta' ? 'வாடிக்கையாளர் தேர்வு' : 'Select Customer')
                  }
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {language === 'ta' ? 'வாடிக்கையாளர் தேர்வு' : 'Select Customer'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedCustomer(null);
                      setShowCustomerSelect(false);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {language === 'ta' ? 'நடை வாடிக்கையாளர்' : 'Walk-in Customer'}
                  </Button>
                  {customers.map((customer) => (
                    <Button
                      key={customer.id}
                      variant={selectedCustomer?.id === customer.id ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setShowCustomerSelect(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {customer.gstin ? (
                          <Building2 className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                        <div className="text-left">
                          <div>{customer.name}</div>
                          <div className="text-xs opacity-70">{customer.mobile}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>

          {/* Cart Items */}
          <ScrollArea className="flex-1 px-4">
            <AnimatePresence mode="popLayout">
              {cart.length === 0 ? (
                <div className="h-full flex items-center justify-center py-12">
                  <div className="text-center text-muted-foreground">
                    <Receipt className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>{language === 'ta' ? 'பொருட்கள் சேர்க்கவும்' : 'Add items to bill'}</p>
                    <p className="text-sm mt-1">
                      {language === 'ta' ? 'பொருளை தேர்ந்தெடுக்கவும்' : 'Click on products to add'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 py-4">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.productName}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateCartItem(item.productId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateCartItem(item.productId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right min-w-16">
                        <p className="font-mono font-bold">{formatCurrency(item.total)}</p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>

          {/* Bill Summary */}
          {cart.length > 0 && (
            <div className="border-t p-4 space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === 'ta' ? 'உப மொத்தம்' : 'Subtotal'}
                  </span>
                  <span className="font-mono">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CGST</span>
                  <span className="font-mono">{formatCurrency(cartGst.cgst)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SGST</span>
                  <span className="font-mono">{formatCurrency(cartGst.sgst)}</span>
                </div>
                {billDiscount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>{language === 'ta' ? 'தள்ளுபடி' : 'Discount'}</span>
                    <span className="font-mono">-{formatCurrency(billDiscount)}</span>
                  </div>
                )}
                {roundOffAmount !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {language === 'ta' ? 'ரவுண்ட் ஆஃப்' : 'Round Off'}
                    </span>
                    <span className="font-mono">
                      {roundOffAmount >= 0 ? '+' : ''}{formatCurrency(roundOffAmount)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-lg font-semibold">
                  {language === 'ta' ? 'மொத்தம்' : 'Total'}
                </span>
                <span className="text-2xl font-bold font-mono text-primary">
                  {formatCurrency(finalTotal)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Dialog open={showDiscount} onOpenChange={setShowDiscount}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Percent className="h-4 w-4" />
                      {language === 'ta' ? 'தள்ளுபடி' : 'Discount'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                      <DialogTitle>
                        {language === 'ta' ? 'தள்ளுபடி சேர்' : 'Add Discount'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>
                          {language === 'ta' ? 'தொகை (₹)' : 'Amount (₹)'}
                        </Label>
                        <Input
                          type="number"
                          value={discountInput}
                          onChange={(e) => setDiscountInput(e.target.value)}
                          placeholder="0.00"
                          className="text-lg font-mono"
                        />
                      </div>
                      <Button onClick={handleApplyDiscount} className="w-full">
                        {language === 'ta' ? 'பயன்படுத்து' : 'Apply'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button 
                  onClick={() => setShowPayment(true)}
                  className="gap-2 bg-success hover:bg-success/90 text-success-foreground"
                >
                  <CreditCard className="h-4 w-4" />
                  {language === 'ta' ? 'செலுத்து (F4)' : 'Pay (F4)'}
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Payment Modal */}
        <Dialog open={showPayment} onOpenChange={setShowPayment}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {language === 'ta' ? 'பணம் செலுத்துதல்' : 'Payment'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="text-center p-6 bg-primary/5 rounded-2xl">
                <p className="text-sm text-muted-foreground mb-1">
                  {language === 'ta' ? 'செலுத்த வேண்டிய தொகை' : 'Amount to Pay'}
                </p>
                <p className="text-4xl font-bold font-mono text-primary">
                  {formatCurrency(finalTotal)}
                </p>
              </div>

              <div className="space-y-3">
                <Label>
                  {language === 'ta' ? 'பணம் செலுத்தும் முறை' : 'Payment Method'}
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {paymentModes.slice(0, 4).map((mode) => (
                    <Button
                      key={mode.id}
                      variant={selectedPaymentMode === mode.id ? 'default' : 'outline'}
                      className="h-16 flex-col gap-1"
                      onClick={() => setSelectedPaymentMode(mode.id)}
                    >
                      <span className="text-xl">{mode.icon}</span>
                      <span className="text-sm">
                        {language === 'ta' ? mode.nameTamil : mode.name}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleCompleteSale}
                className="w-full h-14 text-lg font-semibold bg-success hover:bg-success/90 text-success-foreground"
              >
                <Check className="h-5 w-5 mr-2" />
                {language === 'ta' ? 'பில் முடி' : 'Complete Sale'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-success text-success-foreground p-8 rounded-3xl text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <Check className="h-16 w-16 mx-auto mb-4" />
                </motion.div>
                <h2 className="text-2xl font-bold">
                  {language === 'ta' ? 'பில் வெற்றி!' : 'Payment Successful!'}
                </h2>
                <p className="text-lg mt-2 opacity-90">
                  {formatCurrency(finalTotal)}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
