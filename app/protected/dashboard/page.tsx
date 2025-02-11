'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
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
      const res = await fetch('/api/auth/logout', {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Logout failed');
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          
          <div className="space-y-2">
            {[
              { icon: BarChart, label: 'Dashboard' },
              { icon: Users, label: 'Team' },
              { icon: Calendar, label: 'Schedule' },
              { icon: Settings, label: 'Settings' }
            ].map((item, i) => (
              <button
                key={i}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
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
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: TrendingUp, label: 'Performance', value: '92%', trend: '+2.5%' },
              { icon: Users, label: 'Team Members', value: '12', trend: '+1' },
              { icon: Activity, label: 'Active Projects', value: '8', trend: '-1' },
              { icon: Clock, label: 'Hours Logged', value: '164', trend: '+24' }
            ].map((stat, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                      <span className={`text-sm ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.trend} from last month
                      </span>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="w-full h-full flex items-end space-x-2">
                    {performanceData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-blue-500 rounded-t-md transition-all duration-300 hover:bg-blue-600"
                          style={{ height: `${(data.value / 700) * 100}%` }}
                        />
                        <span className="text-sm text-gray-600 mt-2">{data.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: 'Project Update', desc: 'New milestone achieved in Project Alpha', time: '2 hours ago' },
                    { title: 'Team Meeting', desc: 'Weekly sync with development team', time: '4 hours ago' },
                    { title: 'System Alert', desc: 'Server performance optimization completed', time: '6 hours ago' },
                    { title: 'New Assignment', desc: 'Task assigned by Team Lead', time: '8 hours ago' }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Activity className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-500">{activity.desc}</p>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
