import { Activity, Bell } from "lucide-react";

// Components/NotificationBell.tsx
interface NotificationBellProps {
    showNotifications: boolean;
    setShowNotifications: (show: boolean) => void;
}
    
export const NotificationBell = ({ showNotifications, setShowNotifications }: NotificationBellProps) => (
    <div className="relative">
    <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2 rounded-full hover:bg-gray-100 relative"
    >
        <Bell className="h-6 w-6 text-gray-600" />
        <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
        3
        </span>
    </button>
    
    {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100">
        <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Notifications</h3>
            <div className="space-y-3">
            {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                <Activity className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                    <p className="text-sm text-gray-800">New activity detected</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    )}
    </div>
);