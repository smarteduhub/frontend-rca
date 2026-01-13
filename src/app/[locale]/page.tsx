/**
 * Landing Page (/)
 * 
 * OPTIMIZED: Uses dynamic imports and Suspense for faster initial load
 * Above-the-fold content loads immediately, below-the-fold loads lazily
 */

"use client";

import Navbar from "@/components/Navbar";
import { HeroSection } from "@/components/home/hero";
import Footer from "@/components/Footer";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Lazy load below-the-fold sections for faster initial render
const CoursesSection = dynamic(() => import("@/components/home/CoursesSlide"), {
   loading: () => (
      <section className="bg-white py-24 sm:py-32">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
               <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
            </div>
            <div className="flex gap-4 justify-center">
               {[1, 2, 3].map(i => (
                  <div key={i} className="w-80 h-96 bg-gray-200 rounded-xl animate-pulse"></div>
               ))}
            </div>
         </div>
      </section>
   ),
   ssr: false,
});

const BenefitsSection = dynamic(() => import("@/components/home/benefits").then(mod => ({ default: mod.BenefitsSection })), {
   ssr: false,
});

const FeaturesSection = dynamic(() => import("@/components/home/features").then(mod => ({ default: mod.FeaturesSection })), {
   ssr: false,
});

const TestimonialSection = dynamic(() => import("@/components/home/testimonial").then(mod => ({ default: mod.TestimonialSection })), {
   ssr: false,
});

const FAQSection = dynamic(() => import("@/components/home/faq").then(mod => ({ default: mod.FAQSection })), {
   ssr: false,
});

const SponsorsSection = dynamic(() => import("@/components/home/sponsors").then(mod => ({ default: mod.SponsorsSection })), {
   ssr: false,
});

const Home = () => {
   return (
      <div>
         {/* Above-the-fold: Load immediately */}
         <Navbar />
         <HeroSection />
         
         {/* Below-the-fold: Lazy load for better performance */}
         <Suspense fallback={<div className="h-96" />}>
            <CoursesSection />
         </Suspense>
         <Suspense fallback={null}>
            <SponsorsSection />
         </Suspense>
         <Suspense fallback={null}>
            <BenefitsSection />
         </Suspense>
         <Suspense fallback={null}>
            <FeaturesSection />
         </Suspense>
         <Suspense fallback={null}>
            <TestimonialSection />
         </Suspense>
         <Suspense fallback={null}>
            <FAQSection />
         </Suspense>
         
         <Footer />
      </div>
   );
};

export default Home;
