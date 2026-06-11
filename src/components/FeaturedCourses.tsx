import { Star, Clock, Users, ArrowRight, BookOpen, Award } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AnimatedButton } from "./ui/animated-button";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface Course {
  id: string;
  title: string;
  category: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  level: string;
  duration: string;
  studentsCount: string;
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice: number;
  badge?: string;
  image: string;
  description: string;
}

const FEATURED_COURSES: Course[] = [
  {
    id: "fullstack-web",
    title: "Full-Stack Web Development Bootcamp",
    category: "Software Engineering",
    instructor: {
      name: "Sarah Jenkins",
      role: "Ex-Google Engineer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    },
    level: "Beginner to Pro",
    duration: "32 Weeks",
    studentsCount: "8.5k students",
    rating: 4.9,
    reviewsCount: 1240,
    price: 199,
    originalPrice: 399,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    description: "Master React, Node.js, Next.js, and SQL. Build production-grade SaaS platforms from scratch.",
  },
  {
    id: "ai-deep-learning",
    title: "AI & Deep Learning Masterclass",
    category: "Data Science",
    instructor: {
      name: "Dr. Amit Patel",
      role: "Stanford AI Researcher",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    },
    level: "Advanced",
    duration: "24 Weeks",
    studentsCount: "5.2k students",
    rating: 4.8,
    reviewsCount: 840,
    price: 249,
    originalPrice: 499,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
    description: "Train neural networks, build large language models (LLMs), and implement computer vision systems.",
  },
  {
    id: "uiux-design",
    title: "UI/UX Design Masterclass & Case Studies",
    category: "Product Design",
    instructor: {
      name: "Elena Rostova",
      role: "Lead Product Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
    },
    level: "All Levels",
    duration: "16 Weeks",
    studentsCount: "6.1k students",
    rating: 4.9,
    reviewsCount: 950,
    price: 149,
    originalPrice: 299,
    badge: "New",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=600&q=80",
    description: "Learn high-fidelity UI design, user research methodologies, and build interactive Figma prototypes.",
  },
];

export default function FeaturedCourses() {
  const targetRef = useRef<HTMLElement>(null);
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
            {FEATURED_COURSES.map((course, index) => {
              const anim = animations[index];
              return (
                <motion.div 
                  key={course.id} 
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
                        src={course.image}
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
                        {/* Instructor detail */}
                        <div className="flex items-center gap-3">
                          <img
                            src={course.instructor.avatar}
                            alt={course.instructor.name}
                            className="w-7 h-7 rounded-full object-cover border border-slate-800"
                          />
                          <div>
                            <div className="text-xs font-semibold text-slate-200">{course.instructor.name}</div>
                            <div className="text-[10px] text-slate-400">{course.instructor.role}</div>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-white leading-snug group-hover:text-indigo-400 transition-colors">
                          {course.title}
                        </h3>

                        {/* Short description */}
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
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
                            <AnimatedButton href={`#enroll/${course.id}`} className="!py-2 !px-4 !text-xs !gap-1" wrapperClassName="w-full">
                              Enroll Now
                            </AnimatedButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* 4th Card: More Courses Option */}
            <motion.div
              style={{ 
                x: isMobile ? 0 : x4, 
                opacity: isMobile ? 1 : opacity4, 
                scale: isMobile ? 1 : scale4 
              }}
              className={`w-[80vw] sm:w-[280px] md:w-[300px] lg:w-[320px] shrink-0 h-auto flex items-center justify-center ${isMobile ? 'snap-center' : ''}`}
            >
              <a href="#all-courses" className="w-full h-full min-h-[350px] group bg-indigo-950/20 border border-indigo-900/30 hover:border-indigo-500/50 hover:bg-indigo-900/30 rounded-2xl overflow-hidden flex flex-col justify-center items-center transition-all duration-300 p-6 text-center cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-8 h-8 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">More Courses</h3>
                <p className="text-sm text-slate-400">Explore our entire catalog of premium bootcamps & masterclasses.</p>
              </a>
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