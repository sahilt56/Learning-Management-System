import { Star, Clock, Users, ArrowRight, BookOpen, Award } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AnimatedButton } from "./ui/animated-button";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";

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

export default function FeaturedCourses() {
  const targetRef = useRef<HTMLElement>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses');
        setCourses(res.data.slice(0, 3)); // Display top 3
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Card 1 animations - Enters immediately on scrolling to section
  const x1 = useTransform(smoothProgress, [0, 0.2, 1], ["100vw", "0vw", "0vw"]);
  const opacity1 = useTransform(smoothProgress, [0, 0.2, 1], [0, 1, 1]);
  const scale1 = useTransform(smoothProgress, [0, 0.2, 1], [0.8, 1, 1]);

  // Card 2 animations - Enters next to Card 1
  const x2 = useTransform(smoothProgress, [0, 0.2, 0.45, 1], ["100vw", "100vw", "0vw", "0vw"]);
  const opacity2 = useTransform(smoothProgress, [0, 0.2, 0.45, 1], [0, 0, 1, 1]);
  const scale2 = useTransform(smoothProgress, [0, 0.2, 0.45, 1], [0.8, 0.8, 1, 1]);

  // Card 3 animations - Enters next to Card 2
  const x3 = useTransform(smoothProgress, [0, 0.45, 0.7, 1], ["100vw", "100vw", "0vw", "0vw"]);
  const opacity3 = useTransform(smoothProgress, [0, 0.45, 0.7, 1], [0, 0, 1, 1]);
  const scale3 = useTransform(smoothProgress, [0, 0.45, 0.7, 1], [0.8, 0.8, 1, 1]);

  // Card 4 ("More Courses") animations - Enters last
  const x4 = useTransform(smoothProgress, [0, 0.7, 0.95, 1], ["100vw", "100vw", "0vw", "0vw"]);
  const opacity4 = useTransform(smoothProgress, [0, 0.7, 0.95, 1], [0, 0, 1, 1]);
  const scale4 = useTransform(smoothProgress, [0, 0.7, 0.95, 1], [0.8, 0.8, 1, 1]);

  const animations = [
    { x: x1, opacity: opacity1, scale: scale1 },
    { x: x2, opacity: opacity2, scale: scale2 },
    { x: x3, opacity: opacity3, scale: scale3 },
  ];

  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <section id="courses" ref={targetRef} className={`relative ${isMobile ? 'h-auto py-8' : 'h-[400vh]'} bg-slate-950`}>
      <div className={`${isMobile ? 'relative flex flex-col justify-center overflow-hidden' : 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden'}`}>
        {/* Background radial highlights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white pt-2">
              Our Featured Courses
            </h2>
            <p className="text-base sm:text-lg text-slate-400">
              High-caliber bootcamps designed by industry leaders to teach real-world skills and boost your engineering career.
            </p>
          </div>
        </div>

        {/* Static Container with Sliding Cards */}
        <div className={`w-full relative z-10 py-8 ${isMobile ? 'overflow-hidden' : 'overflow-x-auto overflow-y-hidden'}`}>
          {/* Ensure all cards stay in the first row without wrapping */}
          <div className={`flex flex-row flex-nowrap ${isMobile ? 'overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-4 scroll-smooth no-scrollbar' : 'justify-start 2xl:justify-center gap-3 lg:gap-4 pl-8 md:pl-2 lg:pl-10 pr-4 w-max min-w-full max-w-[1400px] mx-auto items-stretch'}`}>
            
            {loading ? (
              // Skeleton Loader Cards
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className={`w-[80vw] sm:w-[320px] md:w-[340px] lg:w-[310px] xl:w-[290px] 2xl:w-[360px] shrink-0 h-[420px] bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 ${isMobile ? 'snap-center' : ''}`}>
                  <Skeleton className="w-full h-[180px] bg-slate-800/80 rounded-none" />
                  <div className="p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-7 h-7 rounded-full bg-slate-800/80" />
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-24 bg-slate-800/80" />
                        <Skeleton className="h-2 w-16 bg-slate-800/80" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-3/4 bg-slate-800/80" />
                    <Skeleton className="h-10 w-full bg-slate-800/80" />
                    <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-800">
                      <Skeleton className="h-8 w-16 bg-slate-800/80" />
                      <Skeleton className="h-8 w-24 bg-slate-800/80" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              courses.map((course, index) => {
                const anim = animations[index] || animations[2]; // Fallback animation if more than 3
                return (
                  <motion.div 
                    key={course._id} 
                    style={{ 
                      x: isMobile ? 0 : anim.x, 
                      opacity: isMobile ? 1 : anim.opacity, 
                      scale: isMobile ? 1 : anim.scale 
                    }}
                    className={`w-[80vw] sm:w-[320px] md:w-[340px] lg:w-[310px] xl:w-[290px] 2xl:w-[360px] shrink-0 ${isMobile ? 'snap-center' : ''}`}
                  >
                    <div className="w-full h-full group bg-slate-900/30 border border-slate-900 hover:border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.6)]">
                      {/* Image Container */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={course.thumbnailUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"}
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        
                        {/* Badges on Top Left */}
                        {course.badge && (
                          <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white border border-white/10 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                            {course.badge}
                          </span>
                        )}
                        
                        {/* Category tag */}
                        <span className="absolute bottom-4 left-4 bg-slate-950/90 text-indigo-400 text-[10px] font-bold uppercase px-2.5 py-1 rounded border border-slate-800">
                          {course.category}
                        </span>
                      </div>

                      {/* Course Info */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          {/* Title */}
                          <h3 className="text-lg font-bold text-white leading-snug group-hover:text-indigo-400 transition-colors">
                            {course.title}
                          </h3>

                          {/* Short description */}
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed break-all">
                            {course.description}
                          </p>
                        </div>

                        <div className="mt-5 space-y-4">
                          {/* Metadata Row */}
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

                          {/* Level tag */}
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <Award className="h-4 w-4 text-purple-400 shrink-0" />
                            <span>{course.level}</span>
                          </div>

                          {/* Pricing and Action */}
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
                  </motion.div>
                );
              })
            )}

            {/* 4th Card: More Courses Option */}
            <motion.div
              style={{ 
                x: isMobile ? 0 : x4, 
                opacity: isMobile ? 1 : opacity4, 
                scale: isMobile ? 1 : scale4 
              }}
              className={`w-[80vw] sm:w-[280px] md:w-[300px] lg:w-[320px] shrink-0 h-auto flex items-center justify-center ${isMobile ? 'snap-center' : ''}`}
            >
              <Link to="/courses" className="w-full h-full min-h-[350px] group bg-indigo-950/20 border border-indigo-900/30 hover:border-indigo-500/50 hover:bg-indigo-900/30 rounded-2xl overflow-hidden flex flex-col justify-center items-center transition-all duration-300 p-6 text-center cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-8 h-8 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">More Courses</h3>
                <p className="text-sm text-slate-400">Explore our entire catalog of premium bootcamps & masterclasses.</p>
              </Link>
            </motion.div>
            
          </div>
          
          {isMobile && (
            <div className="text-center text-slate-500 text-sm mt-4 flex items-center justify-center gap-2">
              Swipe left <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}