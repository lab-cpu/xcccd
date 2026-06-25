import { useState } from "react";
import { Search, ShoppingBag, User, Dumbbell, Menu, X, HelpCircle, PhoneCall } from "lucide-react";
import { CartItem } from "../types";

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function Navbar({
  cart,
  onOpenCart,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-100 shadow-xs backdrop-blur-md bg-opacity-95">
      {/* Top micro-banner */}
      <div className="bg-zinc-950 text-white text-[11px] py-2 px-4 font-mono uppercase tracking-widest text-center flex items-center justify-center gap-4">
        <span>⚡ FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 299</span>
        <span className="hidden md:inline">|</span>
        <span className="hidden md:inline">🔥 CUPOM: ARENA10 (10% OFF NA PRIMEIRA COMPRA)</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSelectCategory("todos")}>
            <div className="bg-lime-400 p-2 rounded-lg text-zinc-950 shadow-sm flex items-center justify-center">
              <Dumbbell className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-2xl tracking-tight text-zinc-950 uppercase leading-none">
                Arena<span className="text-lime-500 font-black">.</span>Sport
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase leading-none mt-0.5">
                Performance Lab
              </span>
            </div>
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 h-4 text-zinc-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar tênis, equipamentos, camisetas..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-lime-400 focus:border-lime-400 focus:bg-white transition-all text-zinc-800 placeholder-zinc-400"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs font-mono"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            
            {/* Help / Contact */}
            <a href="#contato" className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-950 transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-zinc-400" />
              <span>Suporte</span>
            </a>

            {/* Profile simulation */}
            <button className="p-2 rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 transition-all flex items-center gap-1">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-medium text-zinc-600">Entrar</span>
            </button>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              id="cart-trigger"
              className="p-2.5 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 transition-all flex items-center gap-2.5 relative shadow-md hover:shadow-lg group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-lime-400 text-zinc-950 text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center animate-bounce border-2 border-zinc-950">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold tracking-wider uppercase font-mono">
                Carrinho
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile search & actions bar */}
      <div className="md:hidden px-4 pb-4 border-b border-zinc-100">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 h-4 text-zinc-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-lime-400 text-zinc-800 placeholder-zinc-400"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile Menu Expansion */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-100 py-4 px-4 animate-fadeIn">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-mono uppercase text-zinc-400 mb-1 px-2">Categorias de Produtos</p>
            <button
              onClick={() => { onSelectCategory("todos"); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${selectedCategory === "todos" ? "bg-lime-400/20 text-zinc-900 font-bold" : "text-zinc-600 hover:bg-zinc-50"}`}
            >
              Todos os Produtos
            </button>
            <button
              onClick={() => { onSelectCategory("calcados"); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${selectedCategory === "calcados" ? "bg-lime-400/20 text-zinc-900 font-bold" : "text-zinc-600 hover:bg-zinc-50"}`}
            >
              Calçados
            </button>
            <button
              onClick={() => { onSelectCategory("equipamentos"); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${selectedCategory === "equipamentos" ? "bg-lime-400/20 text-zinc-900 font-bold" : "text-zinc-600 hover:bg-zinc-50"}`}
            >
              Equipamentos
            </button>
            <button
              onClick={() => { onSelectCategory("vestuario"); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${selectedCategory === "vestuario" ? "bg-lime-400/20 text-zinc-900 font-bold" : "text-zinc-600 hover:bg-zinc-50"}`}
            >
              Vestuário
            </button>
            <button
              onClick={() => { onSelectCategory("acessorios"); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${selectedCategory === "acessorios" ? "bg-lime-400/20 text-zinc-900 font-bold" : "text-zinc-600 hover:bg-zinc-50"}`}
            >
              Acessórios
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
