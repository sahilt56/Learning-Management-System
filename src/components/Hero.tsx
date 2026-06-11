"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";
 
export default function Hero() {
  return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "Industry Expert Mentors",
    link: "#features/mentors",
    thumbnail:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Interactive Coding Labs",
    link: "#features/sandbox",
    thumbnail:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Real-World Projects",
    link: "#features/projects",
    thumbnail:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "24/7 Mentor Guidance",
    link: "#features/support",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Flexible Self-Paced Study",
    link: "#features/flexibility",
    thumbnail:
      "https://images.unsplash.com/photo-1488998427799-e3362c55d67f?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Global Student Hub",
    link: "#features/community",
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "AI-Powered Learning Paths",
    link: "#features/ai-paths",
    thumbnail:
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=600",
  },
  // {
  //   title: "Blockchain Certificates",
  //   link: "#features/certificates",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600",
  // },
  {
    title: "Dedicated Career Coaching",
    link: "#features/careers",
    thumbnail:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Gamified Study Streaks",
    link: "#features/streaks",
    thumbnail:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Bite-Sized Micro-Lessons",
    link: "#features/lessons",
    thumbnail:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Live Q&A Masterclasses",
    link: "#features/live-sessions",
    thumbnail:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Active Help Forums",
    link: "#features/forums",
    thumbnail:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Peer-to-Peer Reviews",
    link: "#features/peer-reviews",
    thumbnail:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Offline Study Access",
    link: "#features/offline",
    thumbnail:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=600",
  },
];
