"use client";

import { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import HomeStasCounter from "./HomeStasCounter";
import { home_stats } from "@/data/home-data";

import prop1 from "@/public/assets/home/prop1.jpg";
import prop2 from "@/public/assets/home/prop2.jpg";
import prop3 from "@/public/assets/home/prop3.jpg";
import prop4 from "@/public/assets/home/prop4.jpg";
import prop5 from "@/public/assets/home/prop5.jpg";

const filterTabs = [
  { id: "rent", label: "Rent" },
  { id: "find", label: "Find" },
  { id: "buy", label: "Buy" },
  { id: "sell", label: "Sell" },
];

const heroSlides = [
  {
    id: 1,
    image: prop4,
    title: "Modern 4BR Architectural Villa",
    location: "Gacuriro, Kigali",
    price: "500,000 RWF / mo",
    tag: "Featured",
  },
  {
    id: 2,
    image: prop2,
    title: "Spacious Contemporary Residence",
    location: "Nyarutarama, Kigali",
    price: "300,000 RWF / mo",
    tag: "Verified",
  },
  {
    id: 3,
    image: prop5,
    title: "Luxury Hillside Villa with Pool",
    location: "Rebero, Kigali",
    price: "500,000 RWF / mo",
    tag: "New Listing",
  },
  {
    id: 4,
    image: prop1,
    title: "Cozy Minimalist Studio",
    location: "Kacyiru, Kigali",
    price: "100,000 RWF / mo",
    tag: "Trending",
  },
  {
    id: 5,
    image: prop3,
    title: "Furnished Executive 1BR Apartment",
    location: "Kicukiro, Kigali",
    price: "200,000 RWF / mo",
    tag: "Furnished",
  },
];

function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("rent");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide advance
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/properties");
    }
  };

  return (
    <section className="w-full">
      {/* Title with slightly decreased size */}
      <div className="text-center pt-6 sm:pt-10 md:pt-12 pb-5 md:pb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight">
          Find your <span className="italic font-serif font-normal">Home</span>
        </h1>
      </div>

      {/* Filter Tabs: Rent, Find, Buy, Sell */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-6 sm:mb-7">
        {filterTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${isActive
                ? "bg-brand text-white shadow-xs"
                : "bg-white border border-line text-body hover:text-ink hover:border-brand/40"
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Floating Search Bar */}
      <div className="relative z-20 max-w-xl mx-auto -mb-6 sm:-mb-7 px-4">
        <form
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-md shadow-lg shadow-black/8 border border-line/90 rounded-full p-2 pl-5 sm:pl-6 flex items-center justify-between gap-3 transition-all focus-within:ring-2 focus-within:ring-brand/20 focus-within:border-brand"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Search className="w-4 h-4 text-faint shrink-0 hidden sm:block" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search address, city, neighborhood, or agent..."
              className="w-full text-sm text-ink placeholder:text-faint bg-transparent focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-brand hover:bg-brand-deep text-white font-medium text-sm px-5 sm:px-6 py-2.5 rounded-full flex items-center gap-2 shadow-xs transition-colors shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </form>
      </div>

      {/* Hero Image Slider Container (decreased width & decreased border radius) */}
      <div
        className="group relative w-full max-w-5xl mx-auto h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-line/50 bg-surface"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides */}
        {heroSlides.map((slide, index) => {
          const isActive = currentSlide === index;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${isActive
                ? "opacity-100 scale-100 z-10 pointer-events-auto"
                : "opacity-0 scale-105 z-0 pointer-events-none"
                }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              {/* Subtle gradient vignette at bottom for text readability */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
            </div>
          );
        })}

        {/* Previous Button */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer shadow-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Property Info Badge (Bottom Left) */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20 hidden sm:block">
          <div className="bg-black/45 backdrop-blur-md border border-white/20 text-white px-3.5 py-2 rounded-xl shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand px-2 py-0.5 rounded-full text-white">
                {heroSlides[currentSlide].tag}
              </span>
              <span className="text-xs text-white/80 font-medium">
                {heroSlides[currentSlide].location}
              </span>
            </div>
            <p className="font-semibold text-sm text-white mt-1">
              {heroSlides[currentSlide].title}
            </p>
            <p className="text-xs font-semibold text-white/90">
              {heroSlides[currentSlide].price}
            </p>
          </div>
        </div>

        {/* Slider Pagination Indicators (Bottom Center) */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === idx
                ? "w-5 bg-white"
                : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Home Stats Counters */}
      <div className="flex flex-wrap gap-8 justify-center items-center mt-12 md:mt-16">
        {home_stats.map((item) => (
          <Fragment key={item.id}>
            <HomeStasCounter title={item.title} paragraph={item.paragraph} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

export default HeroSection;
