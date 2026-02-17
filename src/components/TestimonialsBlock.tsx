"use client";

import { useState, useEffect, useCallback } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  accent: "blue" | "purple";
}

export default function TestimonialsBlock() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Andrew Holden",
      role: "Owner",
      company: "Shy Birds",
      rating: 5,
      text: "We have used Rosilene Cleaners for over 10+ years across multiple locations. Her team's nightly cleaning is spot on, and her own personal monthly detailing of the finer fixtures really helps our spaces pop for our guests. We would highly recommend her for any commercial cleaning needs.",
      accent: "blue",
    },
    {
      id: 2,
      name: "Christine Najem",
      role: "Property Manager",
      company: "Cedar Wodd",
      rating: 5,
      text: "As a group who manages a bunch of different buildings, we can honestly say RS Cleaning Services has made our life so much easier. They take care of multiple properties for us, and they always show up, do a great job, and pay attention to the little things that really matter. What really stands out, though, is Rosilene. She is reliable, easy to talk to, and always goes above and beyond without being asked. Whether it's regular cleanings, quick turnovers, or last-minute requests, she handles everything with care and pride. Our tenants notice it too. We get so many comments about how clean and well-kept the common areas are. Having someone we can trust across all our buildings gives us real peace of mind. We'd recommend RS Cleaning to anyone who wants a cleaning service that's consistent, trustworthy, and genuinely cares about doing things right.",
      accent: "purple",
    },
  ];

  const nextTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, testimonials.length]);

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const getAccentColor = (accent: Testimonial["accent"]) => {
    const colors = {
      blue: "bg-blue-950/40 border-blue-800 text-blue-400",
      purple: "bg-purple-950/40 border-purple-800 text-purple-400",
    };
    return colors[accent];
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div className="mx-auto max-w-4xl px-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">
          What Our Clients Say
        </h3>
        <p className="mt-2 text-light-gray">
          Don&apos;t just take our word for it. Here&apos;s what our clients
          have to say about their experience.
        </p>
      </div>

      <div className="relative">
        {/* Testimonial Card */}
        <Card
          className={cn(
            "overflow-hidden border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500",
            isAnimating ? "scale-[0.98] opacity-80" : "scale-100 opacity-100"
          )}
        >
          <CardContent className="p-6 sm:p-8">
            {/* Quote icon + Stars */}
            <div className="mb-4 flex items-center justify-between">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg border",
                  getAccentColor(activeTestimonial.accent)
                )}
              >
                <Quote className="h-5 w-5" />
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < activeTestimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-600"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Testimonial text */}
            <blockquote className="mb-6 text-base leading-relaxed text-light-gray sm:text-lg">
              &ldquo;{activeTestimonial.text}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11">
                <AvatarFallback
                  className={cn(
                    "border text-sm font-semibold",
                    getAccentColor(activeTestimonial.accent)
                  )}
                >
                  {activeTestimonial.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-white">
                  {activeTestimonial.name}
                </p>
                <p className="text-xs text-gray-400">
                  {activeTestimonial.role}, {activeTestimonial.company}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Client Stories
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={prevTestimonial}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:border-cyan-accent/30 hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextTestimonial}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:border-cyan-accent/30 hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="mt-4 flex gap-2">
          {testimonials.map((testimonial, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={testimonial.id}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-all duration-300",
                  isActive
                    ? testimonial.accent === "blue"
                      ? "bg-blue-500"
                      : "bg-purple-500"
                    : "bg-gray-700"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
