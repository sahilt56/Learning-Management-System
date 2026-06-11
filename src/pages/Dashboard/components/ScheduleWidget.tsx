import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ScheduleWidget() {
  // Static mockup to match the image
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const dates = Array.from({length: 31}, (_, i) => i + 1);

  return (
    <section>
      <h2 className="text-2xl font-black uppercase mb-4">My Schedule</h2>
      <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
        <div className="flex justify-between items-center mb-6">
          <button className="p-1 border-2 border-transparent hover:border-black rounded"><ChevronLeft className="w-5 h-5" /></button>
          <span className="font-black text-lg">December</span>
          <button className="p-1 border-2 border-transparent hover:border-black rounded"><ChevronRight className="w-5 h-5" /></button>
        </div>
        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-sm font-bold mb-2">
          {days.map((day, idx) => (
            <div key={`day-${idx}`} className={`${day === 'T' || day === 'W' || day === 'F' ? 'text-blue-500' : 'text-gray-500'}`}>{day}</div>
          ))}
          {dates.map((date) => (
            <div 
              key={date} 
              className={`p-2 rounded-full flex items-center justify-center aspect-square ${
                date === 11 
                  ? 'bg-blue-600 text-white border-2 border-black' 
                  : date === 16 || date === 19 
                    ? 'bg-blue-100 text-blue-600 border-2 border-transparent hover:border-black' 
                    : 'text-black border-2 border-transparent hover:border-black'
              }`}
            >
              {date}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
