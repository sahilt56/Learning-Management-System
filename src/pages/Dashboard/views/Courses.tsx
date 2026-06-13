import React, { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, BookOpen, Clock, ExternalLink } from 'lucide-react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

interface EnrolledCourse {
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  level: string;
  duration: string;
  teacherNames?: string[];
  customTeacherName?: string;
  progress: number;
  lessonsLeft: number;
  enrolledAt: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        const res = await axios.get('http://localhost:5000/api/enroll/my-courses', {
          params: { firebaseUid: user.uid },
        });

        setCourses(res.data.courses || []);
      } catch (err) {
        console.error('Failed to fetch enrolled courses', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolled();
  }, []);

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase mb-2">My Courses</h1>
          <p className="font-bold text-gray-500">Pick up right where you left off.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white border-4 border-black rounded-xl py-2 pl-10 pr-4 font-bold outline-none focus:ring-4 focus:ring-blue-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-4 border-black rounded-2xl p-4 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-pulse">
              <div className="bg-gray-200 rounded-xl aspect-video mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-black uppercase text-gray-600">
            {search ? 'No courses found' : 'No courses yet'}
          </h3>
          <p className="text-gray-500 font-bold max-w-sm">
            {search
              ? 'Try a different search term.'
              : 'Enroll in a course to get started. Your purchased courses will appear here.'}
          </p>
          {!search && (
            <a
              href="/courses"
              className="bg-black text-white border-4 border-black rounded-xl px-6 py-3 font-black uppercase shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              Browse Courses →
            </a>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(course => (
            <a
              key={course._id}
              href={`/courses/${course._id}`}
              className="border-4 border-black rounded-2xl bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all flex flex-col overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden border-b-4 border-black">
                <img
                  src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80'}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  {course.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-base leading-tight mb-1 line-clamp-2">{course.title}</h4>
                  <p className="text-xs font-bold text-gray-500 mb-3">
                    {course.teacherNames?.length ? course.teacherNames.join(', ') : course.customTeacherName || 'Instructor'}
                  </p>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="w-full bg-gray-200 border-2 border-black rounded-full h-3 mb-1 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-r-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />{course.duration || 'Self-paced'}
                    </span>
                    <span>{course.progress}% done</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
