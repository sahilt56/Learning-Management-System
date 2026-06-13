import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Loader2, Copy, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export default function ClassroomManager() {
  const { token } = useAuth();
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchClassrooms = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/instructor/classrooms', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClassrooms(res.data);
    } catch (error) {
      console.error("Failed to fetch classrooms", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, [token]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      setCreating(true);
      await axios.post('http://localhost:5000/api/instructor/classrooms', {
        name, description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setName('');
      setDescription('');
      fetchClassrooms(); // Refresh list
    } catch (error) {
      console.error('Failed to create classroom', error);
      alert('Failed to create classroom');
    } finally {
      setCreating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Classroom ID copied to clipboard!');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this classroom?')) return;
    if (!token) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/instructor/classrooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchClassrooms();
    } catch (error) {
      console.error('Failed to delete classroom', error);
      alert('Failed to delete classroom');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
      
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Classrooms</h1>
        <p className="text-sm text-slate-500 mt-1">Create and manage your virtual classrooms.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Create Form */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative h-max">
          <h2 className="text-lg font-medium text-slate-900 mb-6 border-b border-gray-100 pb-4">Create New Classroom</h2>
          
          <form onSubmit={handleCreate} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Classroom Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Physics 101 - Fall 2023" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Description (Optional)</label>
              <textarea 
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of this classroom..." 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm resize-y" 
              />
            </div>

            <button disabled={creating} type="submit" className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-600 text-white py-2.5 rounded-lg font-medium text-sm transition-colors mt-2 flex justify-center items-center gap-2">
              {creating && <Loader2 className="w-4 h-4 animate-spin" />}
              Create Classroom
            </button>
          </form>
        </div>

        {/* Existing Classrooms */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-medium text-slate-900 mb-6 border-b border-gray-100 pb-4">Your Classrooms</h2>
          
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              </div>
            ) : classrooms.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">
                No classrooms created yet.
              </div>
            ) : (
              classrooms.map((cls) => (
                <div key={cls._id} className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 transition-colors bg-slate-50/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-slate-900">{cls.name}</h3>
                      {cls.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cls.description}</p>}
                    </div>
                    <div className="flex gap-2">
                      <div 
                        onClick={() => copyToClipboard(cls.classroomId)}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold tracking-wider cursor-pointer hover:bg-blue-200 transition-colors flex items-center gap-1"
                        title="Click to copy ID"
                      >
                        ID: {cls.classroomId}
                        <Copy className="w-3 h-3 ml-1" />
                      </div>
                      <button 
                        onClick={() => handleDelete(cls._id)}
                        className="bg-red-100 text-red-700 p-1 rounded hover:bg-red-200 transition-colors"
                        title="Delete Classroom"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {cls.students?.length || 0} Students</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
