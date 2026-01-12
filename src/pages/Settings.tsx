import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Globe, 
  Palette, 
  Receipt,
  Building2,
  Save,
  Upload,
  CreditCard,
  Settings2,
  Package,
  Users,
  LayoutDashboard,
  FileText,
  Bell,
  Percent,
  Ruler,
  FolderOpen,
  RotateCcw,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  GripVertical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/contexts/AppContext';
import { businessCategories, tamilNaduDistricts } from '@/data/mockData';
import { colorPalettes, fontOptions } from '@/data/customizationDefaults';
import { AppLayout } from '@/components/layout/AppLayout';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const settingsSections = [
  { id: 'business', label: 'Business', labelTa: 'வணிகம்', icon: Building2 },
  { id: 'invoice', label: 'Invoice', labelTa: 'பில்', icon: Receipt },
  { id: 'billing', label: 'Billing', labelTa: 'பில்லிங்', icon: CreditCard },
  { id: 'products', label: 'Products', labelTa: 'பொருட்கள்', icon: Package },
  { id: 'customers', label: 'Customers', labelTa: 'வாடிக்கையாளர்கள்', icon: Users },
  { id: 'dashboard', label: 'Dashboard', labelTa: 'டாஷ்போர்டு', icon: LayoutDashboard },
  { id: 'tax', label: 'Tax & GST', labelTa: 'வரி & GST', icon: Percent },
  { id: 'payments', label: 'Payments', labelTa: 'பணம்', icon: CreditCard },
  { id: 'units', label: 'Units', labelTa: 'அலகுகள்', icon: Ruler },
  { id: 'categories', label: 'Categories', labelTa: 'வகைகள்', icon: FolderOpen },
  { id: 'appearance', label: 'Appearance', labelTa: 'தோற்றம்', icon: Palette },
  { id: 'notifications', label: 'Notifications', labelTa: 'அறிவிப்புகள்', icon: Bell },
];

export default function Settings() {
  const { 
    language, 
    setLanguage, 
    theme, 
    setTheme, 
    businessProfile, 
    updateBusinessProfile,
    customization,
    updateCustomization,
    resetCustomization
  } = useApp();

  const [activeSection, setActiveSection] = useState('business');
  const [localProfile, setLocalProfile] = useState(businessProfile);
  const [gstEnabled, setGstEnabled] = useState(!!businessProfile.gstin);

  const handleSaveProfile = () => {
    updateBusinessProfile(localProfile);
    toast.success(language === 'ta' ? 'அமைப்புகள் சேமிக்கப்பட்டது' : 'Settings saved successfully');
  };

  const handleResetSection = (section: string) => {
    resetCustomization(section as any);
    toast.success(language === 'ta' ? 'இயல்புநிலைக்கு மீட்டமைக்கப்பட்டது' : 'Reset to defaults');
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'business':
        return <BusinessSection 
          language={language} 
          localProfile={localProfile} 
          setLocalProfile={setLocalProfile}
          gstEnabled={gstEnabled}
          setGstEnabled={setGstEnabled}
          handleSaveProfile={handleSaveProfile}
        />;
      case 'invoice':
        return <InvoiceSection language={language} customization={customization} updateCustomization={updateCustomization} />;
      case 'billing':
        return <BillingSection language={language} customization={customization} updateCustomization={updateCustomization} />;
      case 'products':
        return <ProductFieldsSection language={language} customization={customization} updateCustomization={updateCustomization} />;
      case 'customers':
        return <CustomerFieldsSection language={language} customization={customization} updateCustomization={updateCustomization} />;
      case 'dashboard':
        return <DashboardSection language={language} customization={customization} updateCustomization={updateCustomization} />;
      case 'tax':
        return <TaxSection language={language} customization={customization} updateCustomization={updateCustomization} />;
      case 'payments':
        return <PaymentModesSection language={language} customization={customization} updateCustomization={updateCustomization} />;
      case 'units':
        return <UnitsSection language={language} customization={customization} updateCustomization={updateCustomization} />;
      case 'categories':
        return <CategoriesSection language={language} customization={customization} updateCustomization={updateCustomization} />;
      case 'appearance':
        return <AppearanceSection 
          language={language} 
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
          customization={customization} 
          updateCustomization={updateCustomization} 
        />;
      case 'notifications':
        return <NotificationsSection language={language} customization={customization} updateCustomization={updateCustomization} />;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">
              {language === 'ta' ? 'அமைப்புகள்' : 'Settings'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ta' 
                ? 'உங்கள் பயன்பாட்டை முழுமையாக தனிப்பயனாக்குங்கள்'
                : 'Customize every aspect of your application'
              }
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => handleResetSection(activeSection)}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            {language === 'ta' ? 'மீட்டமை' : 'Reset'}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <Card className="lg:w-64 shrink-0">
            <ScrollArea className="h-auto lg:h-[calc(100vh-14rem)]">
              <div className="p-2 space-y-1">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all",
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    )}
                  >
                    <section.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {language === 'ta' ? section.labelTa : section.label}
                    </span>
                    {activeSection === section.id && (
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderSectionContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
}

// Business Section
function BusinessSection({ language, localProfile, setLocalProfile, gstEnabled, setGstEnabled, handleSaveProfile }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'ta' ? 'வணிக விவரங்கள்' : 'Business Details'}</CardTitle>
        <CardDescription>
          {language === 'ta' ? 'உங்கள் வணிக தகவல்களை புதுப்பிக்கவும்' : 'Update your business information'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{language === 'ta' ? 'வணிக பெயர்' : 'Business Name'}</Label>
            <Input
              value={localProfile.businessName}
              onChange={(e) => setLocalProfile({ ...localProfile, businessName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>{language === 'ta' ? 'உரிமையாளர் பெயர்' : 'Owner Name'}</Label>
            <Input
              value={localProfile.ownerName}
              onChange={(e) => setLocalProfile({ ...localProfile, ownerName: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{language === 'ta' ? 'மொபைல்' : 'Mobile'}</Label>
            <Input
              value={localProfile.mobile}
              onChange={(e) => setLocalProfile({ ...localProfile, mobile: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={localProfile.email}
              onChange={(e) => setLocalProfile({ ...localProfile, email: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{language === 'ta' ? 'வணிக வகை' : 'Business Category'}</Label>
            <Select 
              value={localProfile.category}
              onValueChange={(value) => setLocalProfile({ ...localProfile, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {businessCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {language === 'ta' ? cat.nameTamil : cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{language === 'ta' ? 'மாவட்டம்' : 'District'}</Label>
            <Select 
              value={localProfile.district}
              onValueChange={(value) => setLocalProfile({ ...localProfile, district: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tamilNaduDistricts.map((dist) => (
                  <SelectItem key={dist} value={dist}>{dist}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>{language === 'ta' ? 'முகவரி' : 'Address'}</Label>
          <Textarea
            value={localProfile.address}
            onChange={(e) => setLocalProfile({ ...localProfile, address: e.target.value })}
            rows={2}
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">{language === 'ta' ? 'GST பதிவு' : 'GST Registered'}</Label>
            <p className="text-sm text-muted-foreground">
              {language === 'ta' ? 'GST பதிவு செய்த வணிகம்' : 'Enable if GST registered'}
            </p>
          </div>
          <Switch checked={gstEnabled} onCheckedChange={setGstEnabled} />
        </div>

        {gstEnabled && (
          <div className="space-y-2">
            <Label>GSTIN</Label>
            <Input
              value={localProfile.gstin}
              onChange={(e) => setLocalProfile({ ...localProfile, gstin: e.target.value.toUpperCase() })}
              placeholder="33AABCU9603R1ZM"
              maxLength={15}
              className="font-mono"
            />
          </div>
        )}

        <div className="pt-4 border-t">
          <Label className="text-base mb-4 block">{language === 'ta' ? 'லோகோ பதிவேற்றம்' : 'Logo Upload'}</Label>
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-xl bg-secondary flex items-center justify-center">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              {language === 'ta' ? 'பதிவேற்று' : 'Upload'}
            </Button>
          </div>
        </div>

        <Button onClick={handleSaveProfile} className="gap-2">
          <Save className="h-4 w-4" />
          {language === 'ta' ? 'சேமி' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );
}

// Invoice Section
function InvoiceSection({ language, customization, updateCustomization }: any) {
  const invoice = customization.invoice;
  
  const toggleField = (field: string) => {
    updateCustomization('invoice', { [field]: !invoice[field] });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'பில் வடிவமைப்பு' : 'Invoice Format'}</CardTitle>
          <CardDescription>
            {language === 'ta' ? 'பில் அளவு மற்றும் தோற்றம்' : 'Invoice size and appearance'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {['thermal', 'a4', 'a5'].map((format) => (
              <button
                key={format}
                onClick={() => updateCustomization('invoice', { format })}
                className={cn(
                  "p-4 rounded-xl border-2 text-center transition-all",
                  invoice.format === format
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className={cn(
                  "mx-auto mb-2 rounded border-2 border-current",
                  format === 'thermal' ? "w-8 h-16" : format === 'a4' ? "w-12 h-16" : "w-10 h-14"
                )} />
                <span className="text-sm font-medium uppercase">{format}</span>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <Label>{language === 'ta' ? 'பில் தலைப்பு' : 'Invoice Title'}</Label>
            <Input
              value={invoice.invoiceTitle}
              onChange={(e) => updateCustomization('invoice', { invoiceTitle: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>{language === 'ta' ? 'பில் தலைப்பு (தமிழ்)' : 'Invoice Title (Tamil)'}</Label>
            <Input
              value={invoice.invoiceTitleTamil}
              onChange={(e) => updateCustomization('invoice', { invoiceTitleTamil: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>{language === 'ta' ? 'விதிமுறைகள்' : 'Terms & Conditions'}</Label>
            <Textarea
              value={invoice.termsText}
              onChange={(e) => updateCustomization('invoice', { termsText: e.target.value })}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>{language === 'ta' ? 'எழுத்து அளவு' : 'Font Size'}</Label>
            <Select 
              value={invoice.fontSize}
              onValueChange={(value) => updateCustomization('invoice', { fontSize: value })}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">{language === 'ta' ? 'சிறியது' : 'Small'}</SelectItem>
                <SelectItem value="medium">{language === 'ta' ? 'நடுத்தரம்' : 'Medium'}</SelectItem>
                <SelectItem value="large">{language === 'ta' ? 'பெரியது' : 'Large'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'காட்டு/மறை புலங்கள்' : 'Show/Hide Fields'}</CardTitle>
          <CardDescription>
            {language === 'ta' ? 'பில்லில் என்ன காட்ட வேண்டும் என்பதை தேர்வு செய்யவும்' : 'Choose what to show on invoice'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'showLogo', label: 'Logo', labelTa: 'லோகோ' },
              { key: 'showGstin', label: 'GSTIN', labelTa: 'GSTIN' },
              { key: 'showAddress', label: 'Address', labelTa: 'முகவரி' },
              { key: 'showMobile', label: 'Mobile', labelTa: 'மொபைல்' },
              { key: 'showEmail', label: 'Email', labelTa: 'மின்னஞ்சல்' },
              { key: 'showHsnCode', label: 'HSN Code', labelTa: 'HSN குறியீடு' },
              { key: 'showBarcode', label: 'Barcode', labelTa: 'பார்கோடு' },
              { key: 'showDiscount', label: 'Discount', labelTa: 'தள்ளுபடி' },
              { key: 'showRoundOff', label: 'Round Off', labelTa: 'ரவுண்ட் ஆஃப்' },
              { key: 'showPaymentMode', label: 'Payment Mode', labelTa: 'பணம் செலுத்தும் முறை' },
              { key: 'showFooter', label: 'Footer', labelTa: 'கீழ்க்குறிப்பு' },
              { key: 'showSignature', label: 'Signature', labelTa: 'கையொப்பம்' },
              { key: 'showQrCode', label: 'QR Code', labelTa: 'QR குறியீடு' },
              { key: 'showTerms', label: 'Terms', labelTa: 'விதிமுறைகள்' },
            ].map((field) => (
              <div key={field.key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm">{language === 'ta' ? field.labelTa : field.label}</span>
                <Switch
                  checked={invoice[field.key]}
                  onCheckedChange={() => toggleField(field.key)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Billing Section
function BillingSection({ language, customization, updateCustomization }: any) {
  const billing = customization.billing;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'பில்லிங் விருப்பங்கள்' : 'Billing Options'}</CardTitle>
          <CardDescription>
            {language === 'ta' ? 'POS செயல்பாட்டை தனிப்பயனாக்குங்கள்' : 'Customize POS behavior'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'enableGst', label: 'Enable GST', labelTa: 'GST இயக்கு' },
              { key: 'enableDiscount', label: 'Enable Discount', labelTa: 'தள்ளுபடி இயக்கு' },
              { key: 'enableRoundOff', label: 'Enable Round Off', labelTa: 'ரவுண்ட் ஆஃப் இயக்கு' },
              { key: 'enablePartialPayment', label: 'Partial Payment', labelTa: 'பகுதி பணம்' },
              { key: 'enableCreditSales', label: 'Credit Sales', labelTa: 'கடன் விற்பனை' },
              { key: 'showMrp', label: 'Show MRP', labelTa: 'MRP காட்டு' },
              { key: 'showStock', label: 'Show Stock', labelTa: 'இருப்பு காட்டு' },
              { key: 'showProductImage', label: 'Product Images', labelTa: 'பொருள் படங்கள்' },
              { key: 'printAfterSale', label: 'Print After Sale', labelTa: 'விற்பனை பின் அச்சிடு' },
              { key: 'confirmBeforeSale', label: 'Confirm Before Sale', labelTa: 'விற்பனை முன் உறுதி' },
              { key: 'enableNegativeStock', label: 'Allow Negative Stock', labelTa: 'எதிர்மறை இருப்பு' },
              { key: 'enableBarcodeScanner', label: 'Barcode Scanner', labelTa: 'பார்கோடு ஸ்கேனர்' },
            ].map((field) => (
              <div key={field.key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm">{language === 'ta' ? field.labelTa : field.label}</span>
                <Switch
                  checked={billing[field.key]}
                  onCheckedChange={(checked) => updateCustomization('billing', { [field.key]: checked })}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'விரைவு அளவுகள்' : 'Quick Quantities'}</CardTitle>
          <CardDescription>
            {language === 'ta' ? 'POS இல் விரைவு அளவு பொத்தான்கள்' : 'Quick quantity buttons in POS'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {billing.quickQuantities.map((qty: number, index: number) => (
              <div key={index} className="flex items-center gap-1">
                <Input
                  type="number"
                  value={qty}
                  onChange={(e) => {
                    const newQty = [...billing.quickQuantities];
                    newQty[index] = parseInt(e.target.value) || 1;
                    updateCustomization('billing', { quickQuantities: newQty });
                  }}
                  className="w-20"
                />
              </div>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                updateCustomization('billing', { 
                  quickQuantities: [...billing.quickQuantities, 1] 
                });
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'ரவுண்ட் ஆஃப் முறை' : 'Round Off Method'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={billing.roundOffTo}
            onValueChange={(value) => updateCustomization('billing', { roundOffTo: value })}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">{language === 'ta' ? 'ரவுண்ட் வேண்டாம்' : 'No Rounding'}</SelectItem>
              <SelectItem value="nearest">{language === 'ta' ? 'அருகிலுள்ள' : 'Nearest'}</SelectItem>
              <SelectItem value="up">{language === 'ta' ? 'மேல்நோக்கி' : 'Round Up'}</SelectItem>
              <SelectItem value="down">{language === 'ta' ? 'கீழ்நோக்கி' : 'Round Down'}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}

// Product Fields Section
function ProductFieldsSection({ language, customization, updateCustomization }: any) {
  const fields = customization.productFields;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'ta' ? 'பொருள் புலங்கள்' : 'Product Fields'}</CardTitle>
        <CardDescription>
          {language === 'ta' ? 'பொருள் படிவத்தில் எந்த புலங்களை காட்ட வேண்டும்' : 'Choose which fields to show in product form'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: 'showTamilName', label: 'Tamil Name', labelTa: 'தமிழ் பெயர்' },
            { key: 'showHsnCode', label: 'HSN Code', labelTa: 'HSN குறியீடு' },
            { key: 'showBarcode', label: 'Barcode', labelTa: 'பார்கோடு' },
            { key: 'showMrp', label: 'MRP', labelTa: 'MRP' },
            { key: 'showGst', label: 'GST %', labelTa: 'GST %' },
            { key: 'showStock', label: 'Stock', labelTa: 'இருப்பு' },
            { key: 'showUnit', label: 'Unit', labelTa: 'அலகு' },
            { key: 'showLowStockThreshold', label: 'Low Stock Alert', labelTa: 'குறைந்த இருப்பு எச்சரிக்கை' },
            { key: 'showBatchNumber', label: 'Batch Number', labelTa: 'தொகுதி எண்' },
            { key: 'showExpiryDate', label: 'Expiry Date', labelTa: 'காலாவதி தேதி' },
            { key: 'showManufacturer', label: 'Manufacturer', labelTa: 'உற்பத்தியாளர்' },
            { key: 'showSupplier', label: 'Supplier', labelTa: 'சப்ளையர்' },
          ].map((field) => (
            <div key={field.key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-sm">{language === 'ta' ? field.labelTa : field.label}</span>
              <Switch
                checked={fields[field.key]}
                onCheckedChange={(checked) => updateCustomization('productFields', { [field.key]: checked })}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Customer Fields Section
function CustomerFieldsSection({ language, customization, updateCustomization }: any) {
  const fields = customization.customerFields;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'ta' ? 'வாடிக்கையாளர் புலங்கள்' : 'Customer Fields'}</CardTitle>
        <CardDescription>
          {language === 'ta' ? 'வாடிக்கையாளர் படிவத்தில் எந்த புலங்களை காட்ட வேண்டும்' : 'Choose which fields to show in customer form'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: 'showEmail', label: 'Email', labelTa: 'மின்னஞ்சல்' },
            { key: 'showAddress', label: 'Address', labelTa: 'முகவரி' },
            { key: 'showGstin', label: 'GSTIN', labelTa: 'GSTIN' },
            { key: 'showCreditLimit', label: 'Credit Limit', labelTa: 'கடன் வரம்பு' },
            { key: 'showLoyaltyPoints', label: 'Loyalty Points', labelTa: 'விசுவாச புள்ளிகள்' },
            { key: 'showBirthday', label: 'Birthday', labelTa: 'பிறந்த நாள்' },
            { key: 'showNotes', label: 'Notes', labelTa: 'குறிப்புகள்' },
          ].map((field) => (
            <div key={field.key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-sm">{language === 'ta' ? field.labelTa : field.label}</span>
              <Switch
                checked={fields[field.key]}
                onCheckedChange={(checked) => updateCustomization('customerFields', { [field.key]: checked })}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Dashboard Section
function DashboardSection({ language, customization, updateCustomization }: any) {
  const dashboard = customization.dashboard;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'டாஷ்போர்டு விட்ஜெட்கள்' : 'Dashboard Widgets'}</CardTitle>
          <CardDescription>
            {language === 'ta' ? 'எந்த விட்ஜெட்களை காட்ட வேண்டும் என்பதை தேர்வு செய்யவும்' : 'Choose which widgets to display'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'showTodaySales', label: 'Today Sales', labelTa: 'இன்றைய விற்பனை' },
              { key: 'showMonthSales', label: 'Month Sales', labelTa: 'மாத விற்பனை' },
              { key: 'showYearSales', label: 'Year Sales', labelTa: 'ஆண்டு விற்பனை' },
              { key: 'showPendingDues', label: 'Pending Dues', labelTa: 'நிலுவை தொகை' },
              { key: 'showTotalBills', label: 'Total Bills', labelTa: 'மொத்த பில்கள்' },
              { key: 'showSalesChart', label: 'Sales Chart', labelTa: 'விற்பனை வரைபடம்' },
              { key: 'showHourlyChart', label: 'Hourly Chart', labelTa: 'மணி நேர வரைபடம்' },
              { key: 'showTopSelling', label: 'Top Selling', labelTa: 'அதிக விற்பனை' },
              { key: 'showLowStock', label: 'Low Stock', labelTa: 'குறைந்த இருப்பு' },
              { key: 'showGstSummary', label: 'GST Summary', labelTa: 'GST சுருக்கம்' },
              { key: 'showRecentBills', label: 'Recent Bills', labelTa: 'சமீபத்திய பில்கள்' },
              { key: 'showQuickActions', label: 'Quick Actions', labelTa: 'விரைவு செயல்கள்' },
            ].map((field) => (
              <div key={field.key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm">{language === 'ta' ? field.labelTa : field.label}</span>
                <Switch
                  checked={dashboard[field.key]}
                  onCheckedChange={(checked) => updateCustomization('dashboard', { [field.key]: checked })}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'வரைபட வகை' : 'Chart Type'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {['area', 'bar', 'line'].map((type) => (
              <button
                key={type}
                onClick={() => updateCustomization('dashboard', { chartType: type })}
                className={cn(
                  "px-4 py-2 rounded-lg border-2 capitalize transition-all",
                  dashboard.chartType === type
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Tax Section
function TaxSection({ language, customization, updateCustomization }: any) {
  const tax = customization.tax;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'வரி அமைப்புகள்' : 'Tax Settings'}</CardTitle>
          <CardDescription>
            {language === 'ta' ? 'GST மற்றும் வரி கணக்கீடு' : 'GST and tax calculation settings'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <span>{language === 'ta' ? 'GST இயக்கு' : 'Enable GST'}</span>
            <Switch
              checked={tax.enableGst}
              onCheckedChange={(checked) => updateCustomization('tax', { enableGst: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <span>{language === 'ta' ? 'GST பிரிவு காட்டு' : 'Show GST Breakup'}</span>
            <Switch
              checked={tax.showGstBreakup}
              onCheckedChange={(checked) => updateCustomization('tax', { showGstBreakup: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <span>{language === 'ta' ? 'GST உள்ளடக்கிய விலை' : 'GST Inclusive Pricing'}</span>
            <Switch
              checked={tax.inclusiveGst}
              onCheckedChange={(checked) => updateCustomization('tax', { inclusiveGst: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <span>{language === 'ta' ? 'Cess இயக்கு' : 'Enable Cess'}</span>
            <Switch
              checked={tax.enableCess}
              onCheckedChange={(checked) => updateCustomization('tax', { enableCess: checked })}
            />
          </div>

          {tax.enableCess && (
            <div className="space-y-2">
              <Label>Cess %</Label>
              <Input
                type="number"
                value={tax.cessPercent}
                onChange={(e) => updateCustomization('tax', { cessPercent: parseFloat(e.target.value) || 0 })}
                className="w-24"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'GST விகிதங்கள்' : 'GST Rates'}</CardTitle>
          <CardDescription>
            {language === 'ta' ? 'கிடைக்கும் GST விகிதங்களை நிர்வகிக்கவும்' : 'Manage available GST rates'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tax.gstRates.map((rate: number, index: number) => (
              <Badge key={index} variant="secondary" className="text-lg px-4 py-2">
                {rate}%
              </Badge>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <Label>{language === 'ta' ? 'இயல்புநிலை GST' : 'Default GST Rate'}</Label>
            <Select 
              value={String(tax.defaultGstRate)}
              onValueChange={(value) => updateCustomization('tax', { defaultGstRate: parseInt(value) })}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tax.gstRates.map((rate: number) => (
                  <SelectItem key={rate} value={String(rate)}>{rate}%</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Payment Modes Section
function PaymentModesSection({ language, customization, updateCustomization }: any) {
  const modes = customization.paymentModes.modes;

  const toggleMode = (id: string, enabled: boolean) => {
    const newModes = modes.map((m: any) => 
      m.id === id ? { ...m, enabled } : m
    );
    updateCustomization('paymentModes', { modes: newModes });
  };

  const setDefault = (id: string) => {
    const newModes = modes.map((m: any) => 
      ({ ...m, isDefault: m.id === id })
    );
    updateCustomization('paymentModes', { modes: newModes });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'ta' ? 'பணம் செலுத்தும் முறைகள்' : 'Payment Modes'}</CardTitle>
        <CardDescription>
          {language === 'ta' ? 'பணம் செலுத்தும் விருப்பங்களை நிர்வகிக்கவும்' : 'Manage payment options'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {modes.map((mode: any) => (
            <div key={mode.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{mode.icon}</span>
                <div>
                  <p className="font-medium">{language === 'ta' ? mode.nameTamil : mode.name}</p>
                  {mode.isDefault && (
                    <Badge variant="outline" className="text-xs">{language === 'ta' ? 'இயல்புநிலை' : 'Default'}</Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant={mode.isDefault ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDefault(mode.id)}
                  disabled={mode.isDefault}
                >
                  {language === 'ta' ? 'இயல்புநிலை' : 'Set Default'}
                </Button>
                <Switch
                  checked={mode.enabled}
                  onCheckedChange={(checked) => toggleMode(mode.id, checked)}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Units Section
function UnitsSection({ language, customization, updateCustomization }: any) {
  const units = customization.units.units;

  const toggleUnit = (id: string, enabled: boolean) => {
    const newUnits = units.map((u: any) => 
      u.id === id ? { ...u, enabled } : u
    );
    updateCustomization('units', { units: newUnits });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'ta' ? 'அளவீட்டு அலகுகள்' : 'Measurement Units'}</CardTitle>
        <CardDescription>
          {language === 'ta' ? 'பொருட்களுக்கு கிடைக்கும் அலகுகளை நிர்வகிக்கவும்' : 'Manage available units for products'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {units.map((unit: any) => (
            <div key={unit.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div>
                <p className="font-medium">{language === 'ta' ? unit.nameTamil : unit.name}</p>
                <p className="text-sm text-muted-foreground">{unit.symbol}</p>
              </div>
              <Switch
                checked={unit.enabled}
                onCheckedChange={(checked) => toggleUnit(unit.id, checked)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Categories Section
function CategoriesSection({ language, customization, updateCustomization }: any) {
  const productCategories = customization.categories.productCategories;
  const expenseCategories = customization.categories.expenseCategories;

  const toggleProductCategory = (id: string, enabled: boolean) => {
    const newCategories = productCategories.map((c: any) => 
      c.id === id ? { ...c, enabled } : c
    );
    updateCustomization('categories', { productCategories: newCategories });
  };

  const toggleExpenseCategory = (id: string, enabled: boolean) => {
    const newCategories = expenseCategories.map((c: any) => 
      c.id === id ? { ...c, enabled } : c
    );
    updateCustomization('categories', { expenseCategories: newCategories });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'பொருள் வகைகள்' : 'Product Categories'}</CardTitle>
          <CardDescription>
            {language === 'ta' ? 'பொருள் வகைகளை நிர்வகிக்கவும்' : 'Manage product categories'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {productCategories.map((cat: any) => (
              <div key={cat.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{cat.icon}</span>
                  <span className="font-medium">{language === 'ta' ? cat.nameTamil : cat.name}</span>
                </div>
                <Switch
                  checked={cat.enabled}
                  onCheckedChange={(checked) => toggleProductCategory(cat.id, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'செலவு வகைகள்' : 'Expense Categories'}</CardTitle>
          <CardDescription>
            {language === 'ta' ? 'செலவு வகைகளை நிர்வகிக்கவும்' : 'Manage expense categories'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {expenseCategories.map((cat: any) => (
              <div key={cat.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{cat.icon}</span>
                  <span className="font-medium">{language === 'ta' ? cat.nameTamil : cat.name}</span>
                </div>
                <Switch
                  checked={cat.enabled}
                  onCheckedChange={(checked) => toggleExpenseCategory(cat.id, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Appearance Section
function AppearanceSection({ language, setLanguage, theme, setTheme, customization, updateCustomization }: any) {
  const appearance = customization.appearance;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'மொழி & தீம்' : 'Language & Theme'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <Label className="text-base">{language === 'ta' ? 'மொழி' : 'Language'}</Label>
                <p className="text-sm text-muted-foreground">{language === 'ta' ? 'செயலி மொழி' : 'App language'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('en')}
              >
                English
              </Button>
              <Button
                variant={language === 'ta' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('ta')}
              >
                தமிழ்
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                {theme === 'light' ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-primary" />}
              </div>
              <div>
                <Label className="text-base">{language === 'ta' ? 'தீம்' : 'Theme'}</Label>
                <p className="text-sm text-muted-foreground">{language === 'ta' ? 'ஒளி அல்லது இருள்' : 'Light or dark mode'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('light')}
                className="gap-2"
              >
                <Sun className="h-4 w-4" />
                {language === 'ta' ? 'ஒளி' : 'Light'}
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('dark')}
                className="gap-2"
              >
                <Moon className="h-4 w-4" />
                {language === 'ta' ? 'இருள்' : 'Dark'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'வண்ண தீம்' : 'Color Theme'}</CardTitle>
          <CardDescription>{language === 'ta' ? 'உங்கள் விருப்ப நிறத்தை தேர்வு செய்யவும்' : 'Choose your preferred color scheme'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {colorPalettes.map((palette) => (
              <button
                key={palette.name}
                onClick={() => updateCustomization('appearance', { 
                  primaryColor: palette.primary,
                  accentColor: palette.accent 
                })}
                className={cn(
                  "p-3 rounded-xl border-2 text-center transition-all",
                  appearance.primaryColor === palette.primary
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex gap-1 justify-center mb-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.primary }} />
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.accent }} />
                </div>
                <span className="text-xs font-medium">{palette.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'எழுத்துரு' : 'Typography'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{language === 'ta' ? 'எழுத்துரு குடும்பம்' : 'Font Family'}</Label>
            <div className="grid grid-cols-2 gap-3">
              {fontOptions.map((font) => (
                <button
                  key={font.id}
                  onClick={() => updateCustomization('appearance', { fontFamily: font.id })}
                  className={cn(
                    "p-3 rounded-xl border-2 text-left transition-all",
                    appearance.fontFamily === font.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <p className="font-medium">{font.name}</p>
                  <p className="text-sm text-muted-foreground">{font.sample}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{language === 'ta' ? 'எழுத்து அளவு' : 'Font Size'}</Label>
            <Select 
              value={appearance.fontSize}
              onValueChange={(value) => updateCustomization('appearance', { fontSize: value })}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">{language === 'ta' ? 'சிறியது' : 'Small'}</SelectItem>
                <SelectItem value="medium">{language === 'ta' ? 'நடுத்தரம்' : 'Medium'}</SelectItem>
                <SelectItem value="large">{language === 'ta' ? 'பெரியது' : 'Large'}</SelectItem>
                <SelectItem value="xlarge">{language === 'ta' ? 'மிகப் பெரியது' : 'Extra Large'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{language === 'ta' ? 'மூலை வளைவு' : 'Border Radius'}</Label>
            <Select 
              value={appearance.borderRadius}
              onValueChange={(value) => updateCustomization('appearance', { borderRadius: value })}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{language === 'ta' ? 'இல்லை' : 'None'}</SelectItem>
                <SelectItem value="small">{language === 'ta' ? 'சிறியது' : 'Small'}</SelectItem>
                <SelectItem value="medium">{language === 'ta' ? 'நடுத்தரம்' : 'Medium'}</SelectItem>
                <SelectItem value="large">{language === 'ta' ? 'பெரியது' : 'Large'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'வடிவமைப்பு' : 'Formatting'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{language === 'ta' ? 'எண் வடிவம்' : 'Number Format'}</Label>
              <Select 
                value={appearance.numberFormat}
                onValueChange={(value) => updateCustomization('appearance', { numberFormat: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indian">Indian (1,00,000)</SelectItem>
                  <SelectItem value="international">International (100,000)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{language === 'ta' ? 'தேதி வடிவம்' : 'Date Format'}</Label>
              <Select 
                value={appearance.dateFormat}
                onValueChange={(value) => updateCustomization('appearance', { dateFormat: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{language === 'ta' ? 'நாணய சின்னம்' : 'Currency Symbol'}</Label>
              <Select 
                value={appearance.currencySymbol}
                onValueChange={(value) => updateCustomization('appearance', { currencySymbol: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="₹">₹ (Rupee Symbol)</SelectItem>
                  <SelectItem value="Rs.">Rs.</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{language === 'ta' ? 'நாணய நிலை' : 'Currency Position'}</Label>
              <Select 
                value={appearance.currencyPosition}
                onValueChange={(value) => updateCustomization('appearance', { currencyPosition: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="before">{language === 'ta' ? 'முன் (₹100)' : 'Before (₹100)'}</SelectItem>
                  <SelectItem value="after">{language === 'ta' ? 'பின் (100₹)' : 'After (100₹)'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'ta' ? 'இதர விருப்பங்கள்' : 'Other Preferences'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'compactMode', label: 'Compact Mode', labelTa: 'கச்சிதமான பயன்முறை' },
              { key: 'showAnimations', label: 'Animations', labelTa: 'அனிமேஷன்கள்' },
              { key: 'showTooltips', label: 'Tooltips', labelTa: 'குறிப்புகள்' },
              { key: 'sidebarCollapsed', label: 'Collapse Sidebar', labelTa: 'பக்கப்பட்டி சுருக்கு' },
            ].map((field) => (
              <div key={field.key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-sm">{language === 'ta' ? field.labelTa : field.label}</span>
                <Switch
                  checked={appearance[field.key]}
                  onCheckedChange={(checked) => updateCustomization('appearance', { [field.key]: checked })}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Notifications Section
function NotificationsSection({ language, customization, updateCustomization }: any) {
  const notifications = customization.notifications;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'ta' ? 'அறிவிப்பு அமைப்புகள்' : 'Notification Settings'}</CardTitle>
        <CardDescription>
          {language === 'ta' ? 'எச்சரிக்கைகள் மற்றும் நினைவூட்டல்களை நிர்வகிக்கவும்' : 'Manage alerts and reminders'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {[
            { key: 'enableLowStockAlert', label: 'Low Stock Alerts', labelTa: 'குறைந்த இருப்பு எச்சரிக்கை' },
            { key: 'enableDueReminder', label: 'Due Reminders', labelTa: 'நிலுவை நினைவூட்டல்' },
            { key: 'enableDailySummary', label: 'Daily Summary', labelTa: 'தினசரி சுருக்கம்' },
            { key: 'enableSoundEffects', label: 'Sound Effects', labelTa: 'ஒலி விளைவுகள்' },
            { key: 'enableEmailNotifications', label: 'Email Notifications', labelTa: 'மின்னஞ்சல் அறிவிப்புகள்' },
          ].map((field) => (
            <div key={field.key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-sm">{language === 'ta' ? field.labelTa : field.label}</span>
              <Switch
                checked={notifications[field.key]}
                onCheckedChange={(checked) => updateCustomization('notifications', { [field.key]: checked })}
              />
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{language === 'ta' ? 'குறைந்த இருப்பு அளவு' : 'Low Stock Threshold'}</Label>
            <Input
              type="number"
              value={notifications.lowStockThreshold}
              onChange={(e) => updateCustomization('notifications', { lowStockThreshold: parseInt(e.target.value) || 10 })}
              className="w-32"
            />
          </div>

          <div className="space-y-2">
            <Label>{language === 'ta' ? 'நிலுவை நினைவூட்டல் நாட்கள்' : 'Due Reminder Days'}</Label>
            <Input
              type="number"
              value={notifications.dueReminderDays}
              onChange={(e) => updateCustomization('notifications', { dueReminderDays: parseInt(e.target.value) || 7 })}
              className="w-32"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
