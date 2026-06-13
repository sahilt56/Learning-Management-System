import React, { useState } from 'react';
import { Hash, Send, Users } from 'lucide-react';

export default function Community() {
  const [message, setMessage] = useState('');
  
  const channels: any[] = [];
  const messages: any[] = [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if(message.trim()) {
      setMessage('');
      // Logic to send message would go here
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col">
      <div className="mb-6">
        <h1 className="text-4xl font-black uppercase mb-2">Community Forum</h1>
        <p className="font-bold text-gray-500">Ask doubts, share ideas, and study together.</p>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* Left Sidebar - Channels */}
        <div className="w-64 bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden shrink-0 hidden md:flex">
          <div className="p-4 border-b-4 border-black bg-yellow-300">
            <h2 className="font-black uppercase flex items-center gap-2">
              <Users className="w-5 h-5" /> Study Groups
            </h2>
          </div>
          <div className="p-4 space-y-2 overflow-y-auto">
            {channels.map((ch, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-2 p-3 rounded-xl font-bold transition-all cursor-pointer border-2 ${
                  ch.active 
                    ? 'bg-black text-white border-black' 
                    : 'bg-gray-50 border-transparent hover:border-black text-gray-600 hover:text-black'
                }`}
              >
                <Hash className="w-4 h-4" /> {ch.name}
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
          
          <div className="p-4 border-b-4 border-black bg-gray-50 flex items-center gap-2">
            <Hash className="w-6 h-6 text-gray-400" />
            <h2 className="font-black text-xl">general</h2>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-yellow-400 shrink-0">
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${msg.avatar}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-black">{msg.user}</span>
                    <span className="text-xs font-bold text-gray-500">{msg.time}</span>
                  </div>
                  <div className={`${msg.color} border-2 border-black p-3 rounded-2xl rounded-tl-none font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t-4 border-black bg-gray-50">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message #general..." 
                className="w-full bg-white border-4 border-black rounded-full py-4 pl-6 pr-16 font-bold outline-none focus:ring-4 focus:ring-blue-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
              <button 
                type="submit" 
                className="absolute right-2 bg-blue-600 text-white p-3 rounded-full border-2 border-black hover:bg-blue-700 hover:scale-105 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
