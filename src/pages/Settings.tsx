import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Globe, 
  Palette, 
  Receipt,
  Building2,
  Save,
  Upload,
  CreditCard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';
import { businessCategories, tamilNaduDistricts } from '@/data/mockData';
import { AppLayout } from '@/components/layout/AppLayout';
import { toast } from 'sonner';

export default function Settings() {
  const { 
    language, 
    setLanguage, 
    theme, 
    setTheme, 
    businessProfile, 
    updateBusinessProfile 
  } = useApp();

  const [localProfile, setLocalProfile] = useState(businessProfile);
  const [gstEnabled, setGstEnabled] = useState(!!businessProfile.gstin);

  const handleSaveProfile = () => {
    updateBusinessProfile(localProfile);
    toast.success(language === 'ta' ? 'அமைப்புகள் சேமிக்கப்பட்டது' : 'Settings saved successfully');
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 max-w-4xl"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">
            {language === 'ta' ? 'அமைப்புகள்' : 'Settings'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'ta' 
              ? 'உங்கள் வணிக விருப்பங்களை தனிப்பயனாக்குங்கள்'
              : 'Customize your business preferences'
            }
          </p>
        </div>

        <Tabs defaultValue="business" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-lg">
            <TabsTrigger value="business" className="gap-2">
              <Building2 className="h-4 w-4 hidden sm:block" />
              {language === 'ta' ? 'வணிகம்' : 'Business'}
            </TabsTrigger>
            <TabsTrigger value="invoice" className="gap-2">
              <Receipt className="h-4 w-4 hidden sm:block" />
              {language === 'ta' ? 'பில்' : 'Invoice'}
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="h-4 w-4 hidden sm:block" />
              {language === 'ta' ? 'தோற்றம்' : 'Look'}
            </TabsTrigger>
            <TabsTrigger value="payment" className="gap-2">
              <CreditCard className="h-4 w-4 hidden sm:block" />
              {language === 'ta' ? 'பணம்' : 'Payment'}
            </TabsTrigger>
          </TabsList>

          {/* Business Profile */}
          <TabsContent value="business" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ta' ? 'வணிக விவரங்கள்' : 'Business Details'}
                </CardTitle>
                <CardDescription>
                  {language === 'ta' 
                    ? 'உங்கள் வணிக தகவல்களை புதுப்பிக்கவும்'
                    : 'Update your business information'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <div className="space-y-2">
                  <Label>{language === 'ta' ? 'பின்கோடு' : 'Pincode'}</Label>
                  <Input
                    value={localProfile.pincode}
                    onChange={(e) => setLocalProfile({ ...localProfile, pincode: e.target.value })}
                    maxLength={6}
                    className="w-32"
                  />
                </div>

                {/* GST Section */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Label className="text-base">
                        {language === 'ta' ? 'GST பதிவு' : 'GST Registered'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ta' 
                          ? 'GST பதிவு செய்த வணிகம்'
                          : 'Enable if your business is GST registered'
                        }
                      </p>
                    </div>
                    <Switch
                      checked={gstEnabled}
                      onCheckedChange={setGstEnabled}
                    />
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
                </div>

                <Button onClick={handleSaveProfile} className="gap-2">
                  <Save className="h-4 w-4" />
                  {language === 'ta' ? 'சேமி' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoice Settings */}
          <TabsContent value="invoice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ta' ? 'பில் அமைப்புகள்' : 'Invoice Settings'}
                </CardTitle>
                <CardDescription>
                  {language === 'ta' 
                    ? 'உங்கள் பில் வடிவமைப்பை தனிப்பயனாக்குங்கள்'
                    : 'Customize your invoice format'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{language === 'ta' ? 'பில் கீழ்க்குறிப்பு' : 'Invoice Footer'}</Label>
                  <Textarea
                    value={localProfile.invoiceFooter}
                    onChange={(e) => setLocalProfile({ ...localProfile, invoiceFooter: e.target.value })}
                    placeholder="Thank you for shopping with us!"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{language === 'ta' ? 'நிதி ஆண்டு' : 'Financial Year'}</Label>
                  <Select 
                    value={localProfile.financialYear}
                    onValueChange={(value) => setLocalProfile({ ...localProfile, financialYear: value })}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-25">2024-25</SelectItem>
                      <SelectItem value="2025-26">2025-26</SelectItem>
                      <SelectItem value="2026-27">2026-27</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <Label className="text-base">
                    {language === 'ta' ? 'லோகோ பதிவேற்றம்' : 'Logo Upload'}
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-xl bg-secondary flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      {language === 'ta' ? 'பதிவேற்று' : 'Upload'}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ta' 
                      ? 'PNG, JPG (அதிகபட்சம் 500KB)'
                      : 'PNG, JPG up to 500KB'
                    }
                  </p>
                </div>

                <Button onClick={handleSaveProfile} className="gap-2">
                  <Save className="h-4 w-4" />
                  {language === 'ta' ? 'சேமி' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ta' ? 'தோற்றம்' : 'Appearance'}
                </CardTitle>
                <CardDescription>
                  {language === 'ta' 
                    ? 'உங்கள் செயலியின் தோற்றத்தை தனிப்பயனாக்குங்கள்'
                    : 'Customize how your app looks'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Language */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label className="text-base">
                        {language === 'ta' ? 'மொழி' : 'Language'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ta' ? 'செயலி மொழி' : 'App language'}
                      </p>
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

                {/* Theme */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {theme === 'light' ? (
                        <Sun className="h-5 w-5 text-primary" />
                      ) : (
                        <Moon className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <Label className="text-base">
                        {language === 'ta' ? 'தீம்' : 'Theme'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ta' ? 'ஒளி அல்லது இருள்' : 'Light or dark mode'}
                      </p>
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
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ta' ? 'பணம் செலுத்தும் முறைகள்' : 'Payment Methods'}
                </CardTitle>
                <CardDescription>
                  {language === 'ta' 
                    ? 'பணம் செலுத்தும் விருப்பங்களை நிர்வகிக்கவும்'
                    : 'Configure your payment options'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💵</span>
                    <span className="font-medium">
                      {language === 'ta' ? 'ரொக்கம்' : 'Cash'}
                    </span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📱</span>
                    <span className="font-medium">UPI</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💳</span>
                    <span className="font-medium">
                      {language === 'ta' ? 'கார்டு' : 'Card'}
                    </span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📝</span>
                    <span className="font-medium">
                      {language === 'ta' ? 'கடன்' : 'Credit'}
                    </span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏦</span>
                    <span className="font-medium">
                      {language === 'ta' ? 'வங்கி பரிமாற்றம்' : 'Bank Transfer'}
                    </span>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
}
