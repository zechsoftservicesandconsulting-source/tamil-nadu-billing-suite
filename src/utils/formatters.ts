// Indian number formatting utilities

/**
 * Format number in Indian currency style (₹1,23,456.00)
 */
export function formatCurrency(amount: number, showSymbol = true): string {
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  
  return showSymbol ? `₹${formatted}` : formatted;
}

/**
 * Format number in Indian style (1,23,456)
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Format date in Indian style (10 Jan 2026)
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format date and time
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Generate bill number
 */
export function generateBillNumber(prefix = 'INV'): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${year}-${random}`;
}

/**
 * Calculate GST split (CGST + SGST)
 */
export function calculateGST(amount: number, gstPercent: number) {
  const totalGst = (amount * gstPercent) / 100;
  return {
    cgst: totalGst / 2,
    sgst: totalGst / 2,
    total: totalGst,
  };
}

/**
 * Round off to nearest rupee
 */
export function roundOff(amount: number): { rounded: number; roundOff: number } {
  const rounded = Math.round(amount);
  return {
    rounded,
    roundOff: rounded - amount,
  };
}

/**
 * Format mobile number (Indian)
 */
export function formatMobile(mobile: string): string {
  const cleaned = mobile.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return mobile;
}

/**
 * Validate GSTIN format
 */
export function isValidGSTIN(gstin: string): boolean {
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin);
}
