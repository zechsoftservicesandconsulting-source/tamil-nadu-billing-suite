import { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ResizablePanelGroup direction="horizontal" className="min-h-screen">
          <ResizablePanel 
            defaultSize={18} 
            minSize={12} 
            maxSize={25}
            className="bg-primary"
          >
            <AppSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-border hover:bg-accent transition-colors" />
          <ResizablePanel defaultSize={82}>
            <div className="flex flex-col h-full">
              <AppHeader />
              <main className="flex-1 p-4 lg:p-6 overflow-auto">
                {children}
              </main>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </SidebarProvider>
  );
}
