import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Package,
  Filter,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useApp } from '@/contexts/AppContext';
import { formatCurrency } from '@/utils/formatters';
import { productCategories, Product } from '@/data/mockData';
import { AppLayout } from '@/components/layout/AppLayout';
import { toast } from 'sonner';

const initialProductState: Partial<Product> = {
  name: '',
  nameTamil: '',
  category: 'Groceries',
  price: 0,
  mrp: 0,
  gstPercent: 5,
  hsnCode: '',
  stock: 0,
  unit: 'pcs',
  barcode: '',
  lowStockThreshold: 10,
  isActive: true,
};

export default function Products() {
  const { language, products, addProduct, updateProduct, deleteProduct } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>(initialProductState);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.nameTamil.includes(searchQuery) ||
                           product.barcode.includes(searchQuery);
      const matchesCategory = selectedCategory === 'all' || 
                             product.category.toLowerCase().replace(' ', '-') === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const stats = useMemo(() => ({
    total: products.length,
    active: products.filter(p => p.isActive).length,
    lowStock: products.filter(p => p.stock < p.lowStockThreshold).length,
    outOfStock: products.filter(p => p.stock === 0).length,
  }), [products]);

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      toast.error(language === 'ta' ? 'தேவையான புலங்களை நிரப்பவும்' : 'Please fill required fields');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      toast.success(language === 'ta' ? 'பொருள் புதுப்பிக்கப்பட்டது' : 'Product updated');
    } else {
      const newProduct: Product = {
        ...initialProductState,
        ...formData,
        id: `P${Date.now()}`,
      } as Product;
      addProduct(newProduct);
      toast.success(language === 'ta' ? 'பொருள் சேர்க்கப்பட்டது' : 'Product added');
    }

    setShowAddDialog(false);
    setEditingProduct(null);
    setFormData(initialProductState);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowAddDialog(true);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success(language === 'ta' ? 'பொருள் நீக்கப்பட்டது' : 'Product deleted');
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
              {language === 'ta' ? 'பொருட்கள்' : 'Products'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'ta' 
                ? 'உங்கள் சரக்கு பொருட்களை நிர்வகிக்கவும்'
                : 'Manage your inventory items'
              }
            </p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={(open) => {
            setShowAddDialog(open);
            if (!open) {
              setEditingProduct(null);
              setFormData(initialProductState);
            }
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {language === 'ta' ? 'பொருள் சேர்' : 'Add Product'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct 
                    ? (language === 'ta' ? 'பொருள் திருத்து' : 'Edit Product')
                    : (language === 'ta' ? 'புதிய பொருள்' : 'New Product')
                  }
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{language === 'ta' ? 'பொருள் பெயர்*' : 'Product Name*'}</Label>
                    <Input
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Rice (1kg)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{language === 'ta' ? 'தமிழ் பெயர்' : 'Tamil Name'}</Label>
                    <Input
                      value={formData.nameTamil || ''}
                      onChange={(e) => setFormData({ ...formData, nameTamil: e.target.value })}
                      placeholder="அரிசி (1கிலோ)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                        {productCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.name}>
                            {cat.icon} {language === 'ta' ? cat.nameTamil : cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>HSN Code</Label>
                    <Input
                      value={formData.hsnCode || ''}
                      onChange={(e) => setFormData({ ...formData, hsnCode: e.target.value })}
                      placeholder="1006"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{language === 'ta' ? 'விற்பனை விலை*' : 'Selling Price*'}</Label>
                    <Input
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      placeholder="120"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>MRP</Label>
                    <Input
                      type="number"
                      value={formData.mrp || ''}
                      onChange={(e) => setFormData({ ...formData, mrp: parseFloat(e.target.value) })}
                      placeholder="140"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GST %</Label>
                    <Select 
                      value={String(formData.gstPercent)}
                      onValueChange={(value) => setFormData({ ...formData, gstPercent: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0%</SelectItem>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="12">12%</SelectItem>
                        <SelectItem value="18">18%</SelectItem>
                        <SelectItem value="28">28%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{language === 'ta' ? 'இருப்பு' : 'Stock'}</Label>
                    <Input
                      type="number"
                      value={formData.stock || ''}
                      onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                      placeholder="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{language === 'ta' ? 'அலகு' : 'Unit'}</Label>
                    <Select 
                      value={formData.unit}
                      onValueChange={(value) => setFormData({ ...formData, unit: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pcs">Pieces</SelectItem>
                        <SelectItem value="kg">Kilogram</SelectItem>
                        <SelectItem value="g">Gram</SelectItem>
                        <SelectItem value="L">Litre</SelectItem>
                        <SelectItem value="ml">Millilitre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{language === 'ta' ? 'குறைந்த இருப்பு' : 'Low Stock'}</Label>
                    <Input
                      type="number"
                      value={formData.lowStockThreshold || ''}
                      onChange={(e) => setFormData({ ...formData, lowStockThreshold: parseInt(e.target.value) })}
                      placeholder="10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{language === 'ta' ? 'பார்கோடு' : 'Barcode'}</Label>
                  <Input
                    value={formData.barcode || ''}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                    placeholder="8901234567890"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>{language === 'ta' ? 'செயலில்' : 'Active'}</Label>
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                </div>

                <Button onClick={handleSubmit} className="w-full mt-2">
                  {editingProduct 
                    ? (language === 'ta' ? 'புதுப்பி' : 'Update')
                    : (language === 'ta' ? 'சேர்' : 'Add')
                  }
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'மொத்த பொருட்கள்' : 'Total Products'}
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
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ta' ? 'செயலில்' : 'Active'}
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
                  {language === 'ta' ? 'குறைந்த இருப்பு' : 'Low Stock'}
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
        </div>

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
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={language === 'ta' ? 'வகை' : 'Category'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === 'ta' ? 'அனைத்தும்' : 'All Categories'}
              </SelectItem>
              {productCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.icon} {language === 'ta' ? cat.nameTamil : cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Table */}
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
                    <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                      {language === 'ta' ? 'விலை' : 'Price'}
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">
                      GST
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">
                      {language === 'ta' ? 'இருப்பு' : 'Stock'}
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">
                      {language === 'ta' ? 'நிலை' : 'Status'}
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg">
                            📦
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.nameTamil}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="secondary">{product.category}</Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-mono font-semibold">{formatCurrency(product.price)}</span>
                        {product.mrp > product.price && (
                          <span className="block text-xs text-muted-foreground line-through">
                            {formatCurrency(product.mrp)}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline">{product.gstPercent}%</Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`font-mono font-semibold ${
                          product.stock === 0 
                            ? 'text-destructive'
                            : product.stock < product.lowStockThreshold
                            ? 'text-warning'
                            : 'text-success'
                        }`}>
                          {product.stock} {product.unit}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {product.isActive ? (
                          <Badge className="bg-success/10 text-success border-success/20">
                            {language === 'ta' ? 'செயலில்' : 'Active'}
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            {language === 'ta' ? 'செயலிழந்தது' : 'Inactive'}
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(product)}>
                              <Edit2 className="h-4 w-4 mr-2" />
                              {language === 'ta' ? 'திருத்து' : 'Edit'}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(product.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              {language === 'ta' ? 'நீக்கு' : 'Delete'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
