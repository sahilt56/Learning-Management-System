import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, Clock, Users, Award, ArrowRight } from 'lucide-react';
import { AnimatedButton } from './ui/animated-button';
import Navbar from './Navbar';
import { CinematicFooter } from './ui/motion-footer';

interface Course {
  _id: string;
  title: string;
  category: string;
  instructor: {
    name: string;
    headline?: string;
    profilePicture?: string;
  };
  level: string;
  duration: string;
  studentsCount: number;
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice: number;
  badge?: string;
  thumbnailUrl?: string;
  description: string;
  teacherNames?: string[];
  customTeacherName?: string;
  customTeacherPhoto?: string;
}

export default function AllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses');
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col w-full bg-slate-950 min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-xl">Loading courses...</div>
        </div>
        <CinematicFooter />
      </div>
    );
  }

  const groupedCourses = courses.reduce((acc, course) => {
    const cat = course.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  return (
    <div className="flex-1 flex flex-col w-full bg-slate-950">
      <Navbar />
      <section id="all-courses" className="py-24 bg-slate-950 text-white relative flex-1">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Explore More Courses
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Browse through our expansive catalog of courses organized by categories.
          </p>
        </div>

        <div className="space-y-20">
          {Object.entries(groupedCourses).map(([category, catCourses]) => (
            <div key={category} className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold text-indigo-400">{category}</h3>
                <div className="flex-1 h-px bg-slate-800"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {catCourses.map(course => (
                  <div key={course._id} className="group bg-slate-900/30 border border-slate-900 hover:border-slate-800/80 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.6)]">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={course.thumbnailUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      {course.badge && (
                        <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white border border-white/10 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                          {course.badge}
                        </span>
                      )}
                      <span className="absolute bottom-4 left-4 bg-slate-950/90 text-indigo-400 text-[10px] font-bold uppercase px-2.5 py-1 rounded border border-slate-800">
                        {course.category}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-white leading-snug group-hover:text-indigo-400 transition-colors">
                          {course.title}
                        </h3>

                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed break-all">
                          {course.description}
                        </p>
                      </div>

                      <div className="mt-5 space-y-4">
                        <div className="flex items-center justify-between py-3 border-y border-slate-900/80 text-[11px] text-slate-400">
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                            <span className="font-bold text-slate-200">{course.rating}</span>
                            <span className="text-[10px]">({course.reviewsCount})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-slate-500" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-slate-500" />
                            <span>{course.studentsCount}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Award className="h-4 w-4 text-purple-400 shrink-0" />
                          <span>{course.level}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 line-through leading-none mb-1">${course.originalPrice}</span>
                            <span className="text-xl font-bold text-white leading-none">${course.price}</span>
                          </div>
                          
                          <div className="w-1/2">
                            <AnimatedButton href={`/courses/${course._id}`} className="!py-2 !px-4 !text-xs !gap-1" wrapperClassName="w-full">
                              Enroll Now
                            </AnimatedButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>
      <CinematicFooter />
    </div>
  );
}
