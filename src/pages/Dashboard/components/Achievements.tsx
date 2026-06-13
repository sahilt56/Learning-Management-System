import React from 'react';
import { Award } from 'lucide-react';

interface AchievementsProps {
  achievements: Array<{
    title: string;
    bg: string;
    border: string;
    buttonBg: string;
  }>;
}

export default function Achievements({ achievements }: AchievementsProps) {
  if (!achievements || achievements.length === 0) {
    return null; // Don't show the section if there are no achievements
  }

  return (
    <section>
      <h2 className="text-2xl font-black uppercase mb-4">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((cert, idx) => (
          <div 
            key={idx} 
            className={`${cert.bg} border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all cursor-pointer relative overflow-hidden`}
          >
            <div className="relative z-10 w-2/3">
              <h3 className="text-xl font-black mb-6 leading-tight text-black">{cert.title}</h3>
              <button className={`${cert.buttonBg} border-2 border-black rounded-full px-6 py-2 font-black uppercase text-sm hover:scale-105 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                View
              </button>
            </div>
            <div className="absolute -right-4 bottom-4">
              <Award className={`w-24 h-24 text-${cert.buttonBg.split('-')[1]}-500 fill-current opacity-80 drop-shadow-md`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
