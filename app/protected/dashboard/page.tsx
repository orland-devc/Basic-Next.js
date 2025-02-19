'use client';

import { MainLayout } from '@/app/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { TrendingUp, Users, Activity, Clock } from 'lucide-react';

const Dashboard = () => {
  const performanceData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 550 },
    { name: 'Apr', value: 450 },
    { name: 'May', value: 650 },
  ];

  return (
    <MainLayout>
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
    </MainLayout>
  );
};

export default Dashboard;