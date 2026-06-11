import React from 'react';
import { Mic, FileText, Clock } from 'lucide-react';

export default function DeadlinesPanel() {
  const tasks = [
    { title: "Demo Speech", subtitle: "Mass Communication", icon: <Mic className="w-6 h-6 text-red-500" />, iconBg: "bg-red-100", group: "TODAY" },
    { title: "Globalization Essay", subtitle: "Advanced Geography", icon: <FileText className="w-6 h-6 text-orange-500" />, iconBg: "bg-orange-100", group: "TODAY" },
    { title: "Management Quiz", subtitle: "Product Management", icon: <Clock className="w-6 h-6 text-purple-500" />, iconBg: "bg-purple-100", group: "THIS WEEK", active: true },
    { title: "Docu Reaction Paper", subtitle: "Advanced Geography", icon: <FileText className="w-6 h-6 text-orange-500" />, iconBg: "bg-orange-100", group: "THIS WEEK" },
  ];

  return (
    <section>
      <h2 className="text-2xl font-black uppercase mb-4">Upcoming Tasks</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-gray-500 text-xs tracking-wider mb-3">TODAY</h3>
          <div className="space-y-3">
            {tasks.filter(t => t.group === "TODAY").map((task, idx) => (
              <div key={idx} className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${task.iconBg} border-2 border-black`}>
                    {task.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{task.title}</h4>
                    <p className="text-gray-500 text-sm font-bold">{task.subtitle}</p>
                  </div>
                </div>
                <div className="text-xl font-bold">&gt;</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-500 text-xs tracking-wider mb-3">THIS WEEK</h3>
          <div className="space-y-3">
            {tasks.filter(t => t.group === "THIS WEEK").map((task, idx) => (
              <div key={idx} className={`border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer flex items-center justify-between ${task.active ? 'bg-white scale-105 z-10 relative -ml-2 -mr-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : 'bg-white'}`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${task.iconBg} border-2 border-black`}>
                    {task.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{task.title}</h4>
                    <p className="text-gray-500 text-sm font-bold">{task.subtitle}</p>
                  </div>
                </div>
                <div className="text-xl font-bold">&gt;</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
