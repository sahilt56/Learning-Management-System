import React from 'react';
import { Users, BookOpen, DollarSign, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function DashboardOverview() {
  const data = [
    { name: 'Jan', students: 120 },
    { name: 'Feb', students: 180 },
    { name: 'Mar', students: 250 },
    { name: 'Apr', students: 310 },
    { name: 'May', students: 290 },
    { name: 'Jun', students: 420 },
  ];

  const topCourses = [
    { title: "Advanced UI/UX Design", enrollments: 1245, revenue: "$14,500" },
    { title: "React for Beginners", enrollments: 980, revenue: "$8,200" },
    { title: "Figma Masterclass", enrollments: 756, revenue: "$6,100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Here is what's happening with your courses today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users className="w-5 h-5" /></div>
            <span className="flex items-center text-emerald-600 text-xs font-medium"><ArrowUpRight className="w-3 h-3 mr-1" /> 12%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Enrollments</h3>
          <p className="text-3xl font-semibold text-slate-900 mt-1">2,981</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><BookOpen className="w-5 h-5" /></div>
            <span className="flex items-center text-emerald-600 text-xs font-medium"><ArrowUpRight className="w-3 h-3 mr-1" /> 4%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Active Courses</h3>
          <p className="text-3xl font-semibold text-slate-900 mt-1">12</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><DollarSign className="w-5 h-5" /></div>
            <span className="flex items-center text-emerald-600 text-xs font-medium"><ArrowUpRight className="w-3 h-3 mr-1" /> 24%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-semibold text-slate-900 mt-1">$28,800</p>
        </div>
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Enrollment Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900 mb-6">Enrollment Growth</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            {topCourses.map((course, idx) => (
              <div key={idx} className="flex flex-col gap-1 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <p className="text-sm font-medium text-slate-900">{course.title}</p>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{course.enrollments} students</span>
                  <span className="font-medium text-emerald-600">{course.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
