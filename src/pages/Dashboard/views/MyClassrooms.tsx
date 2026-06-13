import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Loader2, Play } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export default function MyClassrooms() {
  const { token } = useAuth();
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [joinClassId, setJoinClassId] = useState('');
  const [joining, setJoining] = useState(false);
  const [joinMsg, setJoinMsg] = useState({ text: '', type: '' });

  const fetchClassrooms = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/dashboard/classrooms', {
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

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !joinClassId.trim()) return;
    
    try {
      setJoining(true);
      setJoinMsg({ text: '', type: '' });
      const res = await axios.post('http://localhost:5000/api/dashboard/classrooms/join', { classroomId: joinClassId.trim() }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJoinMsg({ text: res.data.message || 'Joined successfully!', type: 'success' });
      setJoinClassId('');
      fetchClassrooms(); // Refresh list to show new classroom
    } catch (error: any) {
      setJoinMsg({ text: error.response?.data?.message || 'Failed to join classroom', type: 'error' });
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase mb-2">My Classrooms</h1>
          <p className="font-bold text-gray-500">Join new classrooms and view your current ones.</p>
        </div>
        
        {/* Join Classroom by ID Form */}
        <div className="bg-white border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full md:w-auto">
          <form onSubmit={handleJoin} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Classroom ID"
              value={joinClassId}
              onChange={(e) => setJoinClassId(e.target.value.toUpperCase())}
              className="px-4 py-2 border-2 border-black rounded-lg font-bold outline-none focus:ring-4 focus:ring-blue-200 transition-all uppercase"
              required
            />
            <button 
              type="submit" 
              disabled={joining}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black uppercase px-6 py-2 border-2 border-black rounded-lg transition-transform hover:-translate-y-1"
            >
              {joining ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Join'}
            </button>
          </form>
          {joinMsg.text && (
            <p className={`text-sm font-bold mt-2 ${joinMsg.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
              {joinMsg.text}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b-4 border-black">
          <Users className="w-8 h-8" />
          <h2 className="text-2xl font-black uppercase">Joined Classrooms</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
          ) : classrooms.length === 0 ? (
            <div className="col-span-full text-center py-8 font-bold text-gray-500">
              You haven't joined any classrooms yet.
            </div>
          ) : (
            classrooms.map((cls) => (
              <div key={cls._id} className="bg-purple-100 border-4 border-black rounded-xl p-5 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  <h3 className="font-black text-xl mb-1">{cls.name}</h3>
                  <div className="flex items-center gap-2 font-bold text-gray-700 text-sm">
                    Instructor: {cls.instructor?.name || 'Unknown'}
                  </div>
                  {cls.description && <p className="text-sm font-bold text-gray-600 mt-3 line-clamp-2">{cls.description}</p>}
                </div>
                <div className="mt-auto pt-4 flex items-center justify-between border-t-2 border-black/10">
                  <span className="font-black text-xs uppercase bg-black text-white px-2 py-1 rounded">ID: {cls.classroomId}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
