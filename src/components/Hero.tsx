import { Play, TrendingUp, ShieldCheck, Zap } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <div className="relative bg-zinc-950 overflow-hidden min-h-[500px] md:min-h-[620px] flex items-center">
      
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-[50%] h-[120%] bg-lime-400 opacity-10 rounded-full blur-3xl pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[80%] bg-blue-500 opacity-5 rounded-full blur-3xl pointer-events-none transform -translate-x-1/4 translate-y-1/4"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left text-white">
            
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-lime-400 px-3 py-1.5 rounded-full mb-6 font-mono text-xs tracking-wider uppercase">
              <span className="flex h-2 w-2 rounded-full bg-lime-400 animate-pulse"></span>
              <span>Coleção de Alta Performance 2026</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase">
              ELEVE SUA <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
                PERFORMANCE
              </span>
            </h1>
            
            <p className="mt-4 text-zinc-400 text-base sm:text-lg max-w-xl font-sans font-light">
              Equipamentos de engenharia avançada e calçados desenvolvidos com placas de carbono para que você quebre seus recordes pessoais. Sinta o amortecimento do amanhã.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <button
                onClick={onExploreClick}
                className="px-8 py-4 bg-lime-400 text-zinc-950 font-display font-extrabold text-sm uppercase tracking-wider rounded-xl hover:bg-lime-300 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-lime-400/20"
              >
                Explorar Catálogo
              </button>
              
              <a
                href="#sobre"
                className="px-6 py-4 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-white font-display font-bold text-sm uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Ver Tecnologia</span>
              </a>
            </div>

            {/* Micro badges */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-zinc-800 pt-8 w-full max-w-lg">
              <div className="flex flex-col">
                <span className="text-lime-400 font-display font-extrabold text-2xl">100%</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Garantia Original</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lime-400 font-display font-extrabold text-2xl">30 dias</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Devolução Livre</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lime-400 font-display font-extrabold text-2xl">⚡ Express</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Despacho em 24h</span>
              </div>
            </div>

          </div>

          {/* Visual Showcase (Stunning image with dynamic layout) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-[480px] lg:max-w-none group">
              
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 to-teal-400 rounded-3xl blur-md opacity-30 group-hover:opacity-40 transition-opacity"></div>
              
              {/* Main Image Frame */}
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl aspect-[16/10]">
                <img
                  src="/src/assets/images/sports_hero_banner_1782419960768.jpg"
                  alt="Arena Sport - High performance sneakers"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Image Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                
                {/* Floating telemetry HUD cards */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-lime-400/20 p-2 rounded-lg text-lime-400">
                      <Zap className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Elite Runner Pro-X</h4>
                      <p className="text-[10px] text-zinc-400">Tecnologia de propulsão com placa de carbono</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-lime-400 font-bold block">Novidade</span>
                    <span className="text-sm font-display font-bold text-white">R$ 899,90</span>
                  </div>
                </div>
              </div>

              {/* Auxiliary small indicator badgets */}
              <div className="absolute -top-4 -right-4 bg-lime-400 text-zinc-950 px-4 py-2 rounded-xl shadow-lg font-display font-black text-xs uppercase tracking-widest transform rotate-6 animate-pulse select-none hidden sm:block">
                Mais Vendido 🔥
              </div>

              <div className="absolute -bottom-6 -left-6 bg-zinc-900 border border-zinc-800 p-3 rounded-2xl shadow-xl flex items-center gap-2.5 max-w-[170px] select-none hidden sm:flex">
                <div className="bg-emerald-500/10 p-1.5 rounded-lg text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block">Amortecimento</span>
                  <span className="text-xs font-bold text-white uppercase font-display">+32% Retorno</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
