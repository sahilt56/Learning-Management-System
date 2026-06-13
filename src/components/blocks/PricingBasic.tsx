"use client";

import { Pricing } from "@/components/blocks/pricing";
import React from "react";

const demoPlans = [
  {
    name: "STARTER INSTRUCTOR",
    price: "0",
    yearlyPrice: "0",
    period: "per month",
    features: [
      "Up to 2 published courses",
      "Basic analytics & tracking",
      "48-hour support response time",
      "Standard student community access",
    ],
    description: "Perfect for new instructors testing the waters",
    buttonText: "Start Teaching for Free",
    href: "/instructor",
    isPopular: false,
  },
  {
    name: "PRO EDUCATOR",
    price: "49",
    yearlyPrice: "39",
    period: "per month",
    features: [
      "Unlimited published courses",
      "Advanced student analytics",
      "24-hour support response time",
      "Host Live Video Classes",
      "Priority course promotion",
      "Custom certificates for students",
    ],
    description: "Ideal for growing educators and full-time instructors",
    buttonText: "Upgrade to Pro",
    href: "/instructor",
    isPopular: true,
  },
  {
    name: "ACADEMY",
    price: "149",
    yearlyPrice: "119",
    period: "per month",
    features: [
      "Everything in Pro Educator",
      "Add up to 5 Co-Instructors",
      "Dedicated success manager",
      "1-hour support response time",
      "Custom domain & branding",
      "Advanced API & Webhooks",
    ],
    description: "For established educational businesses and large teams",
    buttonText: "Contact Sales",
    href: "/instructor",
    isPopular: false,
  },
];

export function PricingBasic({ onPlanSelect }: { onPlanSelect?: (plan: any) => void }) {
  return (
    <div className="py-8 rounded-lg bg-black">
      <Pricing 
        plans={demoPlans}
        title="Pricing for Instructors"
        description="Launch your online teaching career today.
All plans include access to our course builder, file hosting, and secure payment processing."
        onPlanSelect={onPlanSelect}
      />
    </div>
  );
}
