import { 
  LayoutDashboard, 
  Receipt, 
  Package, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  ShoppingCart,
  Wallet,
  BarChart3,
  Bell,
  HelpCircle,
  Building2,
  UserCog
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const mainMenuItems = [
  { title: 'Dashboard', titleTa: 'டாஷ்போர்டு', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Quick Bill', titleTa: 'விரைவு பில்', url: '/billing', icon: Receipt },
  { title: 'Products', titleTa: 'பொருட்கள்', url: '/products', icon: Package },
  { title: 'Customers', titleTa: 'வாடிக்கையாளர்கள்', url: '/customers', icon: Users },
];

const businessMenuItems = [
  { title: 'Purchases', titleTa: 'கொள்முதல்', url: '/purchases', icon: ShoppingCart },
  { title: 'Expenses', titleTa: 'செலவுகள்', url: '/expenses', icon: Wallet },
  { title: 'Stock', titleTa: 'இருப்பு', url: '/stock', icon: Package },
];

const reportsMenuItems = [
  { title: 'Reports', titleTa: 'அறிக்கைகள்', url: '/reports', icon: FileText },
  { title: 'GST Reports', titleTa: 'ஜிஎஸ்டி அறிக்கைகள்', url: '/gst-reports', icon: BarChart3 },
];

const adminMenuItems = [
  { title: 'Staff', titleTa: 'ஊழியர்கள்', url: '/staff', icon: UserCog },
  { title: 'Business', titleTa: 'வணிகம்', url: '/business-profile', icon: Building2 },
  { title: 'Settings', titleTa: 'அமைப்புகள்', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const { language, currentUser, logout, businessProfile } = useApp();
  const isCollapsed = state === 'collapsed';

  const renderMenuItem = (item: { title: string; titleTa: string; url: string; icon: React.ComponentType<{ className?: string }> }) => {
    const isActive = location.pathname === item.url;
    const Icon = item.icon;
    
    return (
      <SidebarMenuItem key={item.url}>
        <SidebarMenuButton asChild>
          <Link
            to={item.url}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200',
              isActive
                ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg'
                : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && (
              <span className="font-medium">
                {language === 'ta' ? item.titleTa : item.title}
              </span>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className="border-r-0 bg-primary">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground font-bold text-lg">
            ₹
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-sidebar-foreground truncate max-w-[140px]">
                {businessProfile.businessName}
              </span>
              <span className="text-xs text-sidebar-foreground/70">
                {language === 'ta' ? 'பில்லிங் மென்பொருள்' : 'Billing Software'}
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider mb-2">
            {!isCollapsed && (language === 'ta' ? 'முதன்மை' : 'Main')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainMenuItems.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider mb-2">
            {!isCollapsed && (language === 'ta' ? 'வணிகம்' : 'Business')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {businessMenuItems.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider mb-2">
            {!isCollapsed && (language === 'ta' ? 'அறிக்கைகள்' : 'Reports')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {reportsMenuItems.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider mb-2">
            {!isCollapsed && (language === 'ta' ? 'நிர்வாகம்' : 'Admin')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {adminMenuItems.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-sidebar-accent">
            <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
              {currentUser?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {currentUser?.name || 'User'}
              </p>
              <p className="text-xs text-sidebar-foreground/70 capitalize">
                {currentUser?.role || 'Staff'}
              </p>
            </div>
          )}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
