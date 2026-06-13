import React from 'react';
import { Users } from 'lucide-react';

interface ClassroomGridProps {
  classrooms: Array<{
    _id: string;
    name: string;
    classroomId: string;
    instructor: string;
  }>;
}

export default function ClassroomGrid({ classrooms }: ClassroomGridProps) {
  if (!classrooms || classrooms.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-black uppercase mb-4 mt-8">My Classrooms</h2>
        <div className="bg-white border-4 border-black border-dashed rounded-xl p-8 text-center text-gray-500 font-bold">
          No classrooms joined yet.
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 mt-8 gap-4">
        <h2 className="text-2xl font-black uppercase">My Classrooms</h2>
        <div className="bg-yellow-300 border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-sm uppercase transform -rotate-1 hover:rotate-0 transition-transform">
          Total Joined: {classrooms.length}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classrooms.map((cls) => (
          <div key={cls._id} className="bg-purple-100 border-4 border-black rounded-xl p-5 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3">
              <div className="bg-white border-2 border-black p-2 rounded-full">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-black text-xl leading-tight line-clamp-2">{cls.name}</h3>
            </div>
            <div className="text-sm font-bold text-gray-700">
              Instructor: {cls.instructor}
            </div>
            <div className="mt-auto pt-3 border-t-2 border-black/10">
              <span className="font-black text-xs uppercase bg-black text-white px-2 py-1 rounded">ID: {cls.classroomId}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
