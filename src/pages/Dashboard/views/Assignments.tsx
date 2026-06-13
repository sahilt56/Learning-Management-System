import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, UploadCloud, X, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export default function Assignments() {
  const { token } = useAuth();
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [columns, setColumns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchAssignments = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/dashboard/assignments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = res.data;
      setColumns([
        { title: "To Do", color: "bg-orange-100", tasks: data.todo },
        { title: "In Progress", color: "bg-blue-100", tasks: data.inProgress },
        { title: "Submitted", color: "bg-emerald-100", tasks: data.submitted }
      ]);
    } catch (error) {
      console.error("Failed to fetch assignments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [token]);

  const handleSubmit = async () => {
    if (!token || !selectedTask) return;
    try {
      setSubmitting(true);
      await axios.post('http://localhost:5000/api/dashboard/assignments/submit', {
        assignmentId: selectedTask._id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Assignment submitted successfully!');
      setSelectedTask(null);
      fetchAssignments();
    } catch (error: any) {
      console.error("Submit failed", error);
      alert(error.response?.data?.message || 'Failed to submit assignment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col relative">
      <div>
        <h1 className="text-4xl font-black uppercase mb-2">Assignments Board</h1>
        <p className="font-bold text-gray-500">Track and manage your coursework.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col, idx) => (
          <div key={idx} className={`${col.color} border-4 border-black rounded-2xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col`}>
            <h2 className="text-xl font-black uppercase mb-4 border-b-4 border-black pb-2 flex justify-between items-center">
              {col.title}
              <span className="bg-black text-white px-2 py-0.5 rounded-full text-sm">{col.tasks.length}</span>
            </h2>
            
            <div className="space-y-4 flex-1">
              {col.tasks.map((task, tIdx) => (
                <div 
                  key={tIdx} 
                  onClick={() => col.title === "To Do" && setSelectedTask(task)}
                  className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-lg leading-tight">{task.title}</h3>
                    {col.title === 'Submitted' ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> : <Circle className="w-5 h-5 text-gray-300 shrink-0" />}
                  </div>
                  <p className="font-bold text-gray-500 text-sm mb-3">
                    {task.course ? task.course.title : task.classroom ? task.classroom.name : 'Unknown Target'}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-black uppercase bg-gray-100 inline-flex px-2 py-1 rounded border-2 border-black">
                    <Clock className="w-3 h-3" /> Due {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border-4 border-black rounded-2xl p-8 w-full max-w-lg shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedTask(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 border-2 border-black rounded-full hover:bg-red-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-black uppercase mb-2">Submit Assignment</h2>
            <p className="font-bold text-gray-500 mb-2">{selectedTask.title}</p>
            <p className="text-sm text-gray-600 mb-6">{selectedTask.instructions}</p>

            <div className="border-4 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-colors group mb-6">
              <UploadCloud className="w-12 h-12 text-gray-400 group-hover:text-blue-500 mb-4 transition-colors" />
              <p className="font-black text-lg">Click to Browse</p>
              <p className="font-bold text-gray-500 text-sm">or drag and drop your file here</p>
              <p className="font-bold text-gray-400 text-xs mt-2">PDF, DOCX up to 10MB</p>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-blue-600 text-white border-4 border-black py-4 rounded-xl font-black uppercase tracking-wider text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all disabled:bg-blue-400 flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Upload & Submit'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
