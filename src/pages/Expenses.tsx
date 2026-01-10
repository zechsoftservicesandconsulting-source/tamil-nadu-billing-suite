import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  Filter,
  TrendingDown,
  Building2,
  Zap,
  Users,
  Truck,
  Wrench,
  Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/contexts/AppContext';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { expenseCategories, paymentModes, Expense } from '@/data/mockData';
import { AppLayout } from '@/components/layout/AppLayout';
import { toast } from 'sonner';

const categoryIcons: Record<string, any> = {
  'Rent': Building2,
  'Electricity': Zap,
  'Staff Salary': Users,
  'Transport': Truck,
  'Maintenance': Wrench,
  'Miscellaneous': Package,
};

const initialExpenseState: Partial<Expense> = {
  date: new Date().toISOString().split('T')[0],
  category: 'Miscellaneous',
  description: '',
  amount: 0,
  paymentMode: 'Cash',
};

export default function Expenses() {
  const { language, expenses, addExpense } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState<Partial<Expense>>(initialExpenseState);
  const [activeTab, setActiveTab] = useState('expenses');

  // Mock cash flow data
  const [cashIn] = useState([
    { id: 'CI001', date: '2026-01-10', description: 'Cash from sales', amount: 15780, mode: 'Cash' },
    { id: 'CI002', date: '2026-01-09', description: 'UPI collection', amount: 8500, mode: 'UPI' },
    { id: 'CI003', date: '2026-01-08', description: 'Outstanding received - Murugan', amount: 5000, mode: 'Bank Transfer' },
  ]);

  const [cashOut] = useState([
    { id: 'CO001', date: '2026-01-10', description: 'Petty cash withdrawal', amount: 2000, mode: 'Cash' },
    { id: 'CO002', date: '2026-01-09', description: 'Supplier payment - Lakshmi', amount: 15000, mode: 'Bank Transfer' },
  ]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           expense.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, searchQuery, selectedCategory]);

  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().slice(0, 7);
    
    return {
      today: expenses.filter(e => e.date === today).reduce((sum, e) => sum + e.amount, 0),
      thisMonth: expenses.filter(e => e.date.startsWith(thisMonth)).reduce((sum, e) => sum + e.amount, 0),
      total: expenses.reduce((sum, e) => sum + e.amount, 0),
      byCategory: expenseCategories.map(cat => ({
        ...cat,
        amount: expenses.filter(e => e.category === cat.name).reduce((sum, e) => sum + e.amount, 0)
      }))
    };
  }, [expenses]);

  const handleSubmit = () => {
    if (!formData.description || !formData.amount) {
      toast.error(language === 'ta' ? 'தேவையான புலங்களை நிரப்பவும்' : 'Please fill required fields');
      return;
    }

    const newExpense: Expense = {
      ...initialExpenseState,
      ...formData,
      id: `E${Date.now()}`,
    } as Expense;
    
    addExpense(newExpense);
    toast.success(language === 'ta' ? 'செலவு சேர்க்கப்பட்டது' : 'Expense added');
    setShowAddDialog(false);
    setFormData(initialExpenseState);
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
              {language === 'ta' ? 'செலவுகள்' : 'Expenses'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ta' 
                ? 'தினசரி செலவுகளை கண்காணிக்கவும்'
                : 'Track daily expenses and cash flow'
              }
            </p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {language === 'ta' ? 'செலவு சேர்' : 'Add Expense'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {language === 'ta' ? 'புதிய செலவு' : 'New Expense'}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>{language === 'ta' ? 'தேதி' : 'Date'}</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>{language === 'ta' ? 'வகை' : 'Category'}</Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.icon} {language === 'ta' ? cat.nameTamil : cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{language === 'ta' ? 'விவரம்*' : 'Description*'}</Label>
                  <Input
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={language === 'ta' ? 'செலவு விவரம்' : 'Expense details'}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{language === 'ta' ? 'தொகை*' : 'Amount*'}</Label>
                  <Input
                    type="number"
                    value={formData.amount || ''}
                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label>{language === 'ta' ? 'செலுத்தும் முறை' : 'Payment Mode'}</Label>
                  <Select 
                    value={formData.paymentMode}
                    onValueChange={(value) => setFormData({ ...formData, paymentMode: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentModes.map((mode) => (
                        <SelectItem key={mode.id} value={mode.name}>
                          {mode.icon} {language === 'ta' ? mode.nameTamil : mode.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSubmit} className="w-full mt-2">
                  {language === 'ta' ? 'சேர்' : 'Add Expense'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-destructive/10">
                <TrendingDown className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono">{formatCurrency(stats.today)}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'இன்றைய செலவு' : "Today's Expenses"}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-warning/10">
                <Wallet className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono">{formatCurrency(stats.thisMonth)}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'இந்த மாத செலவு' : 'This Month'}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-info/10">
                <Calendar className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono">{formatCurrency(stats.total)}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'மொத்த செலவு' : 'Total Expenses'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="expenses" className="gap-2">
              <Wallet className="h-4 w-4" />
              {language === 'ta' ? 'செலவுகள்' : 'Expenses'}
            </TabsTrigger>
            <TabsTrigger value="cash-in" className="gap-2">
              <ArrowDownCircle className="h-4 w-4" />
              {language === 'ta' ? 'பணம் வரவு' : 'Cash In'}
            </TabsTrigger>
            <TabsTrigger value="cash-out" className="gap-2">
              <ArrowUpCircle className="h-4 w-4" />
              {language === 'ta' ? 'பணம் செலவு' : 'Cash Out'}
            </TabsTrigger>
          </TabsList>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-4">
            {/* Category Summary */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {stats.byCategory.map((cat) => {
                const Icon = categoryIcons[cat.name] || Package;
                return (
                  <Card key={cat.id} className="cursor-pointer hover:shadow-md transition-shadow" 
                        onClick={() => setSelectedCategory(selectedCategory === cat.name ? 'all' : cat.name)}>
                    <CardContent className="p-3 text-center">
                      <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        selectedCategory === cat.name ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {language === 'ta' ? cat.nameTamil : cat.name}
                      </p>
                      <p className="font-mono font-semibold text-sm">{formatCurrency(cat.amount)}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'ta' ? 'செலவு தேடு...' : 'Search expenses...'}
                  className="pl-9"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={language === 'ta' ? 'வகை' : 'Category'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'ta' ? 'அனைத்தும்' : 'All Categories'}
                  </SelectItem>
                  {expenseCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.icon} {language === 'ta' ? cat.nameTamil : cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Expenses List */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'தேதி' : 'Date'}
                        </th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'வகை' : 'Category'}
                        </th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'விவரம்' : 'Description'}
                        </th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'முறை' : 'Mode'}
                        </th>
                        <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'தொகை' : 'Amount'}
                        </th>
                        <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'செயல்' : 'Action'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExpenses.map((expense) => {
                        const Icon = categoryIcons[expense.category] || Package;
                        return (
                          <tr key={expense.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                            <td className="py-4 px-4">
                              <span className="text-sm">{formatDate(expense.date)}</span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{expense.category}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm">{expense.description}</span>
                            </td>
                            <td className="py-4 px-4">
                              <Badge variant="outline" className="text-xs">
                                {expense.paymentMode}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="font-mono font-semibold text-destructive">
                                -{formatCurrency(expense.amount)}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <div className="flex justify-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cash In Tab */}
          <TabsContent value="cash-in" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-success">
                  <ArrowDownCircle className="h-5 w-5" />
                  {language === 'ta' ? 'பணம் வரவு' : 'Cash Inflow'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'தேதி' : 'Date'}
                        </th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'விவரம்' : 'Description'}
                        </th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'முறை' : 'Mode'}
                        </th>
                        <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'தொகை' : 'Amount'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cashIn.map((item) => (
                        <tr key={item.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="py-4 px-4">
                            <span className="text-sm">{formatDate(item.date)}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm">{item.description}</span>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className="text-xs">{item.mode}</Badge>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span className="font-mono font-semibold text-success">
                              +{formatCurrency(item.amount)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-success/10">
                        <td colSpan={3} className="py-4 px-4 font-medium">
                          {language === 'ta' ? 'மொத்தம்' : 'Total'}
                        </td>
                        <td className="py-4 px-4 text-right font-mono font-bold text-success">
                          +{formatCurrency(cashIn.reduce((sum, i) => sum + i.amount, 0))}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cash Out Tab */}
          <TabsContent value="cash-out" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <ArrowUpCircle className="h-5 w-5" />
                  {language === 'ta' ? 'பணம் செலவு' : 'Cash Outflow'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'தேதி' : 'Date'}
                        </th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'விவரம்' : 'Description'}
                        </th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'முறை' : 'Mode'}
                        </th>
                        <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'தொகை' : 'Amount'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cashOut.map((item) => (
                        <tr key={item.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="py-4 px-4">
                            <span className="text-sm">{formatDate(item.date)}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm">{item.description}</span>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className="text-xs">{item.mode}</Badge>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span className="font-mono font-semibold text-destructive">
                              -{formatCurrency(item.amount)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-destructive/10">
                        <td colSpan={3} className="py-4 px-4 font-medium">
                          {language === 'ta' ? 'மொத்தம்' : 'Total'}
                        </td>
                        <td className="py-4 px-4 text-right font-mono font-bold text-destructive">
                          -{formatCurrency(cashOut.reduce((sum, i) => sum + i.amount, 0))}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
}
