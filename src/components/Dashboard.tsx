import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Activity, Users, DollarSign, TrendingUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const mockData = [
  { month: 'Jan', revenue: 4000, users: 2400 },
  { month: 'Feb', revenue: 3000, users: 1398 },
  { month: 'Mar', revenue: 9800, users: 2000 },
  { month: 'Apr', revenue: 3908, users: 2780 },
  { month: 'May', revenue: 4800, users: 1890 },
  { month: 'Jun', revenue: 3800, users: 2390 },
];

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
      </div>
      <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg">{icon}</div>
    </div>
    <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
      <TrendingUp className="w-4 h-4 mr-1" />
      <span>{change} vs last month</span>
    </div>
  </div>
);

export default function AnalyticsDashboard() {
  const [metric, setMetric] = useState<'revenue' | 'users'>('revenue');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Enterprise Analytics</h1>
          <p className="text-gray-500 mt-1">Real-time performance monitoring dashboard</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setMetric('revenue')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${metric === 'revenue' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>
            Revenue
          </button>
          <button 
            onClick={() => setMetric('users')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${metric === 'users' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>
            Users
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Total Revenue" value="$45,231.89" change="+20.1%" icon={<DollarSign className="w-6 h-6" />} />
        <MetricCard title="Active Users" value="+2,350" change="+180.1%" icon={<Users className="w-6 h-6" />} />
        <MetricCard title="System Health" value="99.9%" change="+0.1%" icon={<Activity className="w-6 h-6" />} />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Performance Overview</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey={metric} stroke="#2563eb" fill="#3b82f6" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
