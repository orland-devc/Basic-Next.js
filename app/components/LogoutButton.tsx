// components/LogoutButton.tsx
'use client';

import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  onLogout: () => Promise<void>;
}

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <button
      onClick={onLogout}
      className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </button>
  );
};

