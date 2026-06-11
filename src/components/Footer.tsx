import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Eduverse
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
            We empower learners to advance in their careers and gain industry level knowledge from expert instructors.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Explore</h4>
          <ul className="space-y-2 text-xs text-slate-500">
            <li><a href="#courses" className="hover:text-white transition-colors">All Courses</a></li>
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Legal</h4>
          <ul className="space-y-2 text-xs text-slate-500">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
        &copy; {new Date().getFullYear()} Eduverse Inc. All rights reserved.
      </div>
    </footer>
  );
}
