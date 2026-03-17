"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State: Text is hidden
      const chars = headlineRef.current?.querySelectorAll(".char");
      if (chars) {
        gsap.set(chars, { opacity: 0, scale: 0.8, y: 20 });
      }

      // 2. Scroll-Based Animation (Main Sequence)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onLeave: () => {
            // Forced smooth scroll to next section once car finishes
            const nextSection = sectionRef.current?.nextElementSibling;
            if (nextSection) {
              gsap.to(window, {
                scrollTo: nextSection,
                duration: 1.2,
                ease: "power2.inOut",
                overwrite: true
              });
            }
          }
        },
      });

      const revealEnd = 2.0;

      // Track Progress Line (The Green Bar) - Matches the car
      tl.to(progressLineRef.current, {
        width: "100%",
        duration: revealEnd,
        ease: "none",
      }, 0);

      // Car movement - Reaches right edge exactly at revealEnd
      tl.to(carRef.current, {
        x: "100vw",
        duration: revealEnd,
        ease: "none",
      }, 0);

      // 3D Tilt for the whole scene (Subtle)
      tl.to(containerRef.current, {
        rotateX: 10,
        rotateY: -5,
        z: -100,
        duration: revealEnd,
        ease: "none",
      }, 0);

      // Character "Appear & Color Flip" synced with car
      const totalChars = chars?.length || 1;

      chars?.forEach((char, i) => {
        const startTime = (i / totalChars) * revealEnd;

        // Make text appear and turn black (on green bar backdrop)
        tl.to(char, {
          opacity: 1,
          scale: 1,
          y: 0,
          color: "#000",
          duration: 0.1,
          ease: "back.out(1.7)"
        }, startTime);
      });

      // Stat Cards - High Speed Entrances
      const cards = gsap.utils.toArray(".stat-card-wrapper");
      tl.from(cards[0] as any, { x: -200, opacity: 0, rotateY: 45, ease: "back.out(1.2)" }, revealEnd * 0.2);
      tl.from(cards[1] as any, { x: 200, opacity: 0, rotateY: -45, ease: "back.out(1.2)" }, revealEnd * 0.45);
      tl.from(cards[2] as any, { x: -200, opacity: 0, rotateY: 45, ease: "back.out(1.2)" }, revealEnd * 0.7);
      tl.from(cards[3] as any, { x: 200, opacity: 0, rotateY: -45, ease: "back.out(1.2)" }, revealEnd * 0.9);

      // Exit animations
      tl.to([headlineRef.current, ".stat-card-wrapper", carRef.current, progressLineRef.current], {
        opacity: 0,
        y: -100,
        scale: 0.95,
        stagger: 0.05,
        ease: "power2.inOut",
      }, revealEnd + 1.0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = "WELCOME ITZFIZZ";

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background perspective-2000 z-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.1)_0%,transparent_70%)]" />

      {/* Scattered Stat Cards */}
      <div className="absolute inset-0 pointer-events-none z-40">
        {/* Top Section */}
        <div className="absolute top-[18%] left-[52%] stat-card-wrapper pointer-events-auto">
          <StatCard value="58%" label="Increase in velocity" color="#bef264" textColor="#000" glowColor="rgba(190,242,100,0.4)" />
        </div>
        <div className="absolute top-[18%] left-[72%] stat-card-wrapper pointer-events-auto">
          <StatCard value="27%" label="Reduced Risk" color="#18181b" textColor="#fff" glowColor="rgba(255,255,255,0.1)" />
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-[18%] left-[42%] stat-card-wrapper pointer-events-auto">
          <StatCard value="23%" label="Uptime boost" color="#38bdf8" textColor="#000" glowColor="rgba(56,189,248,0.4)" />
        </div>
        <div className="absolute bottom-[18%] left-[62%] stat-card-wrapper pointer-events-auto">
          <StatCard value="40%" label="Security Gain" color="#f97316" textColor="#000" glowColor="rgba(249,115,22,0.4)" />
        </div>
      </div>

      {/* 3D Scene Wrapper */}
      <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center preserve-3d">

        {/* The Track Container */}
        <div className="relative w-full h-[180px] flex items-center bg-[#111] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Moving Reveal Bar */}
          <div
            ref={progressLineRef}
            className="absolute top-0 left-0 h-full bg-[#10b981] w-0 z-0"
          />

          {/* Main Headline */}
          <div className="relative z-10 w-full px-8 md:px-24">
            <h1
              ref={headlineRef}
              className="text-[8vw] md:text-[7.5vw] font-black tracking-[-0.06em] leading-none flex justify-start gap-[0.3vw] md:gap-[0.5vw] select-none italic"
            >
              {headline.split("").map((char, i) => (
                <span key={i} className="char inline-flex text-white relative preserve-3d">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>

          {/* 3D Car Element */}
          <div
            ref={carRef}
            className="absolute left-[0vw] top-1/2 -translate-y-1/2 z-50 w-72 h-auto pointer-events-none preserve-3d"
          >
            <div className="relative">
              <Image
                src="/car_v2.png"
                alt="Car"
                width={800}
                height={400}
                className="w-full h-auto drop-shadow-2xl translate-x-[-80%] md:translate-x-[-100%]"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const StatCard = ({ value, label, color, textColor = "#fff", glowColor }: { value: string; label: string; color: string; textColor?: string; glowColor?: string }) => {
  return (
    <div
      className="group relative p-10 rounded-xl border border-white/10 overflow-hidden transition-all duration-500 hover:scale-110 active:scale-95 shadow-2xl"
      style={{
        backgroundColor: color,
        color: textColor,
        minWidth: '320px',
        boxShadow: glowColor ? `0 30px 60px -15px ${glowColor}` : 'none'
      }}
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col items-start gap-4">
        {/* Main Value - Massive & High Contrast */}
        <div className="text-8xl font-black tracking-tighter leading-none text-current">
          {value}
        </div>

        {/* Label - Bold & Clearly Visible (Removed leading line) */}
        <div className="text-sm font-black uppercase tracking-[0.25em] leading-[1.4] text-current py-1">
          {label}
        </div>
      </div>

      <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-current opacity-10 rounded-full blur-3xl transition-transform group-hover:scale-125" />
    </div>
  );
};

export default Hero;
