import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden min-h-screen">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4"
          type="video/mp4"
        />
      </video>

      <div className="relative max-w-[1831px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 mb-12 sm:mb-16 md:mb-20">
          <h2 className="font-grotesk text-[32px] sm:text-[48px] md:text-[60px] font-normal uppercase leading-[1.05] sm:leading-[1] md:leading-[1] text-cream">
            Welcome to <span className="font-condiment normal-case text-blue-400">Eduverse</span>
          </h2>
          <div className="flex flex-col gap-6 max-w-[320px] md:max-w-[400px]">
            <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase text-cream leading-relaxed">
              A digital learning ecosystem fixed beyond time and place. An exploration of knowledge, skills, and endless possibilities.
            </p>
            <p className="font-mono text-[13px] sm:text-[14px] text-cream/80 leading-relaxed normal-case">
              Our mission is to democratize education. We empower learners and instructors worldwide with interactive tools, personalized courses, and a thriving community. Whether you're mastering a new skill or teaching one, Eduverse provides the perfect platform to transform your future today.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-5 max-w-[335px]">
            <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
              A digital learning ecosystem fixed beyond time and place. An exploration of knowledge, skills, and endless possibilities.
            </p>
            <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
              A digital learning ecosystem fixed beyond time and place. An exploration of knowledge, skills, and endless possibilities.
            </p>
          </div>
          <div className="hidden lg:flex flex-col gap-5 max-w-[335px]">
            <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
              A digital learning ecosystem fixed beyond time and place. An exploration of knowledge, skills, and endless possibilities.
            </p>
            <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
              A digital learning ecosystem fixed beyond time and place. An exploration of knowledge, skills, and endless possibilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
