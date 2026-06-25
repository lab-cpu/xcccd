import { useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingCart, Truck, CreditCard, Sparkles, CheckCircle, Smartphone } from "lucide-react";
import { CartItem } from "../types";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string | undefined, color: string | undefined, delta: number) => void;
  onRemoveItem: (productId: string, size: string | undefined, color: string | undefined) => void;
  onClearCart: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartSidebarProps) {
  if (!isOpen) return null;

  const [cep, setCep] = useState("");
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingError, setShippingError] = useState("");

  const [coupon, setCoupon] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "processing" | "success">("cart");
  const [orderId, setOrderId] = useState("");

  // Subtotal calculation
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // CEP Calculation simulation
  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setShippingError("");
    const cleanedCep = cep.replace(/\D/g, "");
    if (cleanedCep.length !== 8) {
      setShippingError("CEP inválido. Digite 8 dígitos (ex: 78000-000).");
      return;
    }

    if (subtotal >= 299) {
      setShippingCost(0);
    } else {
      // Simulate shipping cost based on CEP digit ranges
      const firstDigit = parseInt(cleanedCep[0]);
      if (firstDigit <= 2) {
        setShippingCost(15.90);
      } else if (firstDigit <= 5) {
        setShippingCost(19.90);
      } else {
        setShippingCost(24.90);
      }
    }
    setShippingCalculated(true);
  };

  // Coupon application simulation
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (coupon.trim().toUpperCase() === "ARENA10") {
      setDiscountApplied(true);
      setDiscountAmount(subtotal * 0.1); // 10% off
    } else if (coupon.trim() === "") {
      setCouponError("Por favor, digite um cupom.");
    } else {
      setCouponError("Cupom inválido ou expirado.");
    }
  };

  // Checkout submit simulation
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep("processing");

    setTimeout(() => {
      const generatedOrderId = "AR" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedOrderId);
      setCheckoutStep("success");
    }, 2000);
  };

  // Handle final completion reset
  const handleFinish = () => {
    onClearCart();
    setCheckoutStep("cart");
    setShippingCalculated(false);
    setDiscountApplied(false);
    setCep("");
    setCoupon("");
    onClose();
  };

  // Final Total calculation
  const finalShipping = subtotal >= 299 ? 0 : (shippingCalculated ? shippingCost : 19.90);
  const finalTotal = subtotal + finalShipping - (discountApplied ? discountAmount : 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-xs transition-opacity" 
        onClick={checkoutStep === "processing" ? undefined : onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        {/* Slide-over panel */}
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-zinc-100">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-900">
              <ShoppingCart className="w-5 h-5 text-lime-500" />
              <h3 className="font-display font-extrabold text-lg uppercase tracking-tight">
                Seu Carrinho
              </h3>
            </div>
            <button
              onClick={onClose}
              disabled={checkoutStep === "processing"}
              className="p-1.5 rounded-full hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MAIN CONTAINER CONTENT SWITCHER */}
          {checkoutStep === "processing" && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-zinc-100 border-t-lime-400 rounded-full animate-spin"></div>
                <CreditCard className="w-6 h-6 text-zinc-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h4 className="font-display font-extrabold text-lg text-zinc-950 uppercase tracking-tight">
                Processando Transação...
              </h4>
              <p className="text-sm text-zinc-500 mt-2 max-w-xs">
                Estamos efetuando sua conexão segura com a adquirente bancária para validar os itens e taxas. Por favor, não feche esta página.
              </p>
            </div>
          )}

          {checkoutStep === "success" && (
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
              <div className="text-center">
                <div className="mx-auto bg-emerald-50 h-16 w-16 rounded-full flex items-center justify-center text-emerald-500 mb-6 border border-emerald-100">
                  <CheckCircle className="w-10 h-10 animate-pulse" />
                </div>
                
                <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                  Pedido Confirmado!
                </span>

                <h4 className="font-display font-black text-2xl text-zinc-950 mt-4 uppercase tracking-tight leading-none">
                  OBRIGADO COMPRADOR!
                </h4>
                
                <p className="text-zinc-500 text-xs mt-2">
                  Seu pedido foi faturado e enviado para separação em nosso Performance Lab.
                </p>

                {/* Slip Details container */}
                <div className="mt-6 bg-zinc-50 border border-zinc-100 p-4 rounded-2xl text-left">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-zinc-200">
                    <span className="text-zinc-500 font-medium">Nº do Pedido</span>
                    <span className="font-mono font-bold text-zinc-950">{orderId}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-2 border-b border-zinc-200">
                    <span className="text-zinc-500 font-medium">Data do Pedido</span>
                    <span className="font-mono text-zinc-800">Hoje às {new Date().toLocaleTimeString("pt-BR", {hour: "2-digit", minute:"2-digit"})}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2">
                    <span className="text-zinc-500 font-medium">Total Pago</span>
                    <span className="font-display font-extrabold text-zinc-950 text-sm">
                      {finalTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>
                </div>

                {/* PIX simulation box */}
                <div className="mt-6 border border-lime-200 bg-lime-50/50 rounded-2xl p-4 text-center flex flex-col items-center">
                  <div className="bg-lime-400 p-1.5 rounded-lg text-zinc-950 mb-2">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h5 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">Pagar com PIX Rápido</h5>
                  <p className="text-[11px] text-zinc-600 mt-1 max-w-xs leading-relaxed">
                    Copie a chave Pix abaixo para pagar instantaneamente no aplicativo do seu banco:
                  </p>
                  
                  {/* Mock PIX key */}
                  <div className="mt-3 bg-white border border-zinc-200 py-2.5 px-3 rounded-lg w-full text-center flex items-center justify-between text-xs font-mono text-zinc-600 select-all">
                    <span className="truncate">pix.arena.sport.performance.789214@banco.com</span>
                    <span className="text-[10px] text-lime-600 font-bold ml-2 shrink-0 cursor-pointer uppercase hover:underline">Copiar</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleFinish}
                  className="w-full py-4 bg-zinc-950 hover:bg-zinc-900 text-white font-display font-bold text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Voltar à Loja
                </button>
              </div>
            </div>
          )}

          {checkoutStep === "cart" && (
            <>
              {/* Product list */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="bg-zinc-50 p-4 rounded-full text-zinc-400 border border-zinc-100 mb-4">
                      <ShoppingCart className="w-8 h-8" />
                    </div>
                    <h4 className="font-display font-bold text-base text-zinc-950 uppercase tracking-tight">
                      Carrinho Vazio
                    </h4>
                    <p className="text-xs text-zinc-500 mt-2 max-w-xs">
                      Parece que você ainda não adicionou nenhum item esportivo. Visite o nosso catálogo e equipe-se!
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-5 px-5 py-2.5 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-display font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all"
                    >
                      Continuar Comprando
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => {
                      const itemTotal = item.product.price * item.quantity;
                      return (
                        <div 
                          key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                          className="flex gap-4 bg-white rounded-2xl border border-zinc-100 p-3 hover:border-zinc-200 transition-all shadow-2xs relative group"
                        >
                          {/* Image */}
                          <div className="w-20 h-20 bg-zinc-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-zinc-100">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.product.id}/200/200`;
                              }}
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="font-display font-bold text-sm text-zinc-900 leading-tight line-clamp-1 pr-6">
                                {item.product.name}
                              </h4>
                              
                              {/* Selected choices */}
                              <div className="flex flex-wrap gap-x-2 mt-1 text-[10px] text-zinc-500 font-mono">
                                {item.selectedSize && (
                                  <span>Tam: <strong className="text-zinc-800">{item.selectedSize}</strong></span>
                                )}
                                {item.selectedColor && (
                                  <span>Cor: <strong className="text-zinc-800">{item.selectedColor}</strong></span>
                                )}
                              </div>
                            </div>

                            {/* Quantity Mutator & Price row */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1.5 border border-zinc-200 bg-zinc-50 px-2 py-1 rounded-lg">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColor, -1)}
                                  className="p-0.5 rounded-md hover:bg-white text-zinc-500 hover:text-zinc-950 transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-mono font-bold text-zinc-800 px-1">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.selectedColor, 1)}
                                  className="p-0.5 rounded-md hover:bg-white text-zinc-500 hover:text-zinc-950 transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-mono text-sm font-bold text-zinc-950">
                                {itemTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                              </span>
                            </div>
                          </div>

                          {/* Remove button */}
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                            className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-rose-500 rounded-md hover:bg-zinc-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            title="Remover item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bottom calculations & Forms */}
              {cart.length > 0 && (
                <div className="border-t border-zinc-100 bg-zinc-50 p-6 space-y-4 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
                  
                  {/* CEP shipping estimator Form */}
                  <form onSubmit={handleCalculateShipping} className="flex gap-2">
                    <div className="relative flex-1">
                      <Truck className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="Simular CEP (ex: 78000-000)"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-lime-400"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider cursor-pointer"
                    >
                      Calcular
                    </button>
                  </form>
                  {shippingError && <p className="text-[10px] text-rose-600 font-medium font-mono mt-0.5">{shippingError}</p>}
                  {shippingCalculated && !shippingError && (
                    <div className="flex justify-between items-center bg-white border border-zinc-200 px-3 py-2 rounded-xl text-xs">
                      <span className="text-zinc-500 font-medium">Prazo Estimado de Envio:</span>
                      <strong className="text-zinc-900 font-mono">
                        {shippingCost === 0 ? "Grátis (2 a 5 dias)" : `${shippingCost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} (3 a 7 dias)`}
                      </strong>
                    </div>
                  )}

                  {/* Promo Code Form */}
                  {!discountApplied ? (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <Sparkles className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                        <input
                          type="text"
                          placeholder="Cupom de desconto"
                          className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs uppercase focus:outline-hidden focus:ring-2 focus:ring-lime-400"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 rounded-xl text-xs font-bold font-display uppercase tracking-wider cursor-pointer"
                      >
                        Aplicar
                      </button>
                    </form>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 px-3 py-2.5 rounded-xl text-xs flex justify-between items-center">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
                        <span>Cupom <strong>ARENA10</strong> ativo (10% OFF)</span>
                      </span>
                      <button
                        onClick={() => { setDiscountApplied(false); setDiscountAmount(0); }}
                        className="text-[10px] text-rose-600 font-bold hover:underline font-mono uppercase"
                      >
                        Remover
                      </button>
                    </div>
                  )}
                  {couponError && <p className="text-[10px] text-rose-600 font-medium font-mono mt-0.5">{couponError}</p>}

                  {/* Pricing Breakdown Sheet */}
                  <div className="space-y-1.5 border-t border-zinc-200 pt-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Subtotal de Itens</span>
                      <span className="font-mono text-zinc-900">{subtotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Frete</span>
                      <span className="font-mono text-zinc-900">
                        {subtotal >= 299 ? "Grátis" : (shippingCalculated ? (shippingCost === 0 ? "Grátis" : shippingCost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })) : "Calcular CEP")}
                      </span>
                    </div>

                    {discountApplied && (
                      <div className="flex justify-between items-center text-xs text-emerald-700">
                        <span>Desconto Cupom</span>
                        <span className="font-mono">- {discountAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-baseline pt-2 border-t border-zinc-200">
                      <span className="font-display font-bold text-sm text-zinc-900 uppercase">Valor Total</span>
                      <span className="font-display font-black text-xl text-zinc-950 tracking-tight">
                        {finalTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-display font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-md shadow-lime-400/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="w-4.5 h-4.5" />
                    <span>Finalizar Compra</span>
                  </button>

                  <p className="text-[9px] text-zinc-400 text-center font-mono uppercase tracking-widest pt-1">
                    🔒 Processado com criptografia SSL 256 bits
                  </p>

                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
}
