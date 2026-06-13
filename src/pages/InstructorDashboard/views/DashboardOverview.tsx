import React, { useEffect, useState } from 'react';
import { Users, BookOpen, DollarSign, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { Skeleton } from "@/components/ui/skeleton";

const GrowthBadge = ({ value }: { value: number }) => {
  if (value > 0) {
    return <span className="flex items-center text-emerald-600 text-xs font-medium"><ArrowUpRight className="w-3 h-3 mr-1" /> {value}%</span>;
  } else if (value < 0) {
    return <span className="flex items-center text-red-600 text-xs font-medium"><ArrowDownRight className="w-3 h-3 mr-1" /> {Math.abs(value)}%</span>;
  }
  return <span className="flex items-center text-slate-400 text-xs font-medium">0%</span>;
};

export default function DashboardOverview() {
  const { token, dbUser } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/instructor/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);


  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64 rounded-lg" />
            <Skeleton className="h-4 w-96 rounded-lg" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-96 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  const chartData = data?.chartData || [];
  const topCourses = data?.topCourses || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-slate-900">Dashboard Overview</h1>
            {dbUser?.plan && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full border border-blue-200 uppercase tracking-wider">
                {dbUser.plan} Plan
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">Here is what's happening with your courses today.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users className="w-5 h-5" /></div>
            <GrowthBadge value={data?.enrollmentGrowth || 0} />
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Enrollments</h3>
          <p className="text-3xl font-semibold text-slate-900 mt-1">{data?.totalEnrollments || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><BookOpen className="w-5 h-5" /></div>
            <GrowthBadge value={data?.courseGrowth || 0} />
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Active Courses</h3>
          <p className="text-3xl font-semibold text-slate-900 mt-1">{data?.activeCourses || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><DollarSign className="w-5 h-5" /></div>
            <GrowthBadge value={data?.revenueGrowth || 0} />
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-semibold text-slate-900 mt-1">{data?.totalRevenue || '$0'}</p>
        </div>
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Enrollment Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900 mb-6">Enrollment Growth</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900 mb-6">Top Performing Courses</h3>
          <div className="space-y-6">
            {topCourses.map((course: any, idx: number) => (
              <div key={idx} className="flex flex-col gap-1 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <p className="text-sm font-medium text-slate-900">{course.title}</p>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{course.enrollments} students</span>
                  <span className="font-medium text-emerald-600">{course.revenue}</span>
                </div>
              </div>
            ))}
            {topCourses.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">No active courses yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
