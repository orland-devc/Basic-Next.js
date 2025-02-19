// app/components/layout/MainLayout.tsx
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Shield } from 'lucide-react';
import { BarChart, Users, Calendar, Settings } from 'lucide-react';



// Import all components
import { 
  SearchBar,
  NotificationBell,
  LogoutButton,
  SideBar
} from '@/app/components';

// Types can be moved to a separate types file
interface User {
  name: string;
  email: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
}

// Navigation items can be moved to a constants file
const navigationItems = [
  { icon: 'BarChart', label: 'Dashboard', path: '/protected/dashboard' },
  { icon: 'Users', label: 'Team', path: '/protected/team' },
  { icon: 'Calendar', label: 'Schedule', path: '/protected/schedule' },
  { icon: 'Settings', label: 'Settings', path: '/protected/settings' }
];

export const MainLayout = ({ children }: MainLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/protected/user');
      if (!res.ok) throw new Error('Failed to fetch user data');
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (!res.ok) throw new Error('Logout failed');
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-800">Enterprise Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <SearchBar />
              <NotificationBell 
                showNotifications={showNotifications}
                setShowNotifications={setShowNotifications}
              />
              <LogoutButton onLogout={handleLogout} />
            </div>
          </div>
        </div>
      </nav>

    {/* Sidebar */}
      <SideBar 
        user={user}
        navigationItems={navigationItems}
        currentPath={pathname}
        onNavigate={(path) => router.push(path)}
      />


      {/* Main Content */}
      <div className="ml-64 pt-16">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </div>
    </div>

    
  );
};