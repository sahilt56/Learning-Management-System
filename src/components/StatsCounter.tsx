import React, { useState, useEffect } from "react";
import { TrendingUp, Users, Briefcase, BookOpen, GraduationCap, Star, Award } from "lucide-react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "motion/react";

// --- Mock Data for Charts ---
const slide1Data = [
  { month: 'Jan', learners: 4000 },
  { month: 'Feb', learners: 5500 },
  { month: 'Mar', learners: 8000 },
  { month: 'Apr', learners: 11000 },
  { month: 'May', learners: 15000 },
  { month: 'Jun', learners: 19000 },
  { month: 'Jul', learners: 22000 },
  { month: 'Aug', learners: 25000 },
];

const slide2Data = [
  { category: 'Web Dev', courses: 65 },
  { category: 'Data Sci', courses: 45 },
  { category: 'UI/UX', courses: 30 },
  { category: 'Cloud', courses: 40 },
  { category: 'Mobile', courses: 20 },
];

const slide3Data = [
  { month: 'Jan', rating: 4.6 },
  { month: 'Mar', rating: 4.7 },
  { month: 'May', rating: 4.8 },
  { month: 'Jul', rating: 4.85 },
  { month: 'Sep', rating: 4.9 },
];

// --- Slide Configurations ---
const SLIDES = [
  {
    id: "learners",
    title: "Accelerating",
    highlight: "Careers Globally",
    highlightGradient: "from-indigo-400 to-purple-400",
    description: "Join thousands of active learners mastering modern tech skills and securing top-tier jobs. Our proven curriculum delivers measurable, rapid growth.",
    stats: [
      { icon: <Users className="h-5 w-5 md:h-6 md:w-6 text-indigo-400 mb-2 md:mb-3" />, value: "25k+", label: "Active Learners", bg: "bg-indigo-500/10", border: "border-indigo-500/20", text: "text-indigo-400" },
      { icon: <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-purple-400 mb-2 md:mb-3" />, value: "95%", label: "Placement Rate", bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400" }
    ],
    chartType: "area",
    chartTitle: "Student Enrollment Growth",
    chartColor: "#818cf8", // indigo-400
    glowColor: "bg-indigo-600/20",
  },
  {
    id: "courses",
    title: "World-Class",
    highlight: "Curriculum & Mentors",
    highlightGradient: "from-emerald-400 to-teal-400",
    description: "Explore hundreds of high-quality courses taught by industry veterans from top tech companies. Learn the exact skills that matter today.",
    stats: [
      { icon: <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-emerald-400 mb-2 md:mb-3" />, value: "200+", label: "Total Courses", bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
      { icon: <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-teal-400 mb-2 md:mb-3" />, value: "120+", label: "Expert Instructors", bg: "bg-teal-500/10", border: "border-teal-500/20", text: "text-teal-400" }
    ],
    chartType: "bar",
    chartTitle: "Courses by Category",
    chartColor: "#34d399", // emerald-400
    glowColor: "bg-emerald-600/20",
  },
  {
    id: "ratings",
    title: "Unmatched",
    highlight: "Student Satisfaction",
    highlightGradient: "from-amber-400 to-orange-400",
    description: "Our absolute commitment to quality education is directly reflected in our outstanding student reviews and ratings across all our programs.",
    stats: [
      { icon: <Star className="h-5 w-5 md:h-6 md:w-6 text-amber-400 mb-2 md:mb-3" />, value: "4.9/5", label: "Average Rating", bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400" },
      { icon: <Award className="h-5 w-5 md:h-6 md:w-6 text-orange-400 mb-2 md:mb-3" />, value: "10k+", label: "5-Star Reviews", bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400" }
    ],
    chartType: "line",
    chartTitle: "Average Rating Over Time",
    chartColor: "#fbbf24", // amber-400
    glowColor: "bg-amber-600/20",
  }
];

export default function StatsCounter() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000); // switch every 6 seconds
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[activeSlide];

  const renderChart = () => {
    if (slide.chartType === "area") {
      return (
        <AreaChart data={slide1Data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={slide.chartColor} stopOpacity={0.6}/>
              <stop offset="95%" stopColor={slide.chartColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} dy={10}/>
          <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} dx={-10}/>
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '12px', color: '#f8fafc', backdropFilter: 'blur(8px)' }}
            itemStyle={{ color: slide.chartColor, fontWeight: 'bold' }}
            cursor={{ stroke: 'rgba(129, 140, 248, 0.2)', strokeWidth: 2 }}
          />
          <Area type="monotone" dataKey="learners" name="Enrolled Students" stroke={slide.chartColor} strokeWidth={4} fillOpacity={1} fill="url(#colorArea)" />
        </AreaChart>
      );
    } else if (slide.chartType === "bar") {
      return (
        <BarChart data={slide2Data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <XAxis dataKey="category" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} dy={10}/>
          <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} dx={-10}/>
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '12px', color: '#f8fafc', backdropFilter: 'blur(8px)' }}
            itemStyle={{ color: slide.chartColor, fontWeight: 'bold' }}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          />
          <Bar dataKey="courses" name="Available Courses" fill={slide.chartColor} radius={[4, 4, 0, 0]} barSize={40} />
        </BarChart>
      );
    } else if (slide.chartType === "line") {
      return (
        <LineChart data={slide3Data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <XAxis dataKey="month" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} dy={10}/>
          <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} domain={[4.5, 5.0]} dx={-10}/>
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '12px', color: '#f8fafc', backdropFilter: 'blur(8px)' }}
            itemStyle={{ color: slide.chartColor, fontWeight: 'bold' }}
          />
          <Line type="monotone" dataKey="rating" name="Average Rating" stroke={slide.chartColor} strokeWidth={4} dot={{ r: 6, fill: '#0f172a', stroke: slide.chartColor, strokeWidth: 2 }} activeDot={{ r: 8, fill: slide.chartColor }} />
        </LineChart>
      );
    }
  };

  return (
    <section id="stats" className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none"></div>

      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="flex items-center gap-3 justify-center mb-6">
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-white/10"></div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium uppercase tracking-widest">
                <TrendingUp className="h-3.5 w-3.5 text-indigo-500" />
                By the numbers
              </div>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-white/10"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
              Our <span className="text-indigo-400">Impact</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto">
              Real metrics from our global community of learners and mentors.
            </p>
          </div>
        }
      >
        <div className="h-full w-full bg-slate-950 rounded-2xl p-6 md:p-4 lg:p-12 flex flex-col justify-between overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col lg:flex-row gap-6 md:gap-2 lg:gap-16 items-center w-full h-full"
            >
              
              {/* Left Side: Strong Typography & Highlights */}
              <div className="flex-1 space-y-8 md:space-y-3 lg:space-y-8 w-full z-10 flex flex-col justify-center">
                <div>
                  <h3 className="text-3xl md:text-3xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4 md:mb-1 lg:mb-4">
                    {slide.title} <br />
                    <span className={`bg-gradient-to-r ${slide.highlightGradient} bg-clip-text text-transparent`}>
                      {slide.highlight}
                    </span>
                  </h3>
                  <p className="text-slate-400 text-sm md:text-xs lg:text-lg leading-relaxed max-w-md min-h-[80px] md:min-h-[40px] lg:min-h-[80px]">
                    {slide.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 md:gap-2 lg:gap-4">
                  {slide.stats.map((s, idx) => (
                    <div key={idx} className={`p-4 md:p-3 lg:p-5 rounded-2xl ${s.bg} border ${s.border} backdrop-blur-sm`}>
                      {s.icon}
                      <div className="text-2xl md:text-xl lg:text-3xl font-black text-white mb-1">{s.value}</div>
                      <div className={`text-xs md:text-[10px] lg:text-sm font-medium ${s.text}`}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Glowing Dynamic Chart */}
              <div className="flex-1 w-full h-[200px] md:h-full min-h-[200px] md:min-h-[160px] lg:min-h-[300px] relative z-10 flex flex-col justify-center">
                {/* Background Glow behind chart */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] ${slide.glowColor} blur-[100px] rounded-full pointer-events-none transition-colors duration-700`}></div>
                
                <div className="relative w-full h-[80%] min-h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-4 md:mt-2 lg:mt-4 text-sm md:text-xs lg:text-sm font-medium text-slate-500 uppercase tracking-widest">
                  {slide.chartTitle}
                </div>
              </div>
              
            </motion.div>
          </AnimatePresence>

          {/* Slider Controls */}
          <div className="flex items-center justify-center gap-4 mt-8 md:mt-2 lg:mt-8 pt-6 md:pt-2 lg:pt-6 border-t border-slate-800/50">
            <div className="flex gap-2">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700 hover:bg-slate-500'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          
        </div>
      </ContainerScroll>
    </section>
  );
}
