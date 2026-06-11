import React, { useState } from 'react';
import { Plus, UploadCloud, CheckCircle2 } from 'lucide-react';

export default function CourseManager() {
  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublished(true);
    setTimeout(() => setIsPublished(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Course Manager</h1>
          <p className="text-sm text-slate-500 mt-1">Create and launch new courses to the home screen.</p>
        </div>
      </div>

      {/* Course Creator Form */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
        
        {isPublished && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900">Course Published Successfully!</h2>
            <p className="text-sm text-slate-500 mt-2">It is now visible on the main home screen.</p>
          </div>
        )}

        <h2 className="text-lg font-medium text-slate-900 mb-6 border-b border-gray-100 pb-4">Launch a New Course</h2>
        
        <form onSubmit={handlePublish} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Course Title</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Master React in 30 Days"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Course Description</label>
            <textarea 
              required
              rows={4}
              placeholder="Briefly describe what students will learn..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Price ($)</label>
              <input 
                required
                type="number" 
                placeholder="49.99"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Category</label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm bg-white">
                <option>Development</option>
                <option>Design</option>
                <option>Business</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Cover Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer">
              <UploadCloud className="w-8 h-8 mb-2" />
              <p className="text-sm font-medium">Click to upload image</p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Publish Course
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
