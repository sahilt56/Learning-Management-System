import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, Clock, Users, ArrowLeft, CheckCircle2, PlayCircle } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';
import PaymentModal from '../components/PaymentModal';

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  level: string;
  duration: string;
  badge: string;
  studentsCount: number;
  rating: number;
  reviewsCount: number;
  thumbnailUrl?: string;
  teacherNames?: string[];
  customTeacherName?: string;
  customTeacherPhoto?: string;
  whatYouWillLearn?: string[];
  instructor: {
    name: string;
    headline: string;
    profilePicture: string;
  };
  batchStartDate?: string;
}

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentOpen, setPaymentOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
      } catch (error) {
        console.error("Error fetching course", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-slate-900 text-white pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Skeleton className="h-8 w-32 bg-slate-800" />
                <Skeleton className="h-16 w-3/4 bg-slate-800" />
                <Skeleton className="h-24 w-full bg-slate-800" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-slate-800" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-slate-800" />
                    <Skeleton className="h-4 w-24 bg-slate-800" />
                  </div>
                </div>
              </div>
              <Skeleton className="aspect-video w-full rounded-2xl bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <h2 className="text-3xl font-black uppercase">Course Not Found</h2>
        <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-3 rounded-xl font-bold">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                {course.badge && (
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                    {course.badge}
                  </span>
                )}
                <span className="text-blue-400 font-bold uppercase tracking-widest">{course.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                {course.title}
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl break-all overflow-hidden">
                {course.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm font-semibold text-slate-300 pt-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white">{course.rating}</span>
                  <span>({course.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.studentsCount} students</span>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-video rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl group cursor-pointer">
              <img 
                src={course.thumbnailUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"} 
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            {/* Instructors Section */}
            <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-black uppercase mb-5 text-slate-800 tracking-wide">
                Your Instructor{(course.teacherNames?.length ?? 0) > 1 ? 's' : ''}
              </h2>
              <div className="flex flex-col gap-4">
                {course.teacherNames?.length ? (
                  course.teacherNames.map((name, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
                      <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-black shrink-0">
                        {idx + 1}
                      </span>
                      <img
                        src={course.customTeacherPhoto || course.instructor?.profilePicture || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"}
                        alt={name}
                        className="w-10 h-10 rounded-full border-2 border-slate-300 object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900">{name}</div>
                        <div className="text-sm text-slate-500 break-all">{course.instructor?.headline || "Instructor"}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
                    <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-black shrink-0">
                      1
                    </span>
                    <img
                      src={course.customTeacherPhoto || course.instructor?.profilePicture || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"}
                      alt={course.customTeacherName || course.instructor?.name || "Instructor"}
                      className="w-10 h-10 rounded-full border-2 border-slate-300 object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900">{course.customTeacherName || course.instructor?.name || "Instructor"}</div>
                      <div className="text-sm text-slate-500 break-all">{course.instructor?.headline || "Instructor"}</div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-black uppercase mb-6 text-slate-900">What You'll Learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(course.whatYouWillLearn?.length ? course.whatYouWillLearn : [
                  "Build production-ready applications from scratch",
                  "Master modern state management and hooks",
                  "Implement robust authentication and authorization",
                  "Deploy and scale your application globally",
                  "Optimize performance and accessibility",
                  "Follow industry best practices and design patterns"
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          {/* Floating Action Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-black text-slate-900">${course.price}</span>
                {course.originalPrice > course.price && (
                  <span className="text-xl text-slate-400 line-through mb-1 font-bold">${course.originalPrice}</span>
                )}
              </div>
              
              <button
                onClick={() => setPaymentOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white border-4 border-black font-black uppercase tracking-wider py-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all mb-4"
              >
                Enroll Now
              </button>
              <p className="text-center text-sm font-bold text-slate-500 mb-8">30-Day Money-Back Guarantee</p>
              
              <div className="space-y-4 font-semibold text-slate-700">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-slate-400" /> Duration</div>
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div className="flex items-center gap-2"><Users className="w-5 h-5 text-slate-400" /> Skill Level</div>
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div className="flex items-center gap-2"><Star className="w-5 h-5 text-slate-400" /> Rating</div>
                  <span>{course.rating} / 5.0</span>
                </div>
                {course.batchStartDate && (
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-slate-400" /> Batch Starts</div>
                    <span className="font-bold text-blue-600">{new Date(course.batchStartDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        course={{
          _id: course._id,
          title: course.title,
          price: course.price,
          originalPrice: course.originalPrice,
          thumbnailUrl: course.thumbnailUrl,
        }}
      />
    </div>
  );
}
