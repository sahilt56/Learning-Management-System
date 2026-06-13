import React, { useState, useEffect } from 'react';
import { GraduationCap, Search, Bell, Mail, Clock as ClockIcon } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function WelcomeBanner() {
  const { dbUser } = useAuth();
  const userName = dbUser?.name || 'Student';
  
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-white border-4 border-black rounded-full py-2 pl-10 pr-4 font-bold outline-none focus:ring-4 focus:ring-blue-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <div className="relative cursor-pointer hover:-translate-y-1 transition-transform">
              <Mail className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="cursor-pointer hover:-translate-y-1 transition-transform">
              <Bell className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-yellow-400">
              <img src={dbUser?.profilePicture || `https://api.dicebear.com/7.x/notionists/svg?seed=${userName}`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block text-right leading-tight">
              <div className="font-black text-sm">{userName}</div>
              <div className="text-xs font-bold text-gray-500">{dbUser?.role || 'Student'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-blue-600 border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center relative overflow-hidden text-white cursor-pointer hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <p className="font-bold text-blue-200">{time.toLocaleDateString('en-US', { month: 'long', day: 'numeric', weekday: 'long' })}</p>
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full text-sm font-black tracking-widest border-2 border-black/30">
              <ClockIcon className="w-4 h-4 text-blue-200" />
              {time.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit', second: '2-digit' })}
            </div>
          </div>
          <h2 className="text-4xl font-black mb-2 tracking-tight">Welcome back, {userName.split(' ')[0]}!</h2>
          <p className="font-bold text-lg">Ready to conquer your goals today?</p>
        </div>
        <div className="hidden md:block relative z-10">
          <GraduationCap className="w-32 h-32 text-blue-200 drop-shadow-xl transform -rotate-12" />
        </div>
        {/* Decorative background circle */}
        <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
      </div>
    </div>
  );
}
