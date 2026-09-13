import { useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingBag, ArrowUpRight, TrendingUp, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ArisetekCursor from "../../components/arisetek/ArisetekCursor";
import { toast } from "sonner";

const products = [
  { id: 1, name: "VELOURS D'OR COAT", price: "₹11,60,000", image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "AURORA SAPPHIRE WATCH", price: "₹24,00,000", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "LEATHER KAIROS TOTE", price: "₹6,50,000", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "SILK SERENITY DRESS", price: "₹5,10,000", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "DIAMOND ECLIPSE CUFF", price: "₹15,80,000", image: "https://images.unsplash.com/photo-1599643478514-4a11011c77f0?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "VELVET LUNA LOAFERS", price: "₹2,80,000", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400" },
];

export default function AuraCommerceDemo() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#111113] font-serif text-white overflow-x-hidden selection:bg-[#d4af37]/30">
      <ArisetekCursor />
      
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#d4af37]/10 to-transparent pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-[#d4af37]/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-6 md:px-8 py-6 max-w-[1400px] mx-auto z-50 relative border-b border-white/5">
        <Link to="/#portfolio" className="flex items-center gap-2 group">
          <ArrowLeft className="w-4 h-4 text-white/50 group-hover:text-[#d4af37] transition-colors" />
          <span className="text-xl md:text-2xl font-normal tracking-widest text-[#d4af37]">
            AURA <span className="text-white">Commerce</span>
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-8 text-xs font-sans uppercase tracking-[0.15em] text-white/70">
          <span className="text-[#d4af37] cursor-default">Collections</span>
          <span className="hover:text-white transition-colors cursor-pointer" onClick={() => toast.info("New seasonal collection preview")}>New Arrivals</span>
          <span className="hover:text-white transition-colors cursor-pointer" onClick={() => toast.info("Accessories catalog loaded")}>Accessories</span>
          <Link to="/portfolio" className="text-[#ffd15c] hover:underline font-mono text-[11px]">
            Founder Sanctuary ⛩️
          </Link>
        </div>
        <div className="flex items-center gap-6 text-xs font-sans uppercase tracking-[0.15em] text-white/70">
          <span className="hover:text-white transition-colors cursor-pointer">Cart [4]</span>
          <Search className="w-4 h-4 text-white/70 hover:text-white cursor-pointer" />
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-6 pt-16 pb-32 relative z-10">
        
        {/* Intelligent Selections Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl tracking-widest text-[#d4af37] uppercase font-light">Intelligent Selections</h1>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                key={product.id} 
                className="group relative bg-gradient-to-b from-white/10 to-transparent p-[1px] rounded-2xl overflow-hidden"
              >
                <div className="bg-[#1a1a1c] h-full rounded-2xl p-6 flex flex-col items-center justify-between transition-colors group-hover:bg-[#222225]">
                  <div className="w-full h-48 md:h-56 relative mb-6 rounded-lg overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1c] via-transparent to-transparent opacity-80 group-hover:opacity-0 transition-opacity duration-500" />
                  </div>
                  <div className="w-full flex justify-between items-end">
                    <div>
                      <h3 className="text-sm font-sans tracking-[0.2em] uppercase text-white/90 mb-2">{product.name}</h3>
                      <p className="text-xl font-bold font-sans text-white">{product.price}</p>
                    </div>
                    <button 
                      onClick={() => toast.success(`Added ${product.name} to checkout bag!`)}
                      className="text-[#d4af37] text-sm font-sans tracking-widest hover:text-white transition-colors flex items-center gap-2"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
                <div className="absolute inset-0 border border-[#d4af37] rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none shadow-[0_0_20px_rgba(212,175,55,0.2)]" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Dynamic Pricing Engine Showcase */}
        <section className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-[#d4af37] font-sans text-xs uppercase tracking-widest font-bold mb-2 block">AI Core Integration</span>
            <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-3">Headless E-Commerce Architecture</h2>
            <p className="text-white/60 font-sans text-sm max-w-xl leading-relaxed">
              Sub-50ms page loads, global multi-currency checkout, dynamic price optimization based on real-time market inventory velocity.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="px-6 py-3 rounded-full border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all font-sans text-xs uppercase tracking-widest font-bold shrink-0"
          >
            Founder Architecture ↗
          </Link>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-xs text-white/40 font-sans">
        <p>© 2026 Aura Commerce · Powered by Arisetek IT Solutions</p>
      </footer>
    </div>
  );
}
