import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsCounter from '../components/StatsCounter';
import FeaturedCourses from '../components/FeaturedCourses';
import Testimonials from '../components/Testimonials';
import { PricingBasic } from '../components/blocks/PricingBasic';
import { CinematicFooter } from '../components/ui/motion-footer';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col w-full">
      <Navbar />
      <Hero />
      <StatsCounter />
      <FeaturedCourses />
      <PricingBasic />
      <Testimonials />
      <CinematicFooter />
    </div>
  );
}
