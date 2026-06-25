import { useState, useEffect } from "react";
import { X, Star, ShoppingBag, Shield, RotateCcw, Truck } from "lucide-react";
import { Product } from "../types";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState(false);

  // Reset local selection state when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : "");
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : "");
      setSuccessMsg(false);
    }
  }, [product]);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 2500);
  };

  const formattedPrice = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-zinc-950/70 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-zinc-100 z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-950 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Images (Left side) */}
        <div className="md:w-1/2 bg-zinc-50 p-6 sm:p-8 flex items-center justify-center relative border-r border-zinc-100">
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-zinc-950 text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md">
              {product.category === "calcados" && "Calçados"}
              {product.category === "equipamentos" && "Equipamentos"}
              {product.category === "vestuario" && "Vestuário"}
              {product.category === "acessorios" && "Acessórios"}
            </span>
          </div>

          <div className="aspect-4/3 w-full rounded-2xl overflow-hidden shadow-xs bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${product.id}/600/450`;
              }}
            />
          </div>
        </div>

        {/* Product Details (Right side) */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between max-h-[60vh] md:max-h-[80vh] overflow-y-auto">
          <div>
            
            {/* Stock status & Rating header */}
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono uppercase ${
                product.inStock 
                  ? "bg-emerald-50 text-emerald-700" 
                  : "bg-rose-50 text-rose-700"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${product.inStock ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}></span>
                {product.inStock ? "Disponível em Estoque" : "Temporariamente Esgotado"}
              </span>

              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span className="text-sm font-bold text-zinc-900">{product.rating}</span>
                <span className="text-xs text-zinc-400">({product.reviewsCount} avaliações)</span>
              </div>
            </div>

            {/* Product Title */}
            <h2 className="font-display font-extrabold text-2xl text-zinc-950 mb-3 tracking-tight">
              {product.name}
            </h2>

            {/* Product Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-display font-black text-zinc-950 tracking-tight">
                {formattedPrice}
              </span>
              {product.inStock && (
                <span className="text-xs text-zinc-500 font-mono">
                  ou 10x de {(product.price / 10).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} sem juros
                </span>
              )}
            </div>

            {/* Product Description */}
            <p className="text-zinc-600 text-sm font-sans mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Custom Selectors: Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-zinc-900 uppercase font-mono tracking-wider">
                    Selecione o Tamanho
                  </span>
                  <a href="#tabela-medidas" className="text-xs text-lime-600 hover:underline font-mono">
                    Guia de Medidas
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 px-4 rounded-xl text-xs font-mono font-bold border transition-all ${
                        selectedSize === size
                          ? "bg-zinc-950 border-zinc-950 text-white"
                          : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Selectors: Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <span className="block text-xs font-bold text-zinc-900 uppercase font-mono tracking-wider mb-2">
                  Selecione a Cor: <span className="text-zinc-500 font-normal normal-case">{selectedColor}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                        selectedColor === color
                          ? "bg-zinc-950 border-zinc-950 text-white"
                          : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications Sheet */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mb-6 bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2 font-bold">
                  Especificações Técnicas
                </span>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex flex-col border-b border-zinc-100 pb-1">
                      <dt className="text-zinc-500 font-medium">{key}</dt>
                      <dd className="text-zinc-900 font-bold font-mono">{val}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

          </div>

          {/* Actions & Commit Area */}
          <div className="border-t border-zinc-100 pt-6 mt-4">
            
            {successMsg && (
              <div className="mb-3 bg-emerald-50 text-emerald-800 border border-emerald-100 px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2 animate-fadeIn">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Adicionado com sucesso ao carrinho!</span>
              </div>
            )}

            <div className="flex gap-3">
              {product.inStock ? (
                <button
                  onClick={handleAdd}
                  className="flex-1 h-14 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-display font-extrabold text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-md shadow-lime-400/10 cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                  <span>Adicionar ao Carrinho</span>
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 h-14 bg-zinc-100 text-zinc-400 font-display font-bold text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center gap-3 border border-zinc-200 cursor-not-allowed"
                >
                  <span>Produto Esgotado</span>
                </button>
              )}
            </div>

            {/* Bullet trust badges */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] text-zinc-500 font-sans text-center">
              <div className="flex flex-col items-center gap-1 bg-zinc-50 p-2 rounded-xl border border-zinc-100">
                <Shield className="w-3.5 h-3.5 text-zinc-400" />
                <span className="font-semibold text-zinc-700">Compra 100% Segura</span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-zinc-50 p-2 rounded-xl border border-zinc-100">
                <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
                <span className="font-semibold text-zinc-700">Troca Grátis 30 dias</span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-zinc-50 p-2 rounded-xl border border-zinc-100">
                <Truck className="w-3.5 h-3.5 text-zinc-400" />
                <span className="font-semibold text-zinc-700">Envio para todo o Brasil</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
