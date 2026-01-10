import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Filter,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  Archive,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/contexts/AppContext';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { productCategories } from '@/data/mockData';
import { AppLayout } from '@/components/layout/AppLayout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['hsl(234 89% 54%)', 'hsl(24 95% 53%)', 'hsl(142 76% 36%)', 'hsl(48 96% 53%)', 'hsl(0 84% 60%)'];

export default function Stock() {
  const { language, products } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [activeTab, setActiveTab] = useState('overview');

  const stats = useMemo(() => {
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold);
    const outOfStock = products.filter(p => p.stock === 0);
    const healthy = products.filter(p => p.stock > p.lowStockThreshold);
    const totalValue = products.reduce((sum, p) => sum + (p.stock * p.price), 0);
    
    const categoryStats = productCategories.map(cat => {
      const catProducts = products.filter(p => p.category === cat.name);
      return {
        name: language === 'ta' ? cat.nameTamil : cat.name,
        value: catProducts.reduce((sum, p) => sum + (p.stock * p.price), 0),
        count: catProducts.length,
        stock: catProducts.reduce((sum, p) => sum + p.stock, 0),
      };
    }).filter(c => c.count > 0);

    // Dead stock (items not moving - simulated)
    const deadStock = products.filter(p => p.stock > 50 && Math.random() > 0.7);

    return {
      total: products.length,
      lowStock: lowStock.length,
      outOfStock: outOfStock.length,
      healthy: healthy.length,
      totalValue,
      lowStockItems: lowStock,
      outOfStockItems: outOfStock,
      categoryStats,
      deadStock,
    };
  }, [products, language]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.nameTamil.includes(searchQuery) ||
                           product.barcode.includes(searchQuery);
      const matchesCategory = selectedCategory === 'all' || 
                             product.category.toLowerCase().replace(' ', '-') === selectedCategory;
      
      let matchesStock = true;
      if (stockFilter === 'low') matchesStock = product.stock > 0 && product.stock <= product.lowStockThreshold;
      if (stockFilter === 'out') matchesStock = product.stock === 0;
      if (stockFilter === 'healthy') matchesStock = product.stock > product.lowStockThreshold;
      
      return matchesSearch && matchesCategory && matchesStock;
    });

    // Sort
    if (sortBy === 'stock-asc') result.sort((a, b) => a.stock - b.stock);
    if (sortBy === 'stock-desc') result.sort((a, b) => b.stock - a.stock);
    if (sortBy === 'value-desc') result.sort((a, b) => (b.stock * b.price) - (a.stock * a.price));
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [products, searchQuery, selectedCategory, stockFilter, sortBy]);

  const stockHealthData = [
    { name: language === 'ta' ? 'நல்ல இருப்பு' : 'Healthy', value: stats.healthy, color: 'hsl(142 76% 36%)' },
    { name: language === 'ta' ? 'குறைவான இருப்பு' : 'Low Stock', value: stats.lowStock, color: 'hsl(48 96% 53%)' },
    { name: language === 'ta' ? 'இருப்பு இல்லை' : 'Out of Stock', value: stats.outOfStock, color: 'hsl(0 84% 60%)' },
  ];

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
              {language === 'ta' ? 'இருப்பு மேலாண்மை' : 'Stock Management'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ta' 
                ? 'உங்கள் சரக்கு இருப்பை கண்காணிக்கவும்'
                : 'Monitor and manage your inventory'
              }
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {language === 'ta' ? 'புதுப்பி' : 'Refresh'}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'மொத்த பொருட்கள்' : 'Total Items'}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.healthy}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'நல்ல இருப்பு' : 'Healthy'}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-warning/10">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.lowStock}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'குறைவான இருப்பு' : 'Low Stock'}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-destructive/10">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.outOfStock}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'இருப்பு இல்லை' : 'Out of Stock'}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-2 lg:col-span-1">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-info/10">
                <BarChart3 className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-xl font-bold font-mono">{formatCurrency(stats.totalValue)}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'இருப்பு மதிப்பு' : 'Stock Value'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              {language === 'ta' ? 'கண்ணோட்டம்' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="inventory" className="gap-2">
              <Package className="h-4 w-4" />
              {language === 'ta' ? 'சரக்கு' : 'Inventory'}
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              {language === 'ta' ? 'எச்சரிக்கைகள்' : 'Alerts'}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stock Health Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === 'ta' ? 'இருப்பு நிலை' : 'Stock Health'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stockHealthData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {stockHealthData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => [value, 'Items']}
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {stockHealthData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}: {item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Category-wise Stock Value */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === 'ta' ? 'வகை வாரியான மதிப்பு' : 'Category-wise Value'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.categoryStats} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} fontSize={12} />
                        <YAxis dataKey="name" type="category" width={80} fontSize={10} />
                        <Tooltip 
                          formatter={(value: number) => [formatCurrency(value), 'Value']}
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="value" fill="hsl(234 89% 54%)" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dead Stock */}
            {stats.deadStock.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Archive className="h-5 w-5 text-muted-foreground" />
                    {language === 'ta' ? 'நகராத சரக்கு' : 'Dead Stock (Slow Moving)'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stats.deadStock.slice(0, 6).map((item) => (
                      <div key={item.id} className="p-4 rounded-lg bg-muted/50 border">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.category}</p>
                          </div>
                          <Badge variant="secondary">{item.stock} {item.unit}</Badge>
                        </div>
                        <p className="text-sm mt-2 text-muted-foreground">
                          {language === 'ta' ? 'மதிப்பு' : 'Value'}: {formatCurrency(item.stock * item.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'ta' ? 'பொருள் தேடு...' : 'Search products...'}
                  className="pl-9"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'ta' ? 'அனைத்தும்' : 'All'}</SelectItem>
                  {productCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {language === 'ta' ? cat.nameTamil : cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Package className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'ta' ? 'அனைத்தும்' : 'All Stock'}</SelectItem>
                  <SelectItem value="healthy">{language === 'ta' ? 'நல்ல இருப்பு' : 'Healthy'}</SelectItem>
                  <SelectItem value="low">{language === 'ta' ? 'குறைவான' : 'Low Stock'}</SelectItem>
                  <SelectItem value="out">{language === 'ta' ? 'இருப்பு இல்லை' : 'Out of Stock'}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">{language === 'ta' ? 'பெயர்' : 'Name'}</SelectItem>
                  <SelectItem value="stock-asc">{language === 'ta' ? 'இருப்பு ↑' : 'Stock ↑'}</SelectItem>
                  <SelectItem value="stock-desc">{language === 'ta' ? 'இருப்பு ↓' : 'Stock ↓'}</SelectItem>
                  <SelectItem value="value-desc">{language === 'ta' ? 'மதிப்பு ↓' : 'Value ↓'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Inventory Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'பொருள்' : 'Product'}
                        </th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'வகை' : 'Category'}
                        </th>
                        <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'இருப்பு' : 'Stock'}
                        </th>
                        <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'நிலை' : 'Status'}
                        </th>
                        <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                          {language === 'ta' ? 'மதிப்பு' : 'Value'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => {
                        const stockPercent = Math.min((product.stock / (product.lowStockThreshold * 3)) * 100, 100);
                        const stockStatus = product.stock === 0 ? 'out' : 
                                           product.stock <= product.lowStockThreshold ? 'low' : 'healthy';
                        return (
                          <tr key={product.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-xs text-muted-foreground">{product.nameTamil}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <Badge variant="outline">{product.category}</Badge>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex flex-col items-center gap-1">
                                <span className="font-mono font-semibold">
                                  {product.stock} {product.unit}
                                </span>
                                <Progress 
                                  value={stockPercent} 
                                  className={`h-1.5 w-20 ${
                                    stockStatus === 'out' ? '[&>div]:bg-destructive' :
                                    stockStatus === 'low' ? '[&>div]:bg-warning' : '[&>div]:bg-success'
                                  }`}
                                />
                                <span className="text-xs text-muted-foreground">
                                  Min: {product.lowStockThreshold}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <Badge variant={
                                stockStatus === 'out' ? 'destructive' :
                                stockStatus === 'low' ? 'secondary' : 'default'
                              } className={stockStatus === 'healthy' ? 'bg-success text-success-foreground' : ''}>
                                {stockStatus === 'out' 
                                  ? (language === 'ta' ? 'இருப்பு இல்லை' : 'Out')
                                  : stockStatus === 'low'
                                  ? (language === 'ta' ? 'குறைவு' : 'Low')
                                  : (language === 'ta' ? 'நல்லது' : 'OK')
                                }
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="font-mono font-semibold">
                                {formatCurrency(product.stock * product.price)}
                              </span>
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

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            {/* Low Stock Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-warning">
                  <AlertTriangle className="h-5 w-5" />
                  {language === 'ta' ? 'குறைவான இருப்பு' : 'Low Stock Alerts'} ({stats.lowStock})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.lowStockItems.length > 0 ? (
                  <div className="space-y-3">
                    {stats.lowStockItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-warning/10 border border-warning/20">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-warning" />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {language === 'ta' ? 'குறைந்தபட்சம்' : 'Threshold'}: {item.lowStockThreshold} {item.unit}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-warning">{item.stock}</p>
                          <p className="text-sm text-muted-foreground">{item.unit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    {language === 'ta' ? 'குறைவான இருப்பு இல்லை' : 'No low stock items'}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Out of Stock */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  {language === 'ta' ? 'இருப்பு இல்லை' : 'Out of Stock'} ({stats.outOfStock})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.outOfStockItems.length > 0 ? (
                  <div className="space-y-3">
                    {stats.outOfStockItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                        <div className="flex items-center gap-3">
                          <XCircle className="h-5 w-5 text-destructive" />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          {language === 'ta' ? 'கொள்முதல்' : 'Reorder'}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    {language === 'ta' ? 'அனைத்து பொருட்களும் இருப்பில் உள்ளன' : 'All items are in stock'}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
}
