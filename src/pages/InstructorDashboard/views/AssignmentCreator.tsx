import React from 'react';
import { FileEdit, Send, Paperclip } from 'lucide-react';

export default function AssignmentCreator() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Assignments</h1>
        <p className="text-sm text-slate-500 mt-1">Create assignments and send them to your students.</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-medium text-slate-900 mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
          <FileEdit className="w-5 h-5 text-blue-600" /> New Assignment
        </h2>
        
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Course</label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm bg-white">
                <option>Advanced UI/UX Design</option>
                <option>React for Beginners</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Due Date</label>
              <input type="datetime-local" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Assignment Title</label>
            <input type="text" placeholder="e.g. Build a Todo App" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm" />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Instructions</label>
            <textarea rows={5} placeholder="Write detailed instructions here..." className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm resize-y" />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Attachments (Optional)</label>
            <div className="flex items-center gap-3">
              <button type="button" className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2">
                <Paperclip className="w-4 h-4" /> Add File
              </button>
              <span className="text-sm text-slate-400">No file chosen</span>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              Save Draft
            </button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 shadow-sm">
              <Send className="w-4 h-4" /> Distribute Assignment
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
