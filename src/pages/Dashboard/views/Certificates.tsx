import React from 'react';
import { Award, Download, Share2 } from 'lucide-react';

export default function Certificates() {
  const certificates = [
    { title: "Inorganic Chemistry Certificate", date: "April 15, 2026", bg: "bg-yellow-100", border: "border-yellow-400", accent: "bg-yellow-400" },
    { title: "Social Philosophy Certificate", date: "March 22, 2026", bg: "bg-purple-100", border: "border-purple-400", accent: "bg-purple-400" },
    { title: "Advanced React Patterns", date: "Jan 10, 2026", bg: "bg-blue-100", border: "border-blue-400", accent: "bg-blue-400" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-black uppercase mb-2">My Certificates</h1>
        <p className="font-bold text-gray-500">Showcase your achievements to the world.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {certificates.map((cert, idx) => (
          <div key={idx} className={`${cert.bg} border-4 ${cert.border} rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col justify-between min-h-[300px] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all`}>
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-700 uppercase tracking-widest mb-2">Verified Achievement</p>
                <h2 className="text-3xl font-black leading-tight max-w-[80%]">{cert.title}</h2>
                <p className="font-bold mt-4">Issued: {cert.date}</p>
              </div>
            </div>

            <div className="relative z-10 flex gap-4 mt-8">
              <button className={`${cert.accent} border-4 border-black px-6 py-3 rounded-full font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2`}>
                <Download className="w-5 h-5" /> Download PDF
              </button>
              <button className="bg-white border-4 border-black p-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* Huge Background Icon */}
            <div className="absolute -right-10 -bottom-10 pointer-events-none">
              <Award className={`w-64 h-64 text-${cert.accent.split('-')[1]}-500 fill-current opacity-20 transform rotate-12`} />
            </div>
            
            {/* Seal */}
            <div className="absolute top-8 right-8 w-20 h-20 rounded-full border-4 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10">
              <Award className="w-10 h-10 text-black" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
