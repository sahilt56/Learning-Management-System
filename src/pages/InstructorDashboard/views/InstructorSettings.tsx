import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Camera, Mail, User, BookOpen, Shield, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function InstructorSettings() {
  const { user } = useAuth();
  
  // Basic mock state since there might not be a full backend for this yet
  const [profileData, setProfileData] = useState({
    name: user?.displayName || 'Instructor Name',
    email: user?.email || 'instructor@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    bio: 'Passionate educator with 10+ years of experience in software development and teaching. Dedicated to helping students achieve their goals.',
    specialization: 'Computer Science, Web Development',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
          <p className="text-slate-500 mt-2">Manage your instructor profile and account preferences.</p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Profile Card */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold mb-4">
                  {profileData.name.charAt(0)}
                </div>
                <button className="absolute bottom-4 right-0 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm text-slate-600 hover:text-blue-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{profileData.name}</h3>
              <p className="text-slate-500 text-sm mt-1">{profileData.specialization}</p>
              
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="w-4 h-4 mr-3 text-slate-400" />
                  {profileData.email}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Phone className="w-4 h-4 mr-3 text-slate-400" />
                  {profileData.phone}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="w-4 h-4 mr-3 text-slate-400" />
                  {profileData.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <Input 
                    name="name" 
                    value={profileData.name} 
                    onChange={handleChange} 
                    className="focus-visible:ring-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <Input 
                    name="email" 
                    type="email" 
                    value={profileData.email} 
                    onChange={handleChange}
                    className="focus-visible:ring-blue-600" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <Input 
                    name="phone" 
                    value={profileData.phone} 
                    onChange={handleChange}
                    className="focus-visible:ring-blue-600" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Location</label>
                  <Input 
                    name="location" 
                    value={profileData.location} 
                    onChange={handleChange} 
                    className="focus-visible:ring-blue-600"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Specialization / Title</label>
                <Input 
                  name="specialization" 
                  value={profileData.specialization} 
                  onChange={handleChange} 
                  className="focus-visible:ring-blue-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Bio / About Me</label>
                <textarea 
                  name="bio" 
                  value={profileData.bio} 
                  onChange={handleChange}
                  rows={4} 
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 resize-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm mt-6 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Security & Account
              </h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 mb-4">Update your password or change your security settings here.</p>
              <Button variant="outline" className="text-slate-700 border-slate-300 hover:bg-slate-50">
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
