import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin,
  Building2,
  User,
  CreditCard,
  TrendingUp,
  MoreVertical,
  Edit2,
  History
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/contexts/AppContext';
import { formatCurrency, formatDate, formatMobile } from '@/utils/formatters';
import { Customer } from '@/data/mockData';
import { AppLayout } from '@/components/layout/AppLayout';
import { toast } from 'sonner';

const initialCustomerState: Partial<Customer> = {
  name: '',
  mobile: '',
  email: '',
  address: '',
  gstin: '',
  type: 'retail',
  creditLimit: 0,
  outstandingBalance: 0,
  totalPurchases: 0,
  lastPurchaseDate: '',
};

export default function Customers() {
  const { language, customers, addCustomer, updateCustomer } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [customerType, setCustomerType] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<Partial<Customer>>(initialCustomerState);

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           customer.mobile.includes(searchQuery);
      const matchesType = customerType === 'all' || customer.type === customerType;
      return matchesSearch && matchesType;
    });
  }, [customers, searchQuery, customerType]);

  const stats = useMemo(() => ({
    total: customers.length,
    retail: customers.filter(c => c.type === 'retail').length,
    wholesale: customers.filter(c => c.type === 'wholesale').length,
    credit: customers.filter(c => c.type === 'credit').length,
    totalOutstanding: customers.reduce((sum, c) => sum + c.outstandingBalance, 0),
  }), [customers]);

  const handleSubmit = () => {
    if (!formData.name || !formData.mobile) {
      toast.error(language === 'ta' ? 'தேவையான புலங்களை நிரப்பவும்' : 'Please fill required fields');
      return;
    }

    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
      toast.success(language === 'ta' ? 'வாடிக்கையாளர் புதுப்பிக்கப்பட்டது' : 'Customer updated');
    } else {
      const newCustomer: Customer = {
        ...initialCustomerState,
        ...formData,
        id: `C${Date.now()}`,
        lastPurchaseDate: new Date().toISOString().split('T')[0],
      } as Customer;
      addCustomer(newCustomer);
      toast.success(language === 'ta' ? 'வாடிக்கையாளர் சேர்க்கப்பட்டது' : 'Customer added');
    }

    setShowAddDialog(false);
    setEditingCustomer(null);
    setFormData(initialCustomerState);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData(customer);
    setShowAddDialog(true);
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">
              {language === 'ta' ? 'வாடிக்கையாளர்கள்' : 'Customers'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ta' 
                ? 'உங்கள் வாடிக்கையாளர்களை நிர்வகிக்கவும்'
                : 'Manage your customer relationships'
              }
            </p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={(open) => {
            setShowAddDialog(open);
            if (!open) {
              setEditingCustomer(null);
              setFormData(initialCustomerState);
            }
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {language === 'ta' ? 'வாடிக்கையாளர் சேர்' : 'Add Customer'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingCustomer 
                    ? (language === 'ta' ? 'வாடிக்கையாளர் திருத்து' : 'Edit Customer')
                    : (language === 'ta' ? 'புதிய வாடிக்கையாளர்' : 'New Customer')
                  }
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>{language === 'ta' ? 'பெயர்*' : 'Name*'}</Label>
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Murugan Stores"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{language === 'ta' ? 'மொபைல்*' : 'Mobile*'}</Label>
                    <Input
                      value={formData.mobile || ''}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="9876543210"
                      maxLength={10}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{language === 'ta' ? 'வகை' : 'Type'}</Label>
                    <Select 
                      value={formData.type}
                      onValueChange={(value: 'retail' | 'wholesale' | 'credit') => 
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">
                          {language === 'ta' ? 'சில்லறை' : 'Retail'}
                        </SelectItem>
                        <SelectItem value="wholesale">
                          {language === 'ta' ? 'மொத்தம்' : 'Wholesale'}
                        </SelectItem>
                        <SelectItem value="credit">
                          {language === 'ta' ? 'கடன்' : 'Credit'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>{language === 'ta' ? 'முகவரி' : 'Address'}</Label>
                  <Input
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123, Anna Nagar, Chennai"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>GSTIN</Label>
                    <Input
                      value={formData.gstin || ''}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                      placeholder="33AABCU9603R1ZM"
                      maxLength={15}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{language === 'ta' ? 'கடன் வரம்பு' : 'Credit Limit'}</Label>
                    <Input
                      type="number"
                      value={formData.creditLimit || ''}
                      onChange={(e) => setFormData({ ...formData, creditLimit: parseInt(e.target.value) })}
                      placeholder="50000"
                    />
                  </div>
                </div>

                <Button onClick={handleSubmit} className="w-full mt-2">
                  {editingCustomer 
                    ? (language === 'ta' ? 'புதுப்பி' : 'Update')
                    : (language === 'ta' ? 'சேர்' : 'Add')
                  }
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'மொத்தம்' : 'Total'}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-info/10">
                <User className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.retail}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'சில்லறை' : 'Retail'}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-success/10">
                <Building2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.wholesale}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'மொத்தம்' : 'Wholesale'}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-warning/10">
                <CreditCard className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.credit}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'கடன்' : 'Credit'}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-2 lg:col-span-1">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-destructive/10">
                <TrendingUp className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-xl font-bold font-mono">{formatCurrency(stats.totalOutstanding)}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'நிலுவை' : 'Outstanding'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ta' ? 'வாடிக்கையாளர் தேடு...' : 'Search customers...'}
              className="pl-9"
            />
          </div>
          <Tabs value={customerType} onValueChange={setCustomerType} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">
                {language === 'ta' ? 'அனைத்தும்' : 'All'}
              </TabsTrigger>
              <TabsTrigger value="retail">
                {language === 'ta' ? 'சில்லறை' : 'Retail'}
              </TabsTrigger>
              <TabsTrigger value="wholesale">
                {language === 'ta' ? 'மொத்தம்' : 'Wholesale'}
              </TabsTrigger>
              <TabsTrigger value="credit">
                {language === 'ta' ? 'கடன்' : 'Credit'}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-lg ${
                        customer.gstin 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-secondary text-muted-foreground'
                      }`}>
                        {customer.gstin ? <Building2 className="h-6 w-6" /> : <User className="h-6 w-6" />}
                      </div>
                      <div>
                        <h3 className="font-semibold">{customer.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {formatMobile(customer.mobile)}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(customer)}>
                          <Edit2 className="h-4 w-4 mr-2" />
                          {language === 'ta' ? 'திருத்து' : 'Edit'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <History className="h-4 w-4 mr-2" />
                          {language === 'ta' ? 'வரலாறு' : 'History'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-2 mb-4">
                    {customer.email && (
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </p>
                    )}
                    {customer.address && (
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {customer.address}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {language === 'ta' ? 'மொத்த வாங்குதல்' : 'Total Purchases'}
                      </p>
                      <p className="font-mono font-semibold text-success">
                        {formatCurrency(customer.totalPurchases)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {language === 'ta' ? 'நிலுவை' : 'Outstanding'}
                      </p>
                      <p className={`font-mono font-semibold ${
                        customer.outstandingBalance > 0 ? 'text-destructive' : 'text-success'
                      }`}>
                        {formatCurrency(customer.outstandingBalance)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Badge variant={
                      customer.type === 'retail' ? 'secondary' :
                      customer.type === 'wholesale' ? 'default' : 'outline'
                    }>
                      {customer.type === 'retail' 
                        ? (language === 'ta' ? 'சில்லறை' : 'Retail')
                        : customer.type === 'wholesale'
                        ? (language === 'ta' ? 'மொத்தம்' : 'Wholesale')
                        : (language === 'ta' ? 'கடன்' : 'Credit')
                      }
                    </Badge>
                    {customer.lastPurchaseDate && (
                      <span className="text-xs text-muted-foreground">
                        {language === 'ta' ? 'கடைசி:' : 'Last:'} {formatDate(customer.lastPurchaseDate)}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AppLayout>
  );
}
