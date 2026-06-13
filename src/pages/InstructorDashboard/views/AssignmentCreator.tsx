import React, { useState, useEffect } from 'react';
import { FileEdit, Send, Paperclip, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export default function AssignmentCreator() {
  const { token } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [targetId, setTargetId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const [courseRes, classRes] = await Promise.all([
          axios.get('http://localhost:5000/api/instructor/courses', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5000/api/instructor/classrooms', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        
        setCourses(courseRes.data || []);
        setClassrooms(classRes.data || []);

        if (courseRes.data && courseRes.data.length > 0) {
          setTargetId(`course_${courseRes.data[0]._id}`);
        } else if (classRes.data && classRes.data.length > 0) {
          setTargetId(`classroom_${classRes.data[0]._id}`);
        }
      } catch (error) {
        console.error("Failed to fetch targets", error);
      }
    };
    fetchData();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      setLoading(true);
      const [type, id] = targetId.split('_');
      const payload: any = { dueDate, title, instructions };
      if (type === 'course') payload.courseId = id;
      if (type === 'classroom') payload.classroomId = id;

      await axios.post('http://localhost:5000/api/instructor/assignments', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Assignment Distributed Successfully!');
      setTitle('');
      setInstructions('');
      setDueDate('');
    } catch (error) {
      console.error('Failed to create assignment', error);
      alert('Failed to distribute assignment');
    } finally {
      setLoading(false);
    }
  };
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
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Course / Classroom</label>
              <select 
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm bg-white"
              >
                {courses.length === 0 && classrooms.length === 0 && (
                  <option value="">No targets found</option>
                )}
                {courses.length > 0 && (
                  <optgroup label="Courses">
                    {courses.map((c: any) => (
                      <option key={`course_${c._id}`} value={`course_${c._id}`}>{c.title}</option>
                    ))}
                  </optgroup>
                )}
                {classrooms.length > 0 && (
                  <optgroup label="Classrooms">
                    {classrooms.map((c: any) => (
                      <option key={`classroom_${c._id}`} value={`classroom_${c._id}`}>{c.name}</option>
                    ))}
                  </optgroup>
                )}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Due Date</label>
              <input 
                type="datetime-local" 
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Assignment Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Build a Todo App" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Instructions</label>
            <textarea 
              rows={5} 
              required
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Write detailed instructions here..." 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm resize-y" 
            />
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
            <button disabled={loading} type="submit" className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 shadow-sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Distribute Assignment
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
