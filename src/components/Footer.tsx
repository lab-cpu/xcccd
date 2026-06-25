import { useState } from "react";
import { Dumbbell, Mail, Phone, MapPin, Instagram, Facebook, ShieldCheck } from "lucide-react";

interface FooterProps {
  onSelectCategory: (categoryId: string) => void;
}

export default function Footer({ onSelectCategory }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer id="contato" className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Signup Banner */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 shadow-xl">
          <div className="max-w-lg">
            <span className="text-lime-400 text-xs font-mono font-bold uppercase tracking-widest block mb-1">
              Fique por dentro
            </span>
            <h3 className="text-white font-display font-black text-2xl uppercase tracking-tight">
              FAÇA PARTE DO NOSSO CLUBE DE PERFORMANCE
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 font-sans font-light">
              Assine nossa newsletter e receba <strong>10% de desconto</strong> na sua próxima compra, além de acessos antecipados a lançamentos exclusivos de tênis de fibra de carbono.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            {subscribed ? (
              <div className="bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 p-4 rounded-xl text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>E-mail cadastrado com sucesso! Verifique sua caixa de entrada para resgatar seu cupom.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-zinc-500" />
                  <input
                    type="email"
                    required
                    placeholder="Seu melhor e-mail esportivo..."
                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-display font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Cadastrar
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Main Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-lime-400 p-2 rounded-lg text-zinc-950 flex items-center justify-center">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-xl tracking-tight text-white uppercase">
                Arena<span className="text-lime-400">.</span>Sport
              </span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed font-sans font-light">
              Desde 2018, fornecendo os melhores calçados, roupas tecnológicas e acessórios profissionais para atletas que buscam ir além.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-widest font-mono mb-4">
              Categorias
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onSelectCategory("calcados")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Calçados de Alta Performance
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory("equipamentos")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Equipamentos & Treino
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory("vestuario")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Vestuário Dry-Fit
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory("acessorios")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Garrafas Térmicas & Acessórios
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-widest font-mono mb-4">
              Ajuda & Suporte
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#ajuda" className="hover:text-white transition-colors">Envios e Prazos de Frete</a></li>
              <li><a href="#ajuda" className="hover:text-white transition-colors">Trocas e Devoluções Fáceis</a></li>
              <li><a href="#ajuda" className="hover:text-white transition-colors">Tabela de Medidas de Calçados</a></li>
              <li><a href="#ajuda" className="hover:text-white transition-colors">Políticas de Privacidade</a></li>
            </ul>
          </div>

          {/* Contacts Column */}
          <div className="space-y-4">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-widest font-mono mb-4">
              Fale Conosco
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-lime-400 shrink-0" />
                <span>(65) 3052-1920 (Segunda a Sexta, 8h às 18h)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-lime-400 shrink-0" />
                <span className="break-all">suporte@arenasportlab.com.br</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-lime-400 shrink-0" />
                <span>Av. Historiador Rubens de Mendonça, 1200 - Cuiabá, MT</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Credentials */}
        <div className="border-t border-zinc-900 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-zinc-600 font-mono">
          <div className="flex flex-col md:items-start text-center md:text-left gap-1">
            <span>© 2026 Arena Sport Performance Lab Ltda. Todos os direitos reservados.</span>
            <span>CNPJ: 18.241.999/0001-58</span>
          </div>

          {/* Safe seal & payment tags */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-[9px] uppercase tracking-wider font-bold text-emerald-500/80 bg-emerald-500/5 border border-emerald-500/10 px-2 py-1 rounded">
              🛡️ COMPRA SEGURA SSL
            </span>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 bg-zinc-900 text-zinc-500 rounded font-bold uppercase tracking-widest text-[8px] border border-zinc-800">
                PIX
              </span>
              <span className="px-1.5 py-0.5 bg-zinc-900 text-zinc-500 rounded font-bold uppercase tracking-widest text-[8px] border border-zinc-800">
                Visa
              </span>
              <span className="px-1.5 py-0.5 bg-zinc-900 text-zinc-500 rounded font-bold uppercase tracking-widest text-[8px] border border-zinc-800">
                Master
              </span>
              <span className="px-1.5 py-0.5 bg-zinc-900 text-zinc-500 rounded font-bold uppercase tracking-widest text-[8px] border border-zinc-800">
                Elo
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
