"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import { Star, ArrowRight, Play } from "lucide-react";
import { AnimatedButton } from "./animated-button";
import { useMediaQuery } from "@/hooks/use-media-query";

export const HeroParallax = ({
  products,
  title,
  description,
  showCTAs = true,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  title?: string;
  description?: string | React.ReactNode;
  showCTAs?: boolean;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-600, 100]),
    springConfig
  );

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      ref={ref}
      className="h-[122vh] md:h-[140vh] lg:h-[180vh] 2xl:h-[185vh] pt-20 md:pt-32 pb-10 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header title={title} description={description} showCTAs={showCTAs} />
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateZ: isMobile ? 0 : rotateZ,
          translateY: isMobile ? 0 : translateY,
          opacity: isMobile ? 1 : opacity,
        }}
      >
        <motion.div 
          className="max-w-7xl mx-auto px-4 mb-10 text-left"
          initial={isMobile ? { opacity: 0, y: 30 } : false}
          whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl md:text-6xl font-extrabold text-white mb-4">
            What Sets Us Apart
          </h2>
          <p className="text-slate-400 max-w-2xl text-base md:text-lg">
            We partner with the world's most innovative platforms and tools to give you hands-on experience on what matters. Learn coding, deployment, design, and automation using industry-standard environments.
          </p>
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 md:space-x-20 mb-10">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="hidden md:flex flex-row mb-10 space-x-8 md:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="hidden 2xl:flex flex-row-reverse space-x-reverse space-x-8 md:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = ({
  title,
  description,
  showCTAs = true,
}: {
  title?: string;
  description?: string | React.ReactNode;
  showCTAs?: boolean;
}) => {
  const defaultTitle = (
    <>
      Your All-in-One Learning Ecosystem{" "}
      <span className="text-blue-400 font-condiment font-normal lowercase text-5xl md:text-8xl align-middle inline-block mt-2 md:mt-0">
        SikshaStack
      </span>
    </>
  );

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="max-w-7xl relative mx-auto pt-4 pb-8 md:pt-16 md:pb-12 px-4 w-full left-0 top-0 text-left space-y-6">

      <h1 className="text-3xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mt-0 md:mt-0">
        {title || defaultTitle}
      </h1>
      <p className="max-w-2xl text-sm md:text-xl text-slate-300">
        {description ||
          "Join interactive classrooms, attend live sessions, manage assignments, and master new skills with our comprehensive learning management system."}
      </p>

      {showCTAs && (
        <div className="flex flex-row items-center justify-start gap-2 sm:gap-6 pt-4 w-full">
          <AnimatedButton 
            href="#courses" 
            wrapperClassName="flex-none"
            style={isMobile ? { "--btn-padding": "12px 30px", "--btn-font-size": "12px" } as React.CSSProperties : {}}
          >
            Explore Courses
          </AnimatedButton>
          <AnimatedButton 
            wrapperClassName="flex-none"
            style={isMobile ? { "--btn-padding": "12px 30px", "--btn-font-size": "12px" } as React.CSSProperties : {}}
          >
            Watch Demo
          </AnimatedButton>
        </div>
      )}

      <div className="pt-8 flex items-center gap-6 border-t border-slate-900 w-full">
      </div>

    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-65 w-[85vw] md:w-[24rem] relative shrink-0 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950"
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl h-full w-full relative"
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0 transition-transform duration-500 group-hover/product:scale-105"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-40 group-hover/product:opacity-80 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 pointer-events-none"></div>
      <div className="absolute bottom-6 left-6 right-6 transition-all duration-300">
        <h2 className="text-xl font-bold text-white mb-1 drop-shadow-md">
          {product.title}
        </h2>
        <span className="text-indigo-400 text-xs font-semibold uppercase tracking-wide opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 flex items-center gap-1">
          Learn More <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </motion.div>
  );
};
