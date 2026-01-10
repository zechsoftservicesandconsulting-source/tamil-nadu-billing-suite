import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Users, Shield, Phone, Mail, TrendingUp, UserCheck, UserX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { AppLayout } from '@/components/layout/AppLayout';
import { toast } from 'sonner';

const roleColors: Record<string, string> = {
  owner: 'bg-primary text-primary-foreground',
  manager: 'bg-info text-info-foreground',
  cashier: 'bg-success text-success-foreground',
  accountant: 'bg-warning text-warning-foreground',
};

const rolePermissions = {
  owner: ['Dashboard', 'Billing', 'Products', 'Customers', 'Purchases', 'Expenses', 'Reports', 'GST', 'Staff', 'Settings'],
  manager: ['Dashboard', 'Billing', 'Products', 'Customers', 'Purchases', 'Expenses', 'Reports'],
  cashier: ['Dashboard', 'Billing', 'Customers'],
  accountant: ['Dashboard', 'Reports', 'GST', 'Expenses', 'Purchases'],
};

export default function Staff() {
  const { language, staff } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', role: 'cashier' as const });

  const filteredStaff = staff.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.mobile.includes(searchQuery));
  const stats = { total: staff.length, active: staff.filter(s => s.isActive).length, totalSales: staff.reduce((sum, s) => sum + s.totalSales, 0) };

  const handleSubmit = () => {
    if (!formData.name || !formData.mobile) { toast.error('Please fill required fields'); return; }
    toast.success(language === 'ta' ? 'ஊழியர் சேர்க்கப்பட்டார்' : 'Staff added');
    setShowAddDialog(false);
    setFormData({ name: '', mobile: '', email: '', role: 'cashier' });
  };

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{language === 'ta' ? 'ஊழியர் மேலாண்மை' : 'Staff Management'}</h1>
            <p className="text-muted-foreground mt-1">{language === 'ta' ? 'பணியாளர்கள் மற்றும் பாத்திரங்கள்' : 'Manage employees and roles'}</p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" />{language === 'ta' ? 'ஊழியர் சேர்' : 'Add Staff'}</Button></DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader><DialogTitle>{language === 'ta' ? 'புதிய ஊழியர்' : 'New Staff'}</DialogTitle></DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2"><Label>{language === 'ta' ? 'பெயர்*' : 'Name*'}</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>{language === 'ta' ? 'மொபைல்*' : 'Mobile*'}</Label><Input value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Email</Label><Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
                </div>
                <div className="space-y-2"><Label>{language === 'ta' ? 'பாத்திரம்' : 'Role'}</Label><Select value={formData.role} onValueChange={(v: any) => setFormData({ ...formData, role: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="manager">Manager</SelectItem><SelectItem value="cashier">Cashier</SelectItem><SelectItem value="accountant">Accountant</SelectItem></SelectContent></Select></div>
                <Button onClick={handleSubmit} className="w-full mt-2">{language === 'ta' ? 'சேர்' : 'Add Staff'}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card><CardContent className="p-4 flex items-center gap-3"><div className="p-3 rounded-xl bg-primary/10"><Users className="h-5 w-5 text-primary" /></div><div><p className="text-2xl font-bold">{stats.total}</p><p className="text-sm text-muted-foreground">{language === 'ta' ? 'மொத்த ஊழியர்கள்' : 'Total Staff'}</p></div></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3"><div className="p-3 rounded-xl bg-success/10"><UserCheck className="h-5 w-5 text-success" /></div><div><p className="text-2xl font-bold">{stats.active}</p><p className="text-sm text-muted-foreground">{language === 'ta' ? 'செயலில்' : 'Active'}</p></div></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3"><div className="p-3 rounded-xl bg-info/10"><TrendingUp className="h-5 w-5 text-info" /></div><div><p className="text-xl font-bold font-mono">{formatCurrency(stats.totalSales)}</p><p className="text-sm text-muted-foreground">{language === 'ta' ? 'மொத்த விற்பனை' : 'Total Sales'}</p></div></CardContent></Card>
        </div>

        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={language === 'ta' ? 'ஊழியர் தேடு...' : 'Search staff...'} className="pl-9" /></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStaff.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">{member.name.split(' ').map(n => n[0]).join('')}</div>
                    <div><h3 className="font-semibold">{member.name}</h3><Badge className={`text-xs ${roleColors[member.role]}`}>{member.role.charAt(0).toUpperCase() + member.role.slice(1)}</Badge></div>
                  </div>
                  <div className="flex items-center gap-2"><Switch checked={member.isActive} /><Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="h-4 w-4" /></Button></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /><span>{member.mobile}</span></div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /><span>{member.email}</span></div>
                </div>
                {member.role !== 'owner' && member.role !== 'accountant' && (
                  <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                    <div><p className="text-xs text-muted-foreground">{language === 'ta' ? 'பில்கள்' : 'Bills'}</p><p className="font-semibold">{formatNumber(member.salesCount)}</p></div>
                    <div><p className="text-xs text-muted-foreground">{language === 'ta' ? 'விற்பனை' : 'Sales'}</p><p className="font-mono font-semibold">{formatCurrency(member.totalSales)}</p></div>
                  </div>
                )}
                <div className="mt-4 pt-4 border-t"><p className="text-xs text-muted-foreground mb-2"><Shield className="h-3 w-3 inline mr-1" />{language === 'ta' ? 'அணுகல்' : 'Access'}</p><div className="flex flex-wrap gap-1">{rolePermissions[member.role].map(p => <Badge key={p} variant="outline" className="text-xs">{p}</Badge>)}</div></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </AppLayout>
  );
}
