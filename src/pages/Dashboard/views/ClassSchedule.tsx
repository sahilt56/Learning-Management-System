import React from 'react';
import { Video, Calendar as CalIcon, Clock } from 'lucide-react';

export default function ClassSchedule() {
  const classes = [
    { title: 'UI/UX Principles', time: '10:00 AM - 11:30 AM', instructor: 'Sarah Jenkins', type: 'Live Class', color: 'bg-rose-200', active: true },
    { title: 'React Hooks Deep Dive', time: '01:00 PM - 02:30 PM', instructor: 'Alex Dev', type: 'Webinar', color: 'bg-blue-200' },
    { title: 'Figma Prototyping', time: '03:00 PM - 04:00 PM', instructor: 'Sarah Jenkins', type: 'Live Class', color: 'bg-purple-200' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-black uppercase mb-2">Class Schedule</h1>
        <p className="font-bold text-gray-500">Join your live sessions and webinars here.</p>
      </div>

      <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b-4 border-black">
          <CalIcon className="w-8 h-8" />
          <h2 className="text-2xl font-black uppercase">Today's Schedule</h2>
        </div>

        <div className="space-y-4">
          {classes.map((cls, idx) => (
            <div key={idx} className={`${cls.color} border-4 border-black rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
              <div className="flex items-center gap-4">
                <div className="bg-white border-2 border-black p-3 rounded-full">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-xl">{cls.title}</h3>
                  <div className="flex items-center gap-2 font-bold text-gray-700 text-sm mt-1">
                    <Clock className="w-4 h-4" /> {cls.time} • {cls.instructor}
                  </div>
                </div>
              </div>
              <button className={`${cls.active ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-100'} border-2 border-black px-6 py-3 rounded-full font-black uppercase tracking-wider transition-transform hover:scale-105`}>
                Join {cls.type}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
