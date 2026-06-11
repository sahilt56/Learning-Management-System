import React from 'react';
import { Send } from 'lucide-react';

export default function CommunityWidget() {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black inline-block pb-1">Community Q&A</h2>
      <div className="bg-indigo-300 border-4 border-black rounded-xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex-1 flex flex-col">
        
        <div className="flex-1 space-y-4 mb-4">
          <div className="bg-white border-2 border-black p-3 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black text-sm mb-1 uppercase text-indigo-600">@Alex_Dev</p>
            <p className="text-sm font-bold">Does anyone know why my useEffect is running twice in Next.js 14?</p>
          </div>
          <div className="bg-yellow-300 border-2 border-black p-3 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ml-4">
            <p className="font-black text-sm mb-1 uppercase text-rose-600">@Sarah_UI</p>
            <p className="text-sm font-bold">It's React StrictMode! It mounts components twice in dev mode to catch bugs.</p>
          </div>
        </div>

        <div className="relative mt-auto">
          <input 
            type="text" 
            placeholder="Ask a question..." 
            className="w-full bg-white border-4 border-black rounded-lg py-3 px-4 font-bold outline-none focus:ring-4 focus:ring-yellow-400 transition-all placeholder:text-gray-500"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-black text-white p-2 rounded-md hover:bg-rose-400 hover:text-black transition-colors cursor-pointer border-2 border-transparent hover:border-black">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
