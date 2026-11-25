"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import HomeStasCounter from "./HomeStasCounter";
import { home_stats } from "@/data/home-data";

import slide1 from "@/public/assets/home/im1.webp";
import slide2 from "@/public/assets/home/im2.webp";
import slide3 from "@/public/assets/home/im3.webp";
import slide4 from "@/public/assets/home/im4.webp";

const heroSlides = [
  {
    id: 1,
    image: slide1,
    title: "Spacious Family Residence",
    location: "Nyarutarama, Kigali",
  },
  {
    id: 2,
    image: slide2,
    title: "Bright Studio Apartment",
    location: "Kacyiru, Kigali",
  },
  {
    id: 3,
    image: slide3,
    title: "Furnished 1-Bedroom Home",
    location: "Kicukiro, Kigali",
  },
  {
    id: 4,
    image: slide4,
    title: "Modern Garden Apartment",
    location: "Kimironko, Kigali",
  },
];

function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/properties?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/properties");
    }
  };

  return (
    <section className="w-full">
      <div className="pb-6 pt-6 text-center sm:pt-10 md:pb-8 md:pt-12">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl">
          Find your <span className="font-serif font-normal italic">Home</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:text-base">
          Browse rental homes across Rwanda, or list and manage your properties
          from move-in to move-out.
        </p>
      </div>

      {/* Floating Search Bar */}
      <div className="relative z-20 mx-auto -mb-6 max-w-xl px-4 sm:-mb-7">
        <form
          onSubmit={handleSearch}
          role="search"
          aria-label="Search rental properties"
          className="flex items-center justify-between gap-2 rounded-full border border-brand/15 bg-white/95 p-2 pl-4 shadow-lg shadow-black/8 backdrop-blur-md transition-all focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/10 sm:gap-3 sm:pl-6"
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Search
              aria-hidden="true"
              className="hidden h-4 w-4 shrink-0 text-faint sm:block"
            />
            <label htmlFor="hero-property-search" className="sr-only">
              Search by district, neighborhood, or property type
            </label>
            <input
              id="hero-property-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by district, neighborhood, or home type..."
              className="w-full bg-transparent py-2 text-sm text-ink placeholder:text-faint focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-brand-deep sm:px-6"
          >
            <Search aria-hidden="true" className="h-4 w-4" />
            <span>Search</span>
          </button>
        </form>
      </div>

      {/* Hero Image Slider Container */}
      <div
        className="group relative mx-auto h-[320px] w-full max-w-6xl overflow-hidden rounded-xl border border-line/50 bg-surface shadow-lg sm:h-[400px] md:h-[460px] md:rounded-2xl lg:h-[500px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {heroSlides.map((slide, index) => {
          const isActive = currentSlide === index;
          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                isActive
                  ? "z-10 scale-100 opacity-100 pointer-events-auto"
                  : "z-0 scale-105 opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.image}
                alt={`${slide.title} in ${slide.location}`}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1152px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
            </div>
          );
        })}

        {/* Previous Button */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous featured home photo"
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white shadow-md backdrop-blur-md transition-all hover:bg-black/70 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-5 md:opacity-0 md:group-hover:opacity-100"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next featured home photo"
          className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white shadow-md backdrop-blur-md transition-all hover:bg-black/70 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 md:opacity-0 md:group-hover:opacity-100"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>

        {/* Slider Pagination Indicators */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md sm:bottom-6">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`View slide ${idx + 1}: ${slide.title}`}
              aria-current={currentSlide === idx ? "true" : undefined}
              className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? "w-6 bg-white"
                  : "w-2 bg-white/55 hover:bg-white/85"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Home Stats Counters */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:mt-16">
        {home_stats.map((item) => (
          <HomeStasCounter
            key={item.id}
            title={item.title}
            paragraph={item.paragraph}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;
