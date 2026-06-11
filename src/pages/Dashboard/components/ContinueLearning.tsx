import React from 'react';
import { Clock, Trophy } from 'lucide-react';

export default function ContinueLearning() {
  return (
    <section>
      <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black inline-block pb-1">Jump Back In</h2>
      <div className="bg-emerald-400 border-4 border-black rounded-2xl p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="max-w-2xl">
            <div className="inline-block bg-black text-white text-xs font-bold uppercase px-3 py-1 mb-4">Web Development</div>
            <h3 className="text-3xl md:text-5xl font-black mb-4 uppercase leading-none">Advanced React & Next.js</h3>
            <p className="text-lg font-bold mb-6">Module 4: Server vs Client Components</p>
            <div className="w-full max-w-md">
              <div className="flex justify-between font-bold mb-2 text-sm uppercase">
                <span>Progress</span>
                <span>68%</span>
              </div>
              <div className="h-6 w-full bg-white border-4 border-black rounded-full overflow-hidden">
                <div className="h-full bg-black w-[68%] border-r-4 border-black relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-black font-black uppercase text-xl px-12 py-5 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all flex items-center gap-3 active:scale-95">
            Continue <Clock className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-500">
            <Trophy className="w-64 h-64 text-black" />
        </div>
      </div>
    </section>
  );
}
