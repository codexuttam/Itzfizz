import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Formal Header */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg rotate-12 flex items-center justify-center text-black font-black text-xl italic">F</div>
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
        <button className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-accent transition-colors">
          Get Started
        </button>
      </nav>

      {/* Hero Section with 3D Animation */}
      <div className="relative z-0">
        <Hero />
      </div>

      {/* Transition Section - Higher z-index to cover hero spillover */}
      <section className="relative py-64 flex flex-col items-center justify-center border-t border-white/5 bg-[#050505] z-[60]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

        <div className="max-w-6xl w-full px-8 relative z-10 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
              <div className="inline-block px-4 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-widest">
                New Standard v4.0
              </div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic leading-[0.9]">
                ARCHITECTURE <br /> <span className="text-accent underline decoration-accent/20 underline-offset-[12px]">OF VELOCITY.</span>
              </h2>
              <p className="text-zinc-500 text-xl leading-relaxed max-w-xl font-medium">
                We re-engineered digital risk management from the ground up.
                Focusing on low-latency execution and high-fidelity 3D data visualization.
              </p>
              <div className="flex flex-wrap gap-6">
                <button className="px-10 py-5 bg-accent text-black font-bold rounded-2xl hover:translate-y-[-4px] transition-all shadow-[0_20px_40px_-10px_rgba(190,242,100,0.3)]">
                  Launch Console
                </button>
                <button className="px-10 py-5 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 hover:translate-y-[-4px] transition-all">
                  Key Metrics
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 perspective-1000">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:border-accent/30 transition-all group overflow-hidden relative preserve-3d hover:rotate-Y-[-10deg] cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-accent/20 mb-6 flex items-center justify-center text-accent font-black text-xl">
                    0{i}
                  </div>
                  <h4 className="text-xl font-black mb-3">Protocol {i}</h4>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">Encrypted high-speed data packets.</p>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
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

      <footer className="py-40 px-8 bg-black border-t border-white/5 relative overflow-hidden z-[80]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-20 relative z-10">
          <div className="space-y-8 max-w-md">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-xl rotate-12 flex items-center justify-center text-black font-black text-2xl italic">F</div>
              <span className="text-3xl font-black tracking-tighter text-white italic">ITZFIZZ</span>
            </div>
            <p className="text-zinc-500 text-xl font-medium leading-relaxed">
              Pioneering the future of digital risk with high-velocity
              intelligence and formal security.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
            <div className="space-y-6">
              <h5 className="text-zinc-300 text-[10px] font-black uppercase tracking-widest">Company</h5>
              <div className="flex flex-col gap-4 text-zinc-500 font-bold text-sm uppercase tracking-wider">
                <a href="#" className="hover:text-accent transition-colors">Our Story</a>
                <a href="#" className="hover:text-accent transition-colors">Careers</a>
                <a href="#" className="hover:text-accent transition-colors">Contact</a>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="text-zinc-300 text-[10px] font-black uppercase tracking-widest">Connect</h5>
              <div className="flex flex-col gap-4 text-zinc-500 font-bold text-sm uppercase tracking-wider">
                <a href="#" className="hover:text-accent transition-colors">X / Twitter</a>
                <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-accent transition-colors">Discord</a>
              </div>
            </div>
            <div className="space-y-6">
              <h5 className="text-zinc-300 text-[10px] font-black uppercase tracking-widest">Legal</h5>
              <div className="flex flex-col gap-4 text-zinc-500 font-bold text-sm uppercase tracking-wider">
                <a href="#" className="hover:text-accent transition-colors">Privacy</a>
                <a href="#" className="hover:text-accent transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-700 text-[10px] font-black uppercase tracking-[0.3em]">
          <span>© 2026 ITZFIZZ. All Systems Operational.</span>
          <span className="text-zinc-500">Built for the next generation.</span>
        </div>
      </footer>
    </main>
  );
}
