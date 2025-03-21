"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end start"],
  });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-x-hidden"
    >
      <HeroSection scrollYProgress={scrollYProgress} />
      <FeaturesSection />
      <CtaSection />
    </div>
  );
}
