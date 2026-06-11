import React, { useState } from 'react';
import { Camera, Save, User, Mail, Lock } from 'lucide-react';

export default function SettingsView() {
  const [name, setName] = useState('Sahil Patel');
  const [email, setEmail] = useState('sahil@example.com');
  const [bio, setBio] = useState('Frontend Developer & Design Enthusiast');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div>
        <h1 className="text-4xl font-black uppercase mb-2">Account Settings</h1>
        <p className="font-bold text-gray-500">Manage your profile and preferences.</p>
      </div>

      <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
          <User className="w-6 h-6" /> Profile Information
        </h2>

        {/* Profile Picture Upload */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden bg-yellow-400 shrink-0">
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Sahil" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 border-2 border-black rounded-full hover:bg-blue-600 hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h3 className="font-black text-lg">Profile Picture</h3>
            <p className="font-bold text-sm text-gray-500 mb-2">JPG, GIF or PNG. Max size of 800K</p>
            <button className="bg-white border-2 border-black px-4 py-1.5 rounded-full font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5 hover:translate-x-0.5 transition-all">
              Upload New
            </button>
          </div>
        </div>

        {/* Edit Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-black text-sm uppercase">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border-4 border-black rounded-xl py-3 pl-10 pr-4 font-bold outline-none focus:ring-4 focus:ring-yellow-400 focus:bg-white transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="font-black text-sm uppercase">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border-4 border-black rounded-xl py-3 pl-10 pr-4 font-bold outline-none focus:ring-4 focus:ring-yellow-400 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-black text-sm uppercase">Short Bio</label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full bg-gray-50 border-4 border-black rounded-xl py-3 px-4 font-bold outline-none focus:ring-4 focus:ring-yellow-400 focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="pt-4 border-t-4 border-black flex justify-end">
            <button className="bg-yellow-400 text-black border-4 border-black px-8 py-3 rounded-xl font-black uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              <Save className="w-5 h-5" /> Save Changes
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
          <Lock className="w-6 h-6" /> Security Settings
        </h2>
        
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-black text-sm uppercase">New Password</label>
              <input 
                type="password" 
                placeholder="Enter new password"
                className="w-full bg-gray-50 border-4 border-black rounded-xl py-3 px-4 font-bold outline-none focus:ring-4 focus:ring-purple-400 focus:bg-white transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="font-black text-sm uppercase">Confirm Password</label>
              <input 
                type="password" 
                placeholder="Confirm new password"
                className="w-full bg-gray-50 border-4 border-black rounded-xl py-3 px-4 font-bold outline-none focus:ring-4 focus:ring-purple-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-purple-500 text-white border-4 border-black px-6 py-3 rounded-xl font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              Update Password
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
