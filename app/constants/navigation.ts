import { BarChart, Users, Calendar, Settings } from 'lucide-react';

export const navigationItems = [
  { icon: BarChart, label: 'Dashboards', path: '/protected/dashboard' },
  { icon: Users, label: 'Team', path: '/protected/team' },
  { icon: Calendar, label: 'Schedule', path: '/protected/schedule' },
  { icon: Settings, label: 'Settings', path: '/protected/settings' }
];