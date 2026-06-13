import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import WelcomeBanner from "../components/WelcomeBanner";
import CourseGrid from "../components/CourseGrid";
import ClassroomGrid from "../components/ClassroomGrid";
import Achievements from "../components/Achievements";
import ScheduleWidget from "../components/ScheduleWidget";
import DeadlinesPanel from "../components/DeadlinesPanel";
import { Skeleton } from "@/components/ui/skeleton";

const AnalogClock = ({ time }: { time: Date }) => {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDegrees = seconds * 6;
  const minuteDegrees = minutes * 6 + seconds * 0.1;
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="relative w-48 h-48 bg-yellow-100 border-8 border-black rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
      
      {/* Center Dot */}
      <div className="absolute w-5 h-5 bg-red-500 border-4 border-black rounded-full z-20"></div>
      
      {/* Hour Hand */}
      <div className="absolute w-full h-full flex justify-center items-center z-10" style={{ transform: `rotate(${hourDegrees}deg)` }}>
        <div className="w-2.5 h-12 bg-black rounded-full absolute bottom-1/2 origin-bottom"></div>
      </div>
      
      {/* Minute Hand */}
      <div className="absolute w-full h-full flex justify-center items-center z-10" style={{ transform: `rotate(${minuteDegrees}deg)` }}>
        <div className="w-1.5 h-16 bg-gray-800 rounded-full absolute bottom-1/2 origin-bottom"></div>
      </div>
      
      {/* Second Hand */}
      <div className="absolute w-full h-full flex justify-center items-center z-10" style={{ transform: `rotate(${secondDegrees}deg)` }}>
        <div className="w-1 h-16 bg-red-500 rounded-full absolute bottom-1/2 origin-bottom translate-y-2"></div>
        <div className="w-1 h-4 bg-red-500 rounded-full absolute top-1/2 origin-top -translate-y-2"></div>
      </div>

      {/* Clock Numbers */}
      <div className="absolute inset-0 font-black text-xl text-black">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
          <div 
            key={num} 
            className="absolute w-full h-full text-center" 
            style={{ transform: `rotate(${num * 30}deg)` }}
          >
            <div 
              className="inline-block mt-2" 
              style={{ transform: `rotate(${-num * 30}deg)` }}
            >
              {num}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DashboardOverview() {
  const { token } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchDashboardData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/dashboard/overview", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(res.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-w-0">
        <div className="flex-1 flex flex-col gap-8 min-w-0">
          <Skeleton className="w-full h-40 rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="w-48 h-8 rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-64 rounded-xl" />
              <Skeleton className="h-64 rounded-xl" />
              <Skeleton className="h-64 rounded-xl" />
            </div>
          </div>
          <Skeleton className="w-full h-48 rounded-2xl" />
        </div>
        <div className="w-full lg:w-96 flex flex-col gap-8 shrink-0">
          <Skeleton className="w-full h-80 rounded-2xl" />
          <Skeleton className="w-full h-96 rounded-2xl" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-8 min-w-0">
      
      {/* MIDDLE COLUMN: HERO, COURSES, CLASSROOMS, ACHIEVEMENTS */}
      <div className="flex-1 flex flex-col gap-8 min-w-0">
        <WelcomeBanner />
        <CourseGrid courses={dashboardData?.courses || []} />
        <ClassroomGrid classrooms={dashboardData?.classrooms || []} />
        <Achievements achievements={dashboardData?.achievements || []} />
      </div>

      {/* RIGHT COLUMN: CALENDAR, UPCOMING TASKS */}
      <div className="w-full lg:w-96 flex flex-col gap-8 shrink-0">
        <div className="flex justify-center pt-2 pb-4">
          <AnalogClock time={time} />
        </div>
        <ScheduleWidget schedule={dashboardData?.schedule || []} />
        <DeadlinesPanel tasks={dashboardData?.tasks || []} />
      </div>

    </div>
  );
}
