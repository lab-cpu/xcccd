import { Star, Eye, ShoppingCart } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  // Format price as Brazilian Real (BRL)
  const formattedPrice = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="group bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-xs hover:shadow-xl hover:border-zinc-200 transition-all duration-300 flex flex-col h-full relative">
      
      {/* Category Tag & Stock Status badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        <span className="bg-zinc-950/85 backdrop-blur-xs text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md">
          {product.category === "calcados" && "Calçados"}
          {product.category === "equipamentos" && "Equipamentos"}
          {product.category === "vestuario" && "Vestuário"}
          {product.category === "acessorios" && "Acessórios"}
        </span>
        
        {!product.inStock && (
          <span className="bg-rose-500 text-white text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-md font-bold">
            Esgotado
          </span>
        )}
        
        {product.featured && product.inStock && (
          <span className="bg-lime-400 text-zinc-950 text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-md font-extrabold shadow-xs">
            Destaque
          </span>
        )}
      </div>

      {/* Image container with hover overlays */}
      <div className="relative aspect-4/3 overflow-hidden bg-zinc-50 flex items-center justify-center cursor-pointer" onClick={() => onViewDetails(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // fallback if any unsplash image gets rate limited
            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${product.id}/600/450`;
          }}
        />

        {/* Hover action overlay */}
        <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="p-3 bg-white text-zinc-950 rounded-full shadow-lg hover:bg-lime-400 hover:text-zinc-950 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
            title="Ver Detalhes"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Rating and Reviews */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 stroke-amber-400"
                    : "text-zinc-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-zinc-700 ml-1">
            {product.rating}
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Product Name */}
        <h3 
          onClick={() => onViewDetails(product)}
          className="font-display font-bold text-base text-zinc-900 group-hover:text-lime-600 transition-colors cursor-pointer line-clamp-1 mb-1.5"
        >
          {product.name}
        </h3>

        {/* Description Snippet */}
        <p className="text-xs text-zinc-500 font-sans line-clamp-2 mb-4 leading-relaxed font-light">
          {product.description}
        </p>

        {/* Price & Action Row */}
        <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono text-zinc-400 tracking-wider">A partir de</span>
            <span className="font-display font-extrabold text-lg text-zinc-950 tracking-tight">
              {formattedPrice}
            </span>
          </div>

          {product.inStock ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="p-2.5 bg-zinc-950 hover:bg-lime-400 text-white hover:text-zinc-950 rounded-xl transition-all shadow-xs flex items-center justify-center group/btn active:scale-95"
              title="Adicionar ao Carrinho"
            >
              <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            </button>
          ) : (
            <span className="text-xs font-mono uppercase font-bold text-zinc-400 bg-zinc-50 px-2.5 py-1.5 rounded-lg border border-zinc-200">
              Sem estoque
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
