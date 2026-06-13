"use client";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
  onPlanSelect?: (plan: PricingPlan) => void;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
  onPlanSelect,
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <section id="pricing" className="bg-slate-950 overflow-hidden relative">
      <div className="container mx-auto px-4 py-8 md:py-20">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-slate-100">
            {title}
          </h2>
          <p className="text-slate-400 text-lg whitespace-pre-line max-w-2xl mx-auto">
            {description}
          </p>
        </div>

      <div className="flex justify-center items-center mb-10 gap-2">
        <Label className="relative inline-flex items-center cursor-pointer">
          <Switch
            ref={switchRef as any}
            checked={!isMonthly}
            onCheckedChange={handleToggle}
            className="relative"
          />
        </Label>
        <span className="ml-2 font-semibold text-slate-200">
          Annual billing <span className="text-blue-500">(Save 20%)</span>
        </span>
      </div>

      <div className="flex flex-row overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 lg:gap-8 max-w-6xl mx-auto pb-8 px-4 no-scrollbar">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={isDesktop ? { y: 50, opacity: 0, x: 0, scale: 1 } : { y: 0, opacity: 1, x: 0, scale: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: 0,
                    opacity: 1,
                    x: 0,
                    scale: index === 0 || index === 2 ? 0.96 : 1.0,
                  }
                : { y: 0, opacity: 1, x: 0, scale: 1 }
            }
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border-[1px] p-5 md:p-3 lg:p-8 text-center lg:flex lg:flex-col lg:justify-center relative bg-black shadow-xl min-w-[85vw] w-[85vw] sm:min-w-[340px] sm:w-[340px] snap-center shrink-0 md:w-full md:min-w-0 md:shrink`,
              plan.isPopular ? "border-blue-500 border-2" : "border-gray-200",
              "flex flex-col",
              !plan.isPopular && "mt-5",
              index === 0 || index === 2
                ? "z-0 md:transform md:translate-x-0 md:translate-y-0 md:-translate-z-[50px] md:rotate-y-[10deg]"
                : "z-10",
              index === 0 && "md:origin-right",
              index === 2 && "md:origin-left"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-blue-500 py-1 px-3 rounded-bl-xl rounded-tr-xl flex items-center">
                <Star className="text-white h-4 w-4 fill-current" />
                <span className="text-white ml-1 font-sans font-semibold text-sm">
                  Popular
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-base md:text-sm lg:text-lg font-semibold text-slate-300">
                {plan.name}
              </p>
              <div className="mt-2 lg:mt-6 flex items-center justify-center gap-x-2">
                <span className="text-4xl md:text-3xl lg:text-5xl font-bold tracking-tight text-white">
                  <span className="font-variant-numeric tabular-nums">
                    ${isMonthly ? plan.price : plan.yearlyPrice}
                  </span>
                </span>
                {plan.period !== "Next 3 months" && (
                  <span className="text-sm font-semibold leading-6 tracking-wide text-slate-400">
                    / {plan.period}
                  </span>
                )}
              </div>

              <p className="text-xs leading-5 text-slate-500 mt-2">
                {isMonthly ? "billed monthly" : "billed annually"}
              </p>

              <ul className="mt-4 md:mt-3 lg:mt-8 gap-2.5 md:gap-1.5 lg:gap-4 flex flex-col mb-4 md:mb-3 lg:mb-8 flex-1 text-slate-300">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 md:gap-2 lg:gap-4">
                    <Check className="h-4 w-4 md:h-3.5 md:w-3.5 lg:h-5 lg:w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-left text-xs md:text-[10px] lg:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {onPlanSelect ? (
                <button
                  type="button"
                  onClick={() => onPlanSelect(plan)}
                  className={cn(
                    "group relative w-full gap-2 md:gap-1 lg:gap-2 overflow-hidden text-base md:text-xs lg:text-lg font-semibold tracking-tighter !py-2.5 md:!py-1.5 lg:!py-3 !border-[2px] lg:!border-[4px] rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20",
                    "transform-gpu ring-offset-current transition-all duration-300 ease-out"
                  )}
                >
                  {plan.buttonText}
                </button>
              ) : (
                <AnimatedButton
                  href={plan.href}
                  className={cn(
                    "group relative w-full gap-2 md:gap-1 lg:gap-2 overflow-hidden text-base md:text-xs lg:text-lg font-semibold tracking-tighter !py-2.5 md:!py-1.5 lg:!py-3 !border-[2px] lg:!border-[4px]",
                    "transform-gpu ring-offset-current transition-all duration-300 ease-out"
                  )}
                >
                  {plan.buttonText}
                </AnimatedButton>
              )}
              <p className="mt-2 lg:mt-4 text-[10px] md:text-[9px] lg:text-xs leading-4 md:leading-3 lg:leading-5 text-slate-500">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center text-slate-500 text-sm md:hidden flex items-center justify-center gap-2 mb-8 -mt-2">
        Swipe left <ArrowRight className="h-4 w-4" />
      </div>
      </div>
    </section>
  );
}
