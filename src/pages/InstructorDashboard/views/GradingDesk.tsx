import React, { useEffect, useState } from 'react';
import { Search, Filter, CheckCircle2, AlertCircle, FileText, Loader2, Download, Clock, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export default function GradingDesk() {
  const { token } = useAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/instructor/submissions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubmissions(res.data);
      } catch (error) {
        console.error("Failed to fetch submissions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [token]);

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

        <div className="overflow-x-auto min-h-[200px]">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-slate-500">
              No submissions found.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-6 text-sm font-medium text-slate-500">Student</th>
                  <th className="py-4 px-6 text-sm font-medium text-slate-500">Assignment</th>
                  <th className="py-4 px-6 text-sm font-medium text-slate-500">Status</th>
                  <th className="py-4 px-6 text-sm font-medium text-slate-500">Date</th>
                  <th className="py-4 px-6 text-sm font-medium text-slate-500 text-right">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {submissions.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {sub.studentName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-slate-900">{sub.studentName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        {sub.assignmentTitle}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {sub.status === 'Needs Grading' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/50">
                          <Clock className="w-3.5 h-3.5" /> Needs Grading
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                          <CheckCircle className="w-3.5 h-3.5" /> Graded
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-500">{new Date(sub.submittedAt).toLocaleDateString()}</td>
                    <td className="py-4 px-6 text-right">
                      {sub.status === 'Needs Grading' ? (
                        <div className="flex items-center justify-end gap-2">
                          <input 
                            type="text" 
                            placeholder="A/B/C or %" 
                            className="w-20 px-2 py-1.5 border border-gray-300 rounded text-center text-sm outline-none focus:border-blue-500"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleGrade(sub.id, e.currentTarget.value);
                            }}
                          />
                          <button 
                            className="text-xs font-medium bg-slate-900 text-white px-3 py-1.5 rounded hover:bg-slate-800 transition-colors"
                            onClick={(e) => {
                              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                              if (input.value) handleGrade(sub.id, input.value);
                            }}
                          >
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
          )}
        </div>
      </div>
    </div>
  );
}
