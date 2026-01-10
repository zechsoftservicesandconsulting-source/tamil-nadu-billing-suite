import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Receipt, FileText, Download, Calendar, TrendingUp, IndianRupee, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/contexts/AppContext';
import { formatCurrency } from '@/utils/formatters';
import { dashboardStats } from '@/data/mockData';
import { AppLayout } from '@/components/layout/AppLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const gstr1Data = [
  { invoiceNo: 'INV-2026-0001', date: '2026-01-10', customerName: 'Selvam', gstin: '-', taxable: 375, cgst: 9.38, sgst: 9.38, total: 394 },
  { invoiceNo: 'INV-2026-0002', date: '2026-01-10', customerName: 'Murugan Stores', gstin: '33AABCU9603R1ZM', taxable: 5650, cgst: 141.25, sgst: 141.25, total: 5783 },
  { invoiceNo: 'INV-2026-0003', date: '2026-01-09', customerName: 'Anbu Supermarket', gstin: '33AABCU9603R1ZP', taxable: 3700, cgst: 333, sgst: 333, total: 4306 },
];

const hsnData = [
  { hsn: '1006', description: 'Rice', taxable: 24000, gstRate: 5, cgst: 600, sgst: 600, total: 25200 },
  { hsn: '0713', description: 'Pulses', taxable: 14500, gstRate: 5, cgst: 362.5, sgst: 362.5, total: 15225 },
  { hsn: '1512', description: 'Oils', taxable: 13500, gstRate: 5, cgst: 337.5, sgst: 337.5, total: 14175 },
  { hsn: '3401', description: 'Soap', taxable: 5200, gstRate: 18, cgst: 468, sgst: 468, total: 6136 },
  { hsn: '1905', description: 'Biscuits', taxable: 10000, gstRate: 18, cgst: 900, sgst: 900, total: 11800 },
];

const monthlyGst = [
  { month: 'Oct', cgst: 6500, sgst: 6500 },
  { month: 'Nov', cgst: 7200, sgst: 7200 },
  { month: 'Dec', cgst: 8100, sgst: 8100 },
  { month: 'Jan', cgst: 8450, sgst: 8450 },
];

export default function GSTReports() {
  const { language } = useApp();
  const [period, setPeriod] = useState('jan-2026');

  const stats = dashboardStats.gstSummary;

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{language === 'ta' ? 'GST அறிக்கைகள்' : 'GST Reports'}</h1>
            <p className="text-muted-foreground mt-1">{language === 'ta' ? 'வரி அறிக்கைகள் மற்றும் தாக்கல்' : 'Tax reports and filing summary'}</p>
          </div>
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40"><Calendar className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="jan-2026">Jan 2026</SelectItem>
                <SelectItem value="dec-2025">Dec 2025</SelectItem>
                <SelectItem value="nov-2025">Nov 2025</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />{language === 'ta' ? 'ஏற்றுமதி' : 'Export'}</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card><CardContent className="p-4 flex items-center gap-3"><div className="p-3 rounded-xl bg-primary/10"><Receipt className="h-5 w-5 text-primary" /></div><div><p className="text-2xl font-bold font-mono">{formatCurrency(stats.cgstCollected)}</p><p className="text-sm text-muted-foreground">CGST Collected</p></div></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3"><div className="p-3 rounded-xl bg-accent/10"><Receipt className="h-5 w-5 text-accent" /></div><div><p className="text-2xl font-bold font-mono">{formatCurrency(stats.sgstCollected)}</p><p className="text-sm text-muted-foreground">SGST Collected</p></div></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3"><div className="p-3 rounded-xl bg-success/10"><IndianRupee className="h-5 w-5 text-success" /></div><div><p className="text-2xl font-bold font-mono">{formatCurrency(stats.totalGst)}</p><p className="text-sm text-muted-foreground">{language === 'ta' ? 'மொத்த GST' : 'Total GST'}</p></div></CardContent></Card>
        </div>

        <Tabs defaultValue="gstr1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gstr1">GSTR-1</TabsTrigger>
            <TabsTrigger value="hsn">{language === 'ta' ? 'HSN சுருக்கம்' : 'HSN Summary'}</TabsTrigger>
            <TabsTrigger value="trend">{language === 'ta' ? 'போக்கு' : 'Trend'}</TabsTrigger>
          </TabsList>

          <TabsContent value="gstr1"><Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b bg-muted/50"><th className="text-left py-3 px-4 text-sm font-medium">Invoice</th><th className="text-left py-3 px-4 text-sm font-medium">Date</th><th className="text-left py-3 px-4 text-sm font-medium">Customer</th><th className="text-left py-3 px-4 text-sm font-medium">GSTIN</th><th className="text-right py-3 px-4 text-sm font-medium">Taxable</th><th className="text-right py-3 px-4 text-sm font-medium">CGST</th><th className="text-right py-3 px-4 text-sm font-medium">SGST</th><th className="text-right py-3 px-4 text-sm font-medium">Total</th></tr></thead><tbody>{gstr1Data.map((row) => (<tr key={row.invoiceNo} className="border-b hover:bg-muted/50"><td className="py-3 px-4 font-mono text-sm">{row.invoiceNo}</td><td className="py-3 px-4 text-sm">{row.date}</td><td className="py-3 px-4 text-sm">{row.customerName}</td><td className="py-3 px-4 text-xs">{row.gstin}</td><td className="py-3 px-4 text-right font-mono">{formatCurrency(row.taxable)}</td><td className="py-3 px-4 text-right font-mono">{formatCurrency(row.cgst)}</td><td className="py-3 px-4 text-right font-mono">{formatCurrency(row.sgst)}</td><td className="py-3 px-4 text-right font-mono font-semibold">{formatCurrency(row.total)}</td></tr>))}</tbody></table></div></CardContent></Card></TabsContent>

          <TabsContent value="hsn"><Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b bg-muted/50"><th className="text-left py-3 px-4 text-sm font-medium">HSN</th><th className="text-left py-3 px-4 text-sm font-medium">Description</th><th className="text-right py-3 px-4 text-sm font-medium">Taxable</th><th className="text-center py-3 px-4 text-sm font-medium">Rate</th><th className="text-right py-3 px-4 text-sm font-medium">CGST</th><th className="text-right py-3 px-4 text-sm font-medium">SGST</th><th className="text-right py-3 px-4 text-sm font-medium">Total</th></tr></thead><tbody>{hsnData.map((row) => (<tr key={row.hsn} className="border-b hover:bg-muted/50"><td className="py-3 px-4 font-mono">{row.hsn}</td><td className="py-3 px-4">{row.description}</td><td className="py-3 px-4 text-right font-mono">{formatCurrency(row.taxable)}</td><td className="py-3 px-4 text-center"><Badge variant="outline">{row.gstRate}%</Badge></td><td className="py-3 px-4 text-right font-mono">{formatCurrency(row.cgst)}</td><td className="py-3 px-4 text-right font-mono">{formatCurrency(row.sgst)}</td><td className="py-3 px-4 text-right font-mono font-semibold">{formatCurrency(row.total)}</td></tr>))}</tbody></table></div></CardContent></Card></TabsContent>

          <TabsContent value="trend"><Card><CardHeader><CardTitle>{language === 'ta' ? 'மாதாந்திர GST போக்கு' : 'Monthly GST Trend'}</CardTitle></CardHeader><CardContent><div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={monthlyGst}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="month" /><YAxis tickFormatter={(v) => `₹${v/1000}K`} /><Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} /><Bar dataKey="cgst" name="CGST" fill="hsl(234 89% 54%)" radius={[4,4,0,0]} /><Bar dataKey="sgst" name="SGST" fill="hsl(24 95% 53%)" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div></CardContent></Card></TabsContent>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
}
