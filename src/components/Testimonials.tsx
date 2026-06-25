import { useState } from "react";
import { Star, MessageSquarePlus, User } from "lucide-react";
import { Review } from "../types";

interface TestimonialsProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, "id" | "avatar" | "date">) => void;
}

export default function Testimonials({ reviews, onAddReview }: TestimonialsProps) {
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    onAddReview({
      user: userName,
      rating,
      comment,
    });

    setUserName("");
    setRating(5);
    setComment("");
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormOpen(false);
    }, 2000);
  };

  return (
    <section id="avaliacoes" className="py-16 md:py-24 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-lime-600 font-mono text-xs uppercase tracking-widest font-bold">Feedback Real</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-950 uppercase tracking-tight mt-1">
              Avaliações de Atletas
            </h2>
            <p className="text-zinc-500 text-sm max-w-xl mt-2 font-light">
              Nossa missão é impulsionar sua performance. Veja o depoimento de atletas amadores e profissionais que treinam com os equipamentos da Arena Sport.
            </p>
          </div>

          <button
            onClick={() => setFormOpen(!formOpen)}
            className="inline-flex items-center gap-2.5 px-5 py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider font-display transition-all cursor-pointer self-start md:self-auto shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 text-lime-400" />
            <span>{formOpen ? "Fechar Formulário" : "Deixar uma Avaliação"}</span>
          </button>
        </div>

        {/* Add Review Form */}
        {formOpen && (
          <div className="mb-12 bg-white rounded-2xl p-6 md:p-8 border border-zinc-100 shadow-sm max-w-2xl animate-fadeIn">
            <h3 className="font-display font-bold text-lg text-zinc-950 mb-4 uppercase tracking-tight">
              Sua Opinião Importa
            </h3>
            
            {success ? (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Obrigado! Sua avaliação foi adicionada ao vivo com sucesso.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-500 mb-1.5 font-bold">
                      Seu Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João Silva"
                      className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-lime-400 text-zinc-800"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-500 mb-1.5 font-bold">
                      Classificação (Estrelas)
                    </label>
                    <div className="flex items-center gap-1 h-10">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 transition-transform hover:scale-110 cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-zinc-200"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-1.5 font-bold">
                    Seu Comentário / Relato do Equipamento
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Conte-nos o que achou da qualidade, entrega, conforto ou resistência de nossos produtos..."
                    className="w-full px-4 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-lime-400 text-zinc-800"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-display font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Enviar Avaliação
                </button>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-amber-400 stroke-amber-400"
                          : "text-zinc-100"
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-zinc-600 text-xs sm:text-sm font-sans italic leading-relaxed mb-6 font-light">
                  "{review.comment}"
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-3 border-t border-zinc-100 pt-4 mt-auto">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.user}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-200"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-500 flex items-center justify-center border border-zinc-200">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h4 className="font-display font-bold text-xs text-zinc-900">
                    {review.user}
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-400">
                    Atleta verificado | {review.date}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
