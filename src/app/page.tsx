"use client";

import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const transitionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from(titleRef.current?.children || [], {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        }
      });

      // Description Reveal
      gsap.from(descRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: descRef.current,
          start: "top 85%",
        }
      });

      // Protocol Cards Stagger
      const cards = Array.from(cardsRef.current?.children || []);
      gsap.fromTo(cards,
        { scale: 0.8, opacity: 0, y: 60, rotateX: 15 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: transitionRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, transitionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Formal Header */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center backdrop-blur-md bg-black/40 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-md rotate-12 flex items-center justify-center text-black font-black text-xl italic">F</div>
          <span className="text-xl font-black tracking-tighter italic">ITZFIZZ</span>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden">
          {["Platform", "Solutions", "Enterprise", "Pricing"].map((item) => (
            <a key={item} href="#" className="hover:text-accent transition-colors relative group">
              {item}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
            </a>
          ))}
        </div>
        <button className="relative group px-8 py-2.5 bg-accent text-black text-[10px] font-black uppercase tracking-widest rounded-md transition-all hover:shadow-[0_0_25px_rgba(190,242,100,0.6)] overflow-hidden">
          <span className="relative z-10">Request Access</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </nav>

      {/* Hero Section with 3D Animation */}
      <div className="relative z-0">
        <Hero />
      </div>

      {/* Transition Section - Higher z-index to cover hero spillover */}
      <section ref={transitionRef} className="relative py-64 md:py-80 flex flex-col items-center justify-center border-t border-white/5 bg-[#050505] z-[60] overflow-hidden">
        {/* Dynamic Background Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="max-w-[1536px] w-full px-8 md:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 xl:gap-40 items-center">

            {/* Left Side: Dynamic Text Content */}
            <div className="space-y-10 md:space-y-16">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-[11px] font-black uppercase tracking-[0.2em] backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                Live Network Status
              </div>

              <div className="space-y-6">
                <h2 ref={titleRef} className="text-6xl md:text-7xl xl:text-[92px] font-black tracking-tighter italic leading-[0.85] uppercase">
                  <span className="block text-white">CORE</span>
                  <span className="block text-accent drop-shadow-[0_0_30px_rgba(190,242,100,0.2)]">INFRASTRUCTURE.</span>
                </h2>
                <div className="w-24 h-1 bg-accent/30 rounded-full" />
              </div>

              <p ref={descRef} className="text-zinc-400 text-xl md:text-2xl leading-relaxed max-w-xl font-medium tracking-tight">
                Pioneering high-velocity risk management with <span className="text-white font-bold">formal verification</span> and autonomous threat mitigation at scale.
              </p>

              <div className="flex flex-wrap gap-6 pt-4">
                <button className="group relative px-12 py-6 bg-accent text-black font-black uppercase tracking-widest text-xs rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(190,242,100,0.4)] overflow-hidden">
                  <span className="relative z-10">Launch Console</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                <button className="px-12 py-6 bg-white/5 text-white font-black uppercase tracking-widest text-xs rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md">
                  Key Metrics
                </button>
              </div>
            </div>

            {/* Right Side: Enhanced Protocol Cards */}
            <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 perspective-2000">
              {[
                {
                  title: "L3/L4 Velocity",
                  desc: "Hyper-optimized network stack achieving sub-50μs latency for real-time risk evaluation.",
                  label: "Network",
                  metric: "99.999% Uptime"
                },
                {
                  title: "Neural Sentry",
                  desc: "Distributed AI mesh utilizing polymorphic model updates for predictive threat isolation.",
                  label: "Security",
                  metric: "2M+ Nodes"
                },
                {
                  title: "Formal Proof",
                  desc: "Advanced ZK-STARK verification protocols ensuring mathematically guaranteed data integrity.",
                  label: "Verified",
                  metric: "Zero Trust"
                },
                {
                  title: "Cloud Surge",
                  desc: "Autonomous cluster orchestration for precision workload management across hybrid ecosystems.",
                  label: "Orchestration",
                  metric: "∞ Scalability"
                }
              ].map((protocol, i) => (
                <div
                  key={i}
                  className="group relative aspect-square bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-accent/40 transition-all duration-500 overflow-hidden preserve-3d cursor-pointer hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
                >
                  {/* Internal Glow */}
                  <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-accent/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10 h-full flex flex-col justify-start gap-12">
                    <div className="flex justify-between items-start">
                      <div className="w-14 h-14 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-accent font-black text-xl group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-inner">
                        0{i + 1}
                      </div>
                      <div className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded bg-accent/10 border border-accent/20 text-accent transition-colors">
                        {protocol.label}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-[10px] font-bold text-accent/60 uppercase tracking-widest">{protocol.metric}</div>
                      <h4 className="text-2xl font-black text-white tracking-tighter uppercase italic">{protocol.title}</h4>
                      <p className="text-zinc-500 text-sm font-semibold leading-relaxed group-hover:text-zinc-300 transition-colors line-clamp-3">
                        {protocol.desc}
                      </p>
                      <div className="pt-2 w-full h-px bg-white/5 group-hover:bg-accent/20 transition-colors" />
                      <div className="flex items-center gap-2 text-[8px] font-black text-accent/40 group-hover:text-accent tracking-[0.3em] uppercase">
                        View Technical Docs
                        <span className="w-1 h-1 bg-current rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Glassmorphic Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Large Text Breakdown with 3D Parallax */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#050505] px-8 overflow-hidden z-[70]">
        <div className="w-full flex flex-col items-center relative py-40">
          <h3 className="text-[15vw] font-black text-stroke leading-none select-none opacity-5 hover:text-accent hover:opacity-100 transition-all duration-700 cursor-default uppercase italic tracking-tighter">
            INTEGRITY
          </h3>
          <h3 className="text-[15vw] font-black text-accent leading-none select-none italic text-center -mt-[3vw] uppercase tracking-tighter drop-shadow-[0_0_50px_rgba(190,242,100,0.4)] relative z-10">
            VELOCITY
          </h3>
          <h3 className="text-[15vw] font-black text-stroke leading-none select-none opacity-5 hover:text-accent hover:opacity-100 transition-all duration-700 cursor-default uppercase -mt-[3vw] tracking-tighter">
            SECURITY
          </h3>
        </div>
      </section>

      <footer className="relative pt-64 pb-20 px-8 bg-black border-t border-white/5 overflow-hidden z-[80]">
        {/* Massive Background Watermark */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none select-none overflow-hidden h-[35vh]">
          <span className="text-[25vw] font-black leading-none italic opacity-3 text-white tracking-tighter translate-y-1/4">
            ITZFIZZ
          </span>
        </div>

        {/* Top Gradient Border */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-24 xl:gap-40">

            {/* Branding & Vision */}
            <div className="space-y-10 max-w-sm">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-12 h-12 bg-accent rounded-xl rotate-12 flex items-center justify-center text-black font-black text-2xl italic group-hover:rotate-0 transition-transform duration-500">F</div>
                <span className="text-4xl font-black tracking-tighter text-white italic">ITZFIZZ</span>
              </div>
              <p className="text-zinc-500 text-xl font-medium leading-relaxed tracking-tight">
                Pioneering the future of digital risk management with <span className="text-zinc-300">high-velocity architecture</span> and formal security orchestration.
              </p>

              {/* Live Status Indicator */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 group cursor-default">
                <div className="relative w-2 h-2">
                  <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-75" />
                  <div className="relative w-2 h-2 bg-accent rounded-full" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-accent transition-colors">
                  All Systems Operational
                </span>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 lg:gap-20">
              <div className="space-y-8">
                <h5 className="text-zinc-300 text-[10px] font-black uppercase tracking-[0.3em] border-b border-accent/20 pb-4 inline-block">Platform</h5>
                <div className="flex flex-col gap-5 text-zinc-500 font-bold text-sm uppercase tracking-wider">
                  {["Architecture", "Security", "Telemetry", "Deployment"].map((link) => (
                    <a key={link} href="#" className="hover:text-accent transition-all hover:translate-x-1">{link}</a>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <h5 className="text-zinc-300 text-[10px] font-black uppercase tracking-[0.3em] border-b border-accent/20 pb-4 inline-block">Company</h5>
                <div className="flex flex-col gap-5 text-zinc-500 font-bold text-sm uppercase tracking-wider">
                  {["Our Story", "Leadership", "Careers", "Press"].map((link) => (
                    <a key={link} href="#" className="hover:text-accent transition-all hover:translate-x-1">{link}</a>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <h5 className="text-zinc-300 text-[10px] font-black uppercase tracking-[0.3em] border-b border-accent/20 pb-4 inline-block">Connect</h5>
                <div className="flex flex-col gap-5 text-zinc-500 font-bold text-sm uppercase tracking-wider">
                  {["X / Twitter", "LinkedIn", "Discord", "GitHub"].map((link) => (
                    <a key={link} href="#" className="hover:text-accent transition-all hover:translate-x-1">{link}</a>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <h5 className="text-zinc-300 text-[10px] font-black uppercase tracking-[0.3em] border-b border-accent/20 pb-4 inline-block">Legal</h5>
                <div className="flex flex-col gap-5 text-zinc-500 font-bold text-sm uppercase tracking-wider">
                  {["Privacy", "Terms", "Compliance", "Cookies"].map((link) => (
                    <a key={link} href="#" className="hover:text-accent transition-all hover:translate-x-1">{link}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col gap-3">
              <span className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 ITZFIZZ TECHNOLOGIES.</span>
              <span className="text-zinc-600 text-[9px] font-bold uppercase tracking-[0.3em]">Precision Infrastructure Group</span>
            </div>

            <div className="flex gap-8 items-center text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">API Docs</a>
              <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
              <span className="text-zinc-600">Built for Velocity.</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
