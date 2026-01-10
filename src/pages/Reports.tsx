import { motion } from 'framer-motion';
import { 
  FileText,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { mockBills, dashboardStats } from '@/data/mockData';
import { AppLayout } from '@/components/layout/AppLayout';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['hsl(234, 89%, 54%)', 'hsl(24, 95%, 53%)', 'hsl(160, 84%, 39%)', 'hsl(199, 89%, 48%)'];

const categoryData = [
  { name: 'Groceries', value: 45 },
  { name: 'Dairy', value: 20 },
  { name: 'Personal Care', value: 18 },
  { name: 'Others', value: 17 },
];

export default function Reports() {
  const { language, bills } = useApp();

  const totalSales = bills.reduce((sum, bill) => sum + bill.total, 0);
  const paidBills = bills.filter(b => b.status === 'paid').length;
  const pendingAmount = bills.filter(b => b.status === 'pending').reduce((sum, b) => sum + b.total, 0);

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
              {language === 'ta' ? 'அறிக்கைகள்' : 'Reports'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ta' 
                ? 'உங்கள் வணிக செயல்திறனை பகுப்பாய்வு செய்யுங்கள்'
                : 'Analyze your business performance'
              }
            </p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="this-month">
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">
                  {language === 'ta' ? 'இன்று' : 'Today'}
                </SelectItem>
                <SelectItem value="this-week">
                  {language === 'ta' ? 'இந்த வாரம்' : 'This Week'}
                </SelectItem>
                <SelectItem value="this-month">
                  {language === 'ta' ? 'இந்த மாதம்' : 'This Month'}
                </SelectItem>
                <SelectItem value="this-year">
                  {language === 'ta' ? 'இந்த ஆண்டு' : 'This Year'}
                </SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              {language === 'ta' ? 'ஏற்றுமதி' : 'Export'}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ta' ? 'மொத்த விற்பனை' : 'Total Sales'}
                  </p>
                  <p className="text-2xl font-bold font-mono mt-1">
                    {formatCurrency(dashboardStats.monthSales)}
                  </p>
                  <p className="text-sm text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +12.5% vs last month
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ta' ? 'மொத்த பில்கள்' : 'Total Bills'}
                  </p>
                  <p className="text-2xl font-bold font-mono mt-1">
                    {dashboardStats.monthBillsCount}
                  </p>
                  <p className="text-sm text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +8% vs last month
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <FileText className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ta' ? 'சராசரி பில்' : 'Avg. Bill Value'}
                  </p>
                  <p className="text-2xl font-bold font-mono mt-1">
                    {formatCurrency(dashboardStats.monthSales / dashboardStats.monthBillsCount)}
                  </p>
                  <p className="text-sm text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +5.2% vs last month
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-info/10">
                  <TrendingUp className="h-6 w-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ta' ? 'நிலுவை தொகை' : 'Pending Amount'}
                  </p>
                  <p className="text-2xl font-bold font-mono mt-1">
                    {formatCurrency(dashboardStats.pendingDues)}
                  </p>
                  <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                    <TrendingDown className="h-3 w-3" />
                    3 bills pending
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-warning/10">
                  <TrendingDown className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                {language === 'ta' ? 'விற்பனை போக்கு' : 'Sales Trend'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardStats.salesTrend}>
                    <defs>
                      <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(234, 89%, 54%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(234, 89%, 54%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), 'Sales']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="hsl(234, 89%, 54%)" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#salesGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ta' ? 'வகை வாரியான விற்பனை' : 'Sales by Category'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categoryData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm">{item.name}</span>
                    <span className="text-sm text-muted-foreground ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bills Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {language === 'ta' ? 'சமீபத்திய பரிவர்த்தனைகள்' : 'Recent Transactions'}
            </CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              {language === 'ta' ? 'வடிகட்டு' : 'Filter'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      {language === 'ta' ? 'பில் எண்' : 'Bill No'}
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      {language === 'ta' ? 'வாடிக்கையாளர்' : 'Customer'}
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      {language === 'ta' ? 'தேதி' : 'Date'}
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      {language === 'ta' ? 'பொருட்கள்' : 'Items'}
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                      {language === 'ta' ? 'தொகை' : 'Amount'}
                    </th>
                    <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">
                      {language === 'ta' ? 'நிலை' : 'Status'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockBills.map((bill) => (
                    <tr key={bill.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-2">
                        <span className="font-mono font-medium">{bill.billNumber}</span>
                      </td>
                      <td className="py-4 px-2">{bill.customerName}</td>
                      <td className="py-4 px-2 text-muted-foreground">
                        {formatDate(bill.date)}
                      </td>
                      <td className="py-4 px-2">{bill.items.length} items</td>
                      <td className="py-4 px-2 text-right">
                        <span className="font-mono font-semibold">{formatCurrency(bill.total)}</span>
                      </td>
                      <td className="py-4 px-2 text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          bill.status === 'paid' 
                            ? 'bg-success/10 text-success'
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {bill.status === 'paid' 
                            ? (language === 'ta' ? 'செலுத்தப்பட்டது' : 'Paid')
                            : (language === 'ta' ? 'நிலுவை' : 'Pending')
                          }
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AppLayout>
  );
}
