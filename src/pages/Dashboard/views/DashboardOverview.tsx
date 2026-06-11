import React from "react";
import WelcomeBanner from "../components/WelcomeBanner";
import CourseGrid from "../components/CourseGrid";
import Achievements from "../components/Achievements";
import ScheduleWidget from "../components/ScheduleWidget";
import DeadlinesPanel from "../components/DeadlinesPanel";

export default function DashboardOverview() {
  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-8 min-w-0">
      
      {/* MIDDLE COLUMN: HERO, COURSES, ACHIEVEMENTS */}
      <div className="flex-1 flex flex-col gap-8 min-w-0">
        <WelcomeBanner />
        <CourseGrid />
        <Achievements />
      </div>

      {/* RIGHT COLUMN: CALENDAR, UPCOMING TASKS */}
      <div className="w-full lg:w-96 flex flex-col gap-8 shrink-0">
        {/* Spacer to align with WelcomeBanner content since WelcomeBanner has a top header */}
        <div className="h-[72px] hidden lg:block"></div> 
        <ScheduleWidget />
        <DeadlinesPanel />
      </div>

    </div>
  );
}
