import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function StudentAnalytics() {
  const students = [
    { name: 'Alice Johnson', email: 'alice@example.com', attendance: '95%', avgGrade: 'A', status: 'Excellent' },
    { name: 'Bob Smith', email: 'bob@example.com', attendance: '82%', avgGrade: 'B+', status: 'Good' },
    { name: 'Charlie Davis', email: 'charlie@example.com', attendance: '60%', avgGrade: 'C', status: 'At Risk' },
    { name: 'Diana Prince', email: 'diana@example.com', attendance: '98%', avgGrade: 'A+', status: 'Excellent' },
    { name: 'Ethan Hunt', email: 'ethan@example.com', attendance: '75%', avgGrade: 'B-', status: 'Average' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Student Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Track attendance and overall academic performance.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-gray-300 rounded-lg hover:bg-slate-50 transition-colors">
              Sort By <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
              Export CSV
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white border-b border-gray-100 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Attendance Rate</th>
                <th className="px-6 py-4">Average Grade</th>
                <th className="px-6 py-4">Risk Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.map((student, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">{student.attendance}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{student.avgGrade}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      student.status === 'Excellent' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      student.status === 'Good' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      student.status === 'Average' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-slate-500 bg-white">
          <span>Showing 1 to 5 of 24 students</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-slate-50 transition-colors disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
