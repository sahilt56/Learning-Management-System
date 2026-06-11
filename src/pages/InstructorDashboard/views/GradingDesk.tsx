import React, { useState } from 'react';
import { Download, CheckCircle, Clock } from 'lucide-react';

export default function GradingDesk() {
  const [submissions, setSubmissions] = useState([
    { id: 1, student: 'Alice Johnson', assignment: 'React Router Project', date: 'Oct 12, 10:30 AM', file: 'alice_router_v2.zip', status: 'Pending', grade: '' },
    { id: 2, student: 'Bob Smith', assignment: 'UI Design Mockup', date: 'Oct 12, 11:15 AM', file: 'bob_figma_export.pdf', status: 'Pending', grade: '' },
    { id: 3, student: 'Charlie Davis', assignment: 'React Router Project', date: 'Oct 11, 09:00 PM', file: 'charlie_app.zip', status: 'Graded', grade: 'A' },
  ]);

  const handleGrade = (id: number, newGrade: string) => {
    setSubmissions(submissions.map(sub => 
      sub.id === id ? { ...sub, grade: newGrade, status: 'Graded' } : sub
    ));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Grading Desk</h1>
        <p className="text-sm text-slate-500 mt-1">Review student uploads and assign grades.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-medium text-slate-900">Recent Submissions</h2>
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-100">
            <option>All Assignments</option>
            <option>Pending Only</option>
            <option>Graded</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-gray-100 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Assignment</th>
                <th className="px-6 py-4">Submitted On</th>
                <th className="px-6 py-4">Attached File</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Grade Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{sub.student}</td>
                  <td className="px-6 py-4">{sub.assignment}</td>
                  <td className="px-6 py-4 text-slate-500">{sub.date}</td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors">
                      <Download className="w-4 h-4" /> {sub.file}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {sub.status === 'Pending' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/50">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                        <CheckCircle className="w-3.5 h-3.5" /> Graded
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {sub.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <input 
                          type="text" 
                          placeholder="A/B/C or %" 
                          className="w-20 px-2 py-1.5 border border-gray-300 rounded text-center text-sm outline-none focus:border-blue-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleGrade(sub.id, e.currentTarget.value);
                          }}
                        />
                        <button className="text-xs font-medium bg-slate-900 text-white px-3 py-1.5 rounded hover:bg-slate-800 transition-colors">
                          Save
                        </button>
                      </div>
                    ) : (
                      <span className="font-semibold text-slate-900 text-base">{sub.grade}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
