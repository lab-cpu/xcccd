/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { Grid, Footprints, Dumbbell, Shirt, Compass, SlidersHorizontal, ChevronRight, PackageCheck, Heart, AlertCircle } from "lucide-react";
import { PRODUCTS, CATEGORIES, REVIEWS } from "./data";
import { Product, CartItem, Review } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import CartSidebar from "./components/CartSidebar";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function getCategoryIcon(iconName: string) {
  switch (iconName) {
    case "Grid": return <Grid className="w-4 h-4 sm:w-4.5 sm:h-4.5" />;
    case "Footprints": return <Footprints className="w-4 h-4 sm:w-4.5 sm:h-4.5" />;
    case "Dumbbell": return <Dumbbell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />;
    case "Shirt": return <Shirt className="w-4 h-4 sm:w-4.5 sm:h-4.5" />;
    case "Compass": return <Compass className="w-4 h-4 sm:w-4.5 sm:h-4.5" />;
    default: return <Grid className="w-4 h-4 sm:w-4.5 sm:h-4.5" />;
  }
}

export default function App() {
  // Application State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [sortBy, setSortBy] = useState<"relevancia" | "preco-menor" | "preco-maior" | "rating">("relevancia");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Scroll to store catalog section
  const scrollToCatalog = () => {
    const catalogElement = document.getElementById("catalogo");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Add item to cart
  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    setCart((prevCart) => {
      // Check if product with same size and color already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, { product, quantity: 1, selectedSize: size, selectedColor: color }];
      }
    });

    // Automatically trigger cart sidebar to open so the user sees direct action feedback
    setIsCartOpen(true);
  };

  // Quick instant add to cart from the catalog card (selects default options)
  const handleInstantAddToCart = (product: Product) => {
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : undefined;
    handleAddToCart(product, defaultSize, defaultColor);
  };

  // Update item quantity
  const handleUpdateQuantity = (
    productId: string,
    size: string | undefined,
    color: string | undefined,
    delta: number
  ) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          ) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  // Remove item completely
  const handleRemoveItem = (productId: string, size: string | undefined, color: string | undefined) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
  };

  // Empty cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Add review to list
  const handleAddReview = (newReview: Omit<Review, "id" | "avatar" | "date">) => {
    const review: Review = {
      ...newReview,
      id: "r-" + Date.now(),
      avatar: "", // Will render generic user icon
      date: "Hoje",
    };
    setReviews((prev) => [review, ...prev]);
  };

  // Favorite product toggle
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Real-time catalog filters (category, search, sorting)
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Filter by category
    if (selectedCategory !== "todos") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // 3. Sort
    if (sortBy === "preco-menor") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "preco-maior") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } // Relevance defaults to original sequence

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Quick stats about available products
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = { todos: PRODUCTS.length };
    PRODUCTS.forEach((p) => {
      stats[p.category] = (stats[p.category] || 0) + 1;
    });
    return stats;
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-800 flex flex-col font-sans selection:bg-lime-400 selection:text-zinc-950">
      
      {/* Top sticky navbar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q) scrollToCatalog();
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          scrollToCatalog();
        }}
      />

      {/* Main hero showcase */}
      <Hero onExploreClick={scrollToCatalog} />

      {/* Trust benefits ticker */}
      <section className="bg-zinc-100 border-b border-zinc-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5 bg-white p-4 rounded-xl border border-zinc-200/50 shadow-2xs">
              <div className="bg-lime-400/20 p-2.5 rounded-lg text-zinc-950">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-display uppercase tracking-wider text-zinc-900">Troca em até 30 dias</h4>
                <p className="text-[11px] text-zinc-500 font-sans">Experimente sem pressa, a 1ª devolução é por nossa conta</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white p-4 rounded-xl border border-zinc-200/50 shadow-2xs">
              <div className="bg-lime-400/20 p-2.5 rounded-lg text-zinc-950">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-display uppercase tracking-wider text-zinc-900">Performance Garantida</h4>
                <p className="text-[11px] text-zinc-500 font-sans">Artigos testados sob condições extremas de treino</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white p-4 rounded-xl border border-zinc-200/50 shadow-2xs">
              <div className="bg-lime-400/20 p-2.5 rounded-lg text-zinc-950">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-display uppercase tracking-wider text-zinc-900">Frete Rápido Sul & Centro</h4>
                <p className="text-[11px] text-zinc-500 font-sans">Despacho recorde direto do centro logístico integrado</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white p-4 rounded-xl border border-zinc-200/50 shadow-2xs">
              <div className="bg-lime-400/20 p-2.5 rounded-lg text-zinc-950">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-display uppercase tracking-wider text-zinc-900">Atendimento Especializado</h4>
                <p className="text-[11px] text-zinc-500 font-sans">Suporte via WhatsApp por corredores e personal trainers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Shop Section */}
      <main id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-10">
        
        {/* Category Header */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-lime-600">Catálogo Arena . Sport</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-950 uppercase tracking-tight mt-1">
            {selectedCategory === "todos" && "Todos os Equipamentos"}
            {selectedCategory === "calcados" && "Calçados Tecnológicos"}
            {selectedCategory === "equipamentos" && "Equipamentos de Força & Ação"}
            {selectedCategory === "vestuario" && "Vestuário Dry-Fit"}
            {selectedCategory === "acessorios" && "Acessórios de Performance"}
          </h2>
          <p className="text-zinc-500 text-sm max-w-2xl mt-2 font-sans font-light leading-relaxed">
            {CATEGORIES.find((c) => c.id === selectedCategory)?.description}
          </p>
        </div>

        {/* Categories Tab Navigation Slider */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between pb-6 border-b border-zinc-100 mb-8">
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 shrink-0 -mx-4 px-4 md:mx-0 md:px-0">
            {CATEGORIES.map((category) => {
              const count = categoryStats[category.id] || 0;
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs font-bold uppercase font-display tracking-wider border shrink-0 transition-all ${
                    isActive
                      ? "bg-zinc-950 border-zinc-950 text-white shadow-md shadow-zinc-950/10"
                      : "bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300"
                  }`}
                >
                  {getCategoryIcon(category.icon)}
                  <span>{category.name}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${isActive ? "bg-zinc-800 text-lime-400 font-bold" : "bg-zinc-100 text-zinc-500"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filtering, Search Info & Sort Row */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            
            {/* Search query tag feedback */}
            {searchQuery && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-lime-50 text-lime-950 border border-lime-100 text-xs font-medium rounded-lg font-mono">
                <span>Busca: "{searchQuery}"</span>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="font-black text-rose-500 hover:text-rose-700 ml-1"
                >
                  ×
                </button>
              </span>
            )}

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-zinc-400 shrink-0" />
              <select
                className="w-full sm:w-auto bg-white border border-zinc-200 rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 focus:outline-hidden focus:ring-2 focus:ring-lime-400"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="relevancia">Ordenar por: Relevância</option>
                <option value="preco-menor">Preço: Menor para Maior</option>
                <option value="preco-maior">Preço: Maior para Menor</option>
                <option value="rating">Melhor Avaliados ★</option>
              </select>
            </div>

          </div>
        </div>

        {/* Dynamic Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200 max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
            <h3 className="font-display font-bold text-base text-zinc-900 uppercase tracking-tight">Nenhum produto encontrado</h3>
            <p className="text-xs text-zinc-500 mt-2 max-w-xs mx-auto">
              Não encontramos resultados correspondentes aos seus filtros ou termo de busca <strong>"{searchQuery}"</strong>.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("todos");
              }}
              className="mt-5 px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Resetar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleInstantAddToCart}
                onViewDetails={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Technologies Section / Brand Pitch */}
      <section id="sobre" className="relative py-20 bg-zinc-950 overflow-hidden text-white border-t border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(163,230,53,0.06),transparent_50%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-lime-400 font-mono text-xs uppercase tracking-widest font-bold">Tecnologia Carbono</span>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight leading-none">
                ENGENHARIA QUE QUEBRA RECORDES
              </h2>
              
              <p className="text-zinc-400 text-sm sm:text-base font-sans font-light leading-relaxed">
                Nossos cientistas de materiais e designers esportivos projetam cada calçado da linha Elite com uma sanduíche perfeito: espuma de polímero aeroespacial com altíssimo amortecimento e uma placa de fibra de carbono trançada em curva 3D.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-lime-400/20 h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-lime-400 text-xs font-mono font-bold">1</div>
                  <div>
                    <h4 className="text-sm font-bold font-display uppercase tracking-wider text-white">Retorno Energético Ativo</h4>
                    <p className="text-xs text-zinc-500 mt-1">Converte o peso da pisada em força propulsora para economizar até 4% de esforço muscular por quilômetro.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-lime-400/20 h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-lime-400 text-xs font-mono font-bold">2</div>
                  <div>
                    <h4 className="text-sm font-bold font-display uppercase tracking-wider text-white">Dry-Fit Termorregulador</h4>
                    <p className="text-xs text-zinc-500 mt-1">Fibras hidrofóbicas que empurram o suor para a superfície externa para evaporação imediata, mantendo seu corpo leve.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-lime-400/20 h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-lime-400 text-xs font-mono font-bold">3</div>
                  <div>
                    <h4 className="text-sm font-bold font-display uppercase tracking-wider text-white">Liga de Titânio Ultraleve</h4>
                    <p className="text-xs text-zinc-500 mt-1">Presente nos equipamentos e halteres ajustáveis para garantir calibração micrométrica de pesos sem folgas.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Banner of dynamic athletic stats */}
            <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 p-8 sm:p-12 flex flex-col justify-between aspect-16/10 shadow-2xl">
              <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-lime-400/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex justify-between items-start">
                <div className="bg-lime-400 text-zinc-950 p-2.5 rounded-lg flex items-center justify-center shadow-md">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-full">
                  Performance Metrics
                </span>
              </div>

              <div className="space-y-6 my-8">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono uppercase text-zinc-400">
                    <span>Propulsão Mecânica</span>
                    <span className="text-lime-400 font-bold">+38.4%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-lime-400 rounded-full w-[88%]"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono uppercase text-zinc-400">
                    <span>Ventilação / Respirabilidade</span>
                    <span className="text-lime-400 font-bold">94/100</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-lime-400 rounded-full w-[94%]"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono uppercase text-zinc-400">
                    <span>Resistência ao Desgaste</span>
                    <span className="text-lime-400 font-bold">980 km</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-lime-400 rounded-full w-[78%]"></div>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-4 flex justify-between items-center text-xs font-mono text-zinc-500">
                <span>Modelo: Elite Runner v2.1</span>
                <span>Cuiabá Lab Verified</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Reviews Section */}
      <Testimonials reviews={reviews} onAddReview={handleAddReview} />

      {/* Footer component */}
      <Footer onSelectCategory={(catId) => {
        setSelectedCategory(catId);
        scrollToCatalog();
      }} />

      {/* Cart Drawer panel */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}

