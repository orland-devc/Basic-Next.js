// app/protected/settings/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    LogOut, User, Shield, Clock, Settings, Bell, Search,
    TrendingUp, Users, Calendar, BarChart, Activity
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    } from "@/app/components/ui/card";

// Define user type
interface User {
    name: string;
    email: string;
    // Add other user properties as needed
}

const SettingsPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);

    const teamMembers = [
        { name: 'John Doe', role: 'Lead Developer', status: 'Active' },
        { name: 'Jane Smith', role: 'UI Designer', status: 'In Meeting' },
        { name: 'Mike Johnson', role: 'Product Manager', status: 'Away' },
        // Add more team members as needed
      ];

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
        const res = await fetch('/api/auth/logout', {
            method: 'POST'
        });
        if (!res.ok) throw new Error('Logout failed');
        router.push('/login');
        } catch (error) {
        console.error('Error logging out:', error);
        }
    };

    const navigationItems = [
        { icon: BarChart, label: 'Dashboard', path: '/protected/dashboard' },
        { icon: Users, label: 'Team', path: '/protected/team' },
        { icon: Calendar, label: 'Schedule', path: '/protected/schedule' },
        { icon: Settings, label: 'Settings', path: '/protected/settings' }
    ];

    const performanceData = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 550 },
        { name: 'Apr', value: 450 },
        { name: 'May', value: 650 },
    ];

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
                <div className="relative">
                    <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 px-4 py-2 pr-8 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                
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
                
                <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </button>
                </div>
            </div>
            </div>
        </nav>

        {/* Sidebar */}
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
                    onClick={() => router.push(item.path)}
                    className={`w-full flex items-center px-4 py-2 text-sm ${
                    pathname === item.path 
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

        {/* Main Content */}
        <div className="ml-64 pt-16">
            <div className="max-w-7xl mx-auto p-8">
            {/* Schedule Page Content */}
                <div className="p-8">
                    <h1 className="text-2xl font-bold mb-6 text-gray-700">Settings</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                        <CardHeader>
                            <CardTitle>Profile Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                type="text"
                                className="mt-1 px-3 py-2 text-gray-700 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-blue-500"
                                value={user?.name || 'user@example.com'}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                type="email"
                                className="mt-1 px-3 py-2 text-gray-700 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-blue-500"
                                value={user?.email || 'user@example.com'}
                                />
                            </div>
                            </div>
                        </CardContent>
                        </Card>

                        <Card>
                        <CardHeader>
                            <CardTitle>Preferences</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                                <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"/>
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Dark Mode</span>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                                <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"/>
                                </button>
                            </div>
                            </div>
                        </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
    );
};

export default SettingsPage;