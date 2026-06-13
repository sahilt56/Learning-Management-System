import React, { useEffect, useState } from 'react';
import { Video, Calendar as CalIcon, Clock, Loader2, Play } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const CountdownTimer = ({ date, time }: { date: string, time: string }) => {
  const [timeLeft, setTimeLeft] = useState('');
  
  useEffect(() => {
    const targetDate = new Date(`${date} ${time}`).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        setTimeLeft('Started');
        clearInterval(interval);
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      let timeStr = '';
      if (days > 0) timeStr += `${days}d `;
      if (hours > 0 || days > 0) timeStr += `${hours}h `;
      timeStr += `${minutes}m ${seconds}s`;
      
      setTimeLeft(timeStr);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [date, time]);

  if (!timeLeft) return null;

  return (
    <span className={`px-2 py-1 rounded text-xs font-black uppercase tracking-wider border-2 border-black ${timeLeft === 'Started' ? 'bg-red-500 text-white animate-pulse' : 'bg-yellow-300 text-black'}`}>
      {timeLeft === 'Started' ? 'Live Now' : `Starts in: ${timeLeft}`}
    </span>
  );
};

export default function ClassSchedule() {
  const { token } = useAuth();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClasses = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/dashboard/live-classes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClasses(res.data);
    } catch (error) {
      console.error("Failed to fetch schedule", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [token]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-black uppercase mb-2">Class Schedule</h1>
        <p className="font-bold text-gray-500">Join your live sessions and webinars here.</p>
      </div>

      <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b-4 border-black">
          <CalIcon className="w-8 h-8" />
          <h2 className="text-2xl font-black uppercase">Upcoming Sessions</h2>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
          ) : classes.length === 0 ? (
            <div className="text-center py-8 font-bold text-gray-500">
              No live classes scheduled. Join a classroom to see classes here.
            </div>
          ) : (
            classes.map((cls, idx) => (
              <div key={idx} className={`${cls.course?.bg || 'bg-purple-100'} border-4 border-black rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white border-2 border-black p-3 rounded-full">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl">{cls.topic}</h3>
                    <div className="flex items-center gap-2 font-bold text-gray-700 text-sm mt-1">
                      <Clock className="w-4 h-4" /> {cls.date} at {cls.time} • {cls.instructor?.name || 'Instructor'}
                    </div>
                    <div className="mt-2 flex gap-2 items-center">
                      {cls.course && <div className="text-xs font-bold text-blue-600 uppercase tracking-wide">Course: {cls.course.title}</div>}
                      {cls.classroom && <div className="text-xs font-bold text-purple-600 uppercase tracking-wide">Classroom: {cls.classroom.name}</div>}
                    </div>
                    <div className="mt-3">
                      <CountdownTimer date={cls.date} time={cls.time} />
                    </div>
                  </div>
                </div>
                <a
                  href={cls.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white hover:bg-gray-800 border-2 border-black px-6 py-3 rounded-full font-black uppercase tracking-wider transition-transform hover:scale-105 inline-flex justify-center items-center text-center"
                >
                  Join Class
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
