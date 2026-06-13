import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Award, Target, BookOpen } from 'lucide-react';

export default function Performance() {
  const data: any[] = [];
  const recentQuizzes: any[] = [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-black uppercase mb-2">Performance Metrics</h1>
        <p className="font-bold text-gray-500">Track your grades and overall progress.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-300 border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 hover:-translate-y-1 transition-all">
          <div className="p-3 bg-white border-2 border-black rounded-full"><Award className="w-8 h-8" /></div>
          <div>
            <p className="font-bold uppercase text-sm">Overall GPA</p>
            <p className="text-3xl font-black">0.0 / 4.0</p>
          </div>
        </div>
        <div className="bg-blue-300 border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 hover:-translate-y-1 transition-all">
          <div className="p-3 bg-white border-2 border-black rounded-full"><Target className="w-8 h-8" /></div>
          <div>
            <p className="font-bold uppercase text-sm">Attendance Rate</p>
            <p className="text-3xl font-black">0%</p>
          </div>
        </div>
        <div className="bg-purple-300 border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 hover:-translate-y-1 transition-all">
          <div className="p-3 bg-white border-2 border-black rounded-full"><BookOpen className="w-8 h-8" /></div>
          <div>
            <p className="font-bold uppercase text-sm">Total XP Earned</p>
            <p className="text-3xl font-black">0</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart */}
        <div className="lg:col-span-2 bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
          <h2 className="text-2xl font-black uppercase mb-6">Subject Scores</h2>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="subject" axisLine={{ stroke: 'black', strokeWidth: 2 }} tickLine={false} tick={{ fill: 'black', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={{ stroke: 'black', strokeWidth: 2 }} tickLine={false} tick={{ fill: 'black', fontWeight: 'bold' }} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ backgroundColor: 'black', color: 'white', border: '4px solid black', borderRadius: '8px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#facc15' }}
                />
                <Bar dataKey="score" fill="#3b82f6" stroke="black" strokeWidth={4} radius={[4, 4, 0, 0]} activeBar={{ fill: '#facc15' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black uppercase mb-6">Recent Quizzes</h2>
          <div className="space-y-4">
            {recentQuizzes.map((quiz, idx) => (
              <div key={idx} className={`${quiz.color} border-4 border-black rounded-xl p-4 flex justify-between items-center hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer`}>
                <div>
                  <h3 className="font-black text-lg leading-tight mb-1">{quiz.title}</h3>
                  <p className={`font-bold text-sm uppercase ${quiz.status === 'Pass' ? 'text-emerald-700' : 'text-red-700'}`}>{quiz.status}</p>
                </div>
                <div className="bg-white border-2 border-black rounded-full w-12 h-12 flex items-center justify-center font-black text-lg">
                  {quiz.score}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
