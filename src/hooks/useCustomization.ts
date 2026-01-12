import { useApp } from '@/contexts/AppContext';
import { useMemo } from 'react';

export function useCustomization() {
  const { customization, updateCustomization } = useApp();

  const enabledPaymentModes = useMemo(() => {
    return customization.paymentModes.modes.filter(m => m.enabled);
  }, [customization.paymentModes.modes]);

  const defaultPaymentMode = useMemo(() => {
    return customization.paymentModes.modes.find(m => m.isDefault) || enabledPaymentModes[0];
  }, [customization.paymentModes.modes, enabledPaymentModes]);

  const enabledUnits = useMemo(() => {
    return customization.units.units.filter(u => u.enabled);
  }, [customization.units.units]);

  const enabledProductCategories = useMemo(() => {
    return customization.categories.productCategories.filter(c => c.enabled);
  }, [customization.categories.productCategories]);

  const enabledExpenseCategories = useMemo(() => {
    return customization.categories.expenseCategories.filter(c => c.enabled);
  }, [customization.categories.expenseCategories]);

  const gstRates = useMemo(() => {
    return customization.tax.gstRates;
  }, [customization.tax.gstRates]);

  return {
    customization,
    updateCustomization,
    enabledPaymentModes,
    defaultPaymentMode,
    enabledUnits,
    enabledProductCategories,
    enabledExpenseCategories,
    gstRates,
    // Billing shortcuts
    enableGst: customization.billing.enableGst,
    enableDiscount: customization.billing.enableDiscount,
    enableRoundOff: customization.billing.enableRoundOff,
    showMrp: customization.billing.showMrp,
    showStock: customization.billing.showStock,
    // Appearance shortcuts
    compactMode: customization.appearance.compactMode,
    showAnimations: customization.appearance.showAnimations,
    currencySymbol: customization.appearance.currencySymbol,
    dateFormat: customization.appearance.dateFormat,
    numberFormat: customization.appearance.numberFormat,
  };
}
