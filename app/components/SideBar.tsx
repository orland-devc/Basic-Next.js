import { User, BarChart, Users, Calendar, Settings } from "lucide-react";

// Components/Sidebar.tsx
interface User {
  name: string;
  email: string;
}

interface SidebarProps {
    user: User | null;
    navigationItems: Array<{ icon: any; label: string; path: string; }>;
    currentPath: string;
    onNavigate: (path: string) => void;
}

export const SideBar = ({ user, navigationItems, currentPath, onNavigate }: SidebarProps) => (
  <div className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 p-4">
    <div className="space-y-6">
      <div className="flex flex-col items-center p-4">
        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-gray-800">{user?.name || 'User'}</h3>
        <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
      </div>
      
      <div className="space-y-2">
        {navigationItems.map((item, i) => (
          <button
            key={i}
            onClick={() => onNavigate(item.path)}
            className={`w-full flex items-center px-4 py-2 text-sm ${
              currentPath === item.path 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            } rounded-md transition-colors`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);