import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  IndianRupee, 
  ShoppingCart, 
  Users, 
  AlertTriangle,
  ArrowUpRight,
  Package,
  Receipt,
  PlusCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { formatCurrency, formatNumber, formatDate } from '@/utils/formatters';
import { dashboardStats, mockBills } from '@/data/mockData';
import { AppLayout } from '@/components/layout/AppLayout';
import { Link } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const statCards = [
  {
    title: 'Today\'s Sales',
    titleTa: 'இன்றைய விற்பனை',
    value: dashboardStats.todaySales,
    change: '+12.5%',
    trend: 'up',
    icon: IndianRupee,
    color: 'bg-primary',
  },
  {
    title: 'This Month',
    titleTa: 'இந்த மாதம்',
    value: dashboardStats.monthSales,
    change: '+8.2%',
    trend: 'up',
    icon: TrendingUp,
    color: 'bg-success',
  },
  {
    title: 'Pending Dues',
    titleTa: 'நிலுவை தொகை',
    value: dashboardStats.pendingDues,
    change: '-5.1%',
    trend: 'down',
    icon: Clock,
    color: 'bg-warning',
  },
  {
    title: 'Total Bills',
    titleTa: 'மொத்த பில்கள்',
    value: dashboardStats.todayBillsCount,
    change: '+18',
    trend: 'up',
    icon: Receipt,
    color: 'bg-info',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const { language, businessProfile } = useApp();

  return (
    <AppLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Welcome Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">
              {language === 'ta' ? 'வணக்கம்' : 'Welcome back'}, {businessProfile.ownerName.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ta' 
                ? 'இன்றைய உங்கள் வணிக சுருக்கம் இங்கே'
                : "Here's your business overview for today"
              }
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/billing">
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                {language === 'ta' ? 'புதிய பில்' : 'New Bill'}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {language === 'ta' ? stat.titleTa : stat.title}
                    </p>
                    <p className="text-2xl lg:text-3xl font-bold font-mono">
                      {stat.title.includes('Bills') 
                        ? formatNumber(stat.value)
                        : formatCurrency(stat.value)
                      }
                    </p>
                    <div className="flex items-center gap-1">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-success' : 'text-destructive'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {language === 'ta' ? 'நேற்றிலிருந்து' : 'vs yesterday'}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color} text-primary-foreground`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Trend Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">
                  {language === 'ta' ? 'விற்பனை போக்கு' : 'Sales Trend'}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">7D</Button>
                  <Button variant="secondary" size="sm" className="text-xs">30D</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dashboardStats.salesTrend}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(234 89% 54%)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(234 89% 54%)" stopOpacity={0}/>
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
                        stroke="hsl(234 89% 54%)" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorSales)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Hourly Sales */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">
                  {language === 'ta' ? 'மணி நேர விற்பனை' : 'Hourly Sales'}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardStats.hourlyData.slice(0, 8)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} hide />
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), 'Sales']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="sales" fill="hsl(24 95% 53%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Selling Items */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  {language === 'ta' ? 'அதிக விற்பனை' : 'Top Selling'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dashboardStats.topSellingItems.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.quantity} sold</p>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-success">
                      {formatCurrency(item.revenue)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Low Stock Alerts */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  {language === 'ta' ? 'குறைந்த இருப்பு' : 'Low Stock Alerts'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dashboardStats.lowStockItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-warning/10 border border-warning/20">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-warning" />
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'ta' ? 'குறைந்தபட்சம்' : 'Min'}: {item.threshold}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-warning text-warning-foreground text-sm font-bold">
                      {item.stock}
                    </span>
                  </div>
                ))}
                <Link to="/products">
                  <Button variant="outline" className="w-full mt-2">
                    {language === 'ta' ? 'இருப்பு நிர்வகி' : 'Manage Stock'}
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* GST Summary */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-info" />
                  {language === 'ta' ? 'GST சுருக்கம்' : 'GST Summary'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-info/10 border border-info/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">CGST Collected</span>
                    <span className="font-mono font-semibold">
                      {formatCurrency(dashboardStats.gstSummary.cgstCollected)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">SGST Collected</span>
                    <span className="font-mono font-semibold">
                      {formatCurrency(dashboardStats.gstSummary.sgstCollected)}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total GST</span>
                      <span className="font-mono font-bold text-lg text-info">
                        {formatCurrency(dashboardStats.gstSummary.totalGst)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link to="/gst-reports">
                  <Button variant="outline" className="w-full">
                    {language === 'ta' ? 'GST அறிக்கைகள்' : 'View GST Reports'}
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Bills */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-semibold">
                {language === 'ta' ? 'சமீபத்திய பில்கள்' : 'Recent Bills'}
              </CardTitle>
              <Link to="/reports">
                <Button variant="ghost" size="sm" className="gap-1">
                  {language === 'ta' ? 'அனைத்தும்' : 'View All'}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
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
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                        {language === 'ta' ? 'தொகை' : 'Amount'}
                      </th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">
                        {language === 'ta' ? 'நிலை' : 'Status'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBills.slice(0, 5).map((bill) => (
                      <tr key={bill.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-2">
                          <span className="font-mono font-medium text-sm">{bill.billNumber}</span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-sm">{bill.customerName}</span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-sm text-muted-foreground">{formatDate(bill.date)}</span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <span className="font-mono font-semibold">{formatCurrency(bill.total)}</span>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            bill.status === 'paid' 
                              ? 'bg-success/10 text-success'
                              : bill.status === 'pending'
                              ? 'bg-warning/10 text-warning'
                              : 'bg-info/10 text-info'
                          }`}>
                            {bill.status === 'paid' 
                              ? (language === 'ta' ? 'செலுத்தப்பட்டது' : 'Paid')
                              : bill.status === 'pending'
                              ? (language === 'ta' ? 'நிலுவை' : 'Pending')
                              : (language === 'ta' ? 'பகுதி' : 'Partial')
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
      </motion.div>
    </AppLayout>
  );
}
