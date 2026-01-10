import { Navigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { AppLayout } from '@/components/layout/AppLayout';

// Placeholder pages for routes that aren't fully implemented yet

export function Purchases() {
  const { language } = useApp();
  return (
    <AppLayout>
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-2">
            {language === 'ta' ? 'கொள்முதல்' : 'Purchases'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'ta' ? 'விரைவில் வருகிறது...' : 'Coming soon...'}
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

export function Expenses() {
  const { language } = useApp();
  return (
    <AppLayout>
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">💰</div>
          <h2 className="text-2xl font-bold mb-2">
            {language === 'ta' ? 'செலவுகள்' : 'Expenses'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'ta' ? 'விரைவில் வருகிறது...' : 'Coming soon...'}
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

export function Stock() {
  const { language } = useApp();
  return (
    <AppLayout>
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold mb-2">
            {language === 'ta' ? 'இருப்பு மேலாண்மை' : 'Stock Management'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'ta' ? 'விரைவில் வருகிறது...' : 'Coming soon...'}
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

export function GSTReports() {
  const { language } = useApp();
  return (
    <AppLayout>
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold mb-2">
            {language === 'ta' ? 'GST அறிக்கைகள்' : 'GST Reports'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'ta' ? 'விரைவில் வருகிறது...' : 'Coming soon...'}
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

export function Staff() {
  const { language } = useApp();
  return (
    <AppLayout>
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">👥</div>
          <h2 className="text-2xl font-bold mb-2">
            {language === 'ta' ? 'ஊழியர் மேலாண்மை' : 'Staff Management'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'ta' ? 'விரைவில் வருகிறது...' : 'Coming soon...'}
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

export function BusinessProfile() {
  return <Navigate to="/settings" replace />;
}
