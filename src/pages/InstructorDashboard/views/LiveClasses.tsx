import React, { useState, useEffect } from 'react';
import { Video, Calendar, Clock, Link as LinkIcon, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export default function LiveClasses() {
  const { token } = useAuth();
  const [scheduled, setScheduled] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scheduling, setScheduling] = useState(false);

  // Form state
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [courses, setCourses] = useState<any[]>([]);
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [targetId, setTargetId] = useState('');

  const fetchClasses = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/instructor/live-classes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClasses(res.data);
    } catch (error) {
      console.error("Failed to fetch classes", error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchClasses();
    fetchData();
  }, [token]);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      setScheduling(true);
      const [type, id] = targetId.split('_');
      const payload: any = { topic, date, time, meetingLink };
      if (type === 'course') payload.courseId = id;
      if (type === 'classroom') payload.classroomId = id;

      await axios.post('http://localhost:5000/api/instructor/live-classes', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setScheduled(true);
      setTopic('');
      setDate('');
      setTime('');
      setMeetingLink('');
      fetchClasses(); // Refresh list
    } catch (error) {
      console.error('Failed to schedule class', error);
      alert('Failed to schedule class');
    } finally {
      setScheduling(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
      
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Live Classes</h1>
        <p className="text-sm text-slate-500 mt-1">Schedule and manage your live video sessions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Schedule Form */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative">
          
          {scheduled && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl">
              <p className="text-emerald-600 font-medium mb-2">Class Scheduled!</p>
              <button 
                onClick={() => setScheduled(false)}
                className="text-sm text-blue-600 hover:underline"
              >
                Schedule another
              </button>
            </div>
          )}

          <h2 className="text-lg font-medium text-slate-900 mb-6 border-b border-gray-100 pb-4">Schedule a Session</h2>
          
          <form 
            onSubmit={handleSchedule}
            className="space-y-5"
          >
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
              <label className="text-sm font-medium text-slate-700">Topic</label>
              <input 
                type="text" 
                required 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. State Management Basics" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm" 
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="date" 
                    required 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm" 
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="time" 
                    required 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Meeting Link (Zoom/Meet)</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="url" 
                  required 
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="https://" 
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm" 
                />
              </div>
            </div>

            <button disabled={scheduling} type="submit" className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-600 text-white py-2.5 rounded-lg font-medium text-sm transition-colors mt-2 flex justify-center items-center gap-2">
              {scheduling && <Loader2 className="w-4 h-4 animate-spin" />}
              Schedule Class
            </button>
          </form>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-medium text-slate-900 mb-6 border-b border-gray-100 pb-4">Upcoming Sessions</h2>
          
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              </div>
            ) : classes.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">
                No upcoming classes.
              </div>
            ) : (
              classes.map((cls, idx) => (
                <div key={idx} className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 transition-colors bg-slate-50/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-slate-900">{cls.topic}</h3>
                      {cls.course && <p className="text-xs text-blue-600 font-medium mt-1">Course: {cls.course.title}</p>}
                      {cls.classroom && <p className="text-xs text-purple-600 font-medium mt-1">Classroom: {cls.classroom.name}</p>}
                    </div>
                    <div className="bg-slate-200 px-2 py-1 rounded text-xs font-bold text-slate-700 tracking-wider">
                      ID: {cls.classId || 'N/A'}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {cls.date} at {cls.time}</span>
                    <span>{cls.expectedStudents} expected</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a href={cls.meetingLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-md font-medium text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                      <Video className="w-4 h-4" /> Start Now
                    </a>
                    <button className="px-4 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">Edit</button>
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
