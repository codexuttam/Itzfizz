"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
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
      // 1. Initial Load Animation
      const chars = headlineRef.current?.querySelectorAll(".char");
      if (chars) {
        gsap.from(chars, {
          y: 200,
          z: 300,
          rotateX: -110,
          opacity: 0,
          duration: 2,
          stagger: 0.04,
          ease: "expo.out",
        });
      }

      gsap.from(".stat-card", {
        z: 300,
        rotateY: 90,
        opacity: 0,
        scale: 0.5,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      });

      // 2. Scroll-Based Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Car movement + 3D Drift
      tl.to(carRef.current, {
        x: "85vw",
        ease: "power1.inOut",
      }, 0);

      // Tilting the car as it accelerates/decelerates (Drift effect)
      tl.to(carRef.current, {
        rotateZ: 0, // Faces straight
        rotateX: -10, // Tilt down as it drives
        rotateY: 25, // Tilt towards camera
        zIndex: 100,
      }, 0);

      // 3D Path Tilt
      tl.to(containerRef.current, {
        rotateX: 15,
        rotateY: -10,
        z: -100,
        ease: "none",
      }, 0);

      // Character "Flip" and Color reveal
      chars?.forEach((char, i) => {
        const reveal = char.querySelector(".reveal-text");
        tl.to(char, {
          rotateX: 360,
          z: 150,
          y: -40,
          duration: 0.6,
          ease: "back.out(2.5)",
        }, i * 0.1);

        tl.to(reveal, {
          opacity: 1,
          color: "#bef264",
          textShadow: "0 0 20px rgba(190, 242, 100, 0.8), 0 0 40px rgba(190, 242, 100, 0.4)",
          duration: 0.3,
        }, i * 0.1);

        tl.to(char, {
          y: 0,
          z: 0,
          duration: 0.4,
          ease: "power2.inOut",
        }, (i * 0.1) + 0.4);
      });

      // Stat cards "Flying" entry
      tl.from(".stat-card-wrapper", {
        x: (i) => 200 * (i + 1),
        y: 100,
        opacity: 0,
        rotateZ: 10,
        stagger: 0.1,
        ease: "power2.out",
      }, 0.8);

      // Exit animations to avoid overlap with next section
      tl.to([headlineRef.current, ".stat-card-wrapper", carRef.current], {
        opacity: 0,
        y: -150,
        scale: 0.8,
        stagger: 0.05,
        ease: "power2.inOut",
      }, 2.5);

      // Parallax Floor
      tl.to(trackRef.current, {
        backgroundPosition: "0% 200%",
        ease: "none",
      }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = "WELCOME ITZFIZZ";

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background perspective-1000 z-0"
      style={{ "--mouse-x": `${mousePos.x}%`, "--mouse-y": `${mousePos.y}%` } as any}
    >
      <div className="glow-mesh" />

      {/* 3D Scene Wrapper */}
      <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center preserve-3d">

        {/* Futuristic 3D Track */}
        <div
          ref={trackRef}
          className="absolute top-1/2 left-0 w-[300vw] h-[300px] -translate-y-1/2 -rotate-2 -skew-x-12 opacity-30 preserve-3d"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: "rotateX(60deg) translateZ(-100px)"
          }}
        />

        {/* Main Headline */}
        <div className="relative z-10 w-full max-w-[95vw] px-4 preserve-3d">
          <h1
            ref={headlineRef}
            className="text-[15vw] font-black tracking-tighter leading-none flex justify-between select-none preserve-3d italic"
          >
            {headline.split("").map((char, i) => (
              <span key={i} className="char inline-block text-stroke relative preserve-3d transition-transform duration-300 hover:scale-110">
                {char === " " ? "\u00A0" : char}
                <span className="reveal-text absolute top-0 left-0 opacity-0 pointer-events-none" aria-hidden="true">
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* 3D Car Element */}
        <div
          ref={carRef}
          className="absolute left-[5vw] top-1/2 -translate-y-2/3 z-50 w-64 h-auto pointer-events-none mix-blend-screen preserve-3d"
        >
          <div className="relative">
            {/* Engine Glow */}
            <div className="absolute top-[20%] left-[-20%] w-[100%] h-[60%] bg-accent/20 blur-3xl opacity-50" />
            <Image
              src="/car_v2.png"
              alt="Car"
              width={600}
              height={300}
              className="w-full h-auto rotate-90 scale-125 drop-shadow-[0_20px_50px_rgba(190,242,100,0.3)]"
            />
          </div>
        </div>

        {/* 3D Floating Stats */}
        <div className="absolute bottom-[8vh] left-0 w-full flex justify-center gap-4 px-8 z-40 preserve-3d">
          <div className="stat-card-wrapper preserve-3d"><StatCard value="99.9%" label="Precision" /></div>
          <div className="stat-card-wrapper preserve-3d"><StatCard value="⚡ ULTRA" label="Velocity" highlight /></div>
          <div className="stat-card-wrapper preserve-3d"><StatCard value="CORE" label="Secure" /></div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ value, label, highlight }: { value: string; label: string; highlight?: boolean }) => {
  return (
    <div className={`group relative flex flex-col items-center justify-center p-10 backdrop-blur-3xl rounded-[2.5rem] border transition-all duration-700 min-w-[220px] preserve-3d cursor-pointer 
      ${highlight ? 'bg-accent/10 border-accent/30 scale-110 -translate-y-4' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>

      {/* 3D Inner Content */}
      <span className={`text-5xl font-black mb-1 transition-transform duration-500 group-hover:translate-z-10 ${highlight ? 'text-accent' : 'text-white'}`}>
        {value}
      </span>
      <span className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-black group-hover:text-zinc-300">
        {label}
      </span>

      {/* Glowing 3D Base */}
      <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-1 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 ${highlight ? 'bg-accent' : 'bg-white/20'}`} />
    </div>
  );
};

export default Hero;
