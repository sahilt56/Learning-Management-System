import React, { useState } from 'react';
import { Video, Calendar, Clock, Link as LinkIcon } from 'lucide-react';

export default function LiveClasses() {
  const [scheduled, setScheduled] = useState(false);

  const upcomingClasses = [
    { title: "React Router Deep Dive", date: "Today, 4:00 PM", students: 45 },
    { title: "Q&A Session: UI Design", date: "Tomorrow, 10:00 AM", students: 112 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
      
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Live Classes</h1>
        <p className="text-sm text-slate-500 mt-1">Schedule and manage your live video sessions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Schedule Form */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative">
          
          {scheduled && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl">
              <p className="text-emerald-600 font-medium mb-2">Class Scheduled!</p>
              <button 
                onClick={() => setScheduled(false)}
                className="text-sm text-blue-600 hover:underline"
              >
                Schedule another
              </button>
            </div>
          )}

          <h2 className="text-lg font-medium text-slate-900 mb-6 border-b border-gray-100 pb-4">Schedule a Session</h2>
          
          <form 
            onSubmit={(e) => { e.preventDefault(); setScheduled(true); }}
            className="space-y-5"
          >
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Topic</label>
              <input type="text" required placeholder="e.g. State Management Basics" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="date" required className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="time" required className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Meeting Link (Zoom/Meet)</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="url" required placeholder="https://" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm" />
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-lg font-medium text-sm transition-colors mt-2">
              Schedule Class
            </button>
          </form>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-medium text-slate-900 mb-6 border-b border-gray-100 pb-4">Upcoming Sessions</h2>
          
          <div className="space-y-4">
            {upcomingClasses.map((cls, idx) => (
              <div key={idx} className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 transition-colors bg-slate-50/50">
                <h3 className="font-medium text-slate-900">{cls.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {cls.date}</span>
                  <span>{cls.students} expected</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-md font-medium text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                    <Video className="w-4 h-4" /> Start Now
                  </button>
                  <button className="px-4 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">Edit</button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
