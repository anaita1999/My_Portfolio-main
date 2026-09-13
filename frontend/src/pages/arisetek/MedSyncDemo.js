import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Calendar, Clock, ChevronRight, Stethoscope, FileText, UserCircle2, ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import ArisetekCursor from "../../components/arisetek/ArisetekCursor";
import axios from "axios";
import { toast } from "sonner";
import API_BASE from "../../apiConfig";

export default function MedSyncDemo() {
  const [selectedDate, setSelectedDate] = useState("24 Aug");
  const [selectedTime, setSelectedTime] = useState("02:30 PM");
  const [doctorName, setDoctorName] = useState("Dr. Sarah Jenkins");
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail) {
      toast.error("Please provide your name and email to schedule.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/contact`, {
        name: bookingName,
        email: bookingEmail,
        message: `MedSync Demo Appointment: ${doctorName} on ${selectedDate} at ${selectedTime}`,
        source: "Demo: MedSync Healthcare",
      });
      toast.success(`Appointment confirmed with ${doctorName} on ${selectedDate} at ${selectedTime}!`);
      setBookingName("");
      setBookingEmail("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030509] text-white selection:bg-[#00E5FF] selection:text-black">
      <ArisetekCursor />
      
      {/* Background Cinematic Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00E5FF]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-6 md:px-8 py-6 max-w-7xl mx-auto z-50 relative">
        <Link to="/#portfolio" className="flex items-center gap-2 group">
          <ArrowLeft className="w-4 h-4 text-white/50 group-hover:text-[#00E5FF] transition-colors" />
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#00E5FF]" />
            <span className="text-xl font-bold tracking-tight">MedSync</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <span className="text-[#00E5FF] border-b-2 border-[#00E5FF] pb-1 cursor-default">Home</span>
          <a href="#symptom-checker" className="hover:text-white transition-colors">Symptom Checker</a>
          <a href="#appointments" className="hover:text-white transition-colors">Appointments</a>
          <Link to="/portfolio" className="text-[#ffd15c] hover:underline font-mono text-xs">
            Founder Sanctuary ⛩️
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="flex flex-col items-center justify-center pt-16 md:pt-20 pb-12 md:pb-16 text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight">
            Your Health, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-blue-400 drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">Synced.</span>
          </h1>
          <p className="text-base md:text-xl text-white/70 font-light tracking-wide max-w-2xl mx-auto">
            AI-Powered Diagnostics & Effortless Appointment Scheduling
          </p>
        </motion.div>
      </header>

      {/* Main Dashboard Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        
        {/* Left Column: AI Diagnostics */}
        <motion.div 
          id="symptom-checker"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 md:p-8 backdrop-blur-md">
            <p className="text-[#00E5FF] text-xs font-bold tracking-[0.2em] uppercase mb-2 font-mono">MedSync AI Diagnostics</p>
            <h2 className="text-2xl font-semibold mb-6">AI-driven Symptom Checker</h2>
            
            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-6">
              <textarea 
                className="w-full bg-transparent text-white placeholder-white/40 resize-none outline-none text-sm leading-relaxed" 
                rows={4}
                defaultValue="Patient describes mild tension headache for 2 days, slight fatigue, and screen eye strain. Vital parameters within standard range."
              />
            </div>

            <button 
              onClick={() => toast.success("AI Analysis Complete: Low urgency tension headache. Recommended: Hydration, screen breaks & Dr. Sarah Jenkins consultation.")}
              className="w-full py-3.5 bg-gradient-to-r from-[#00E5FF] to-blue-500 rounded-xl text-black font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all cursor-pointer"
            >
              Analyze Symptoms with AI ⚡
            </button>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-xs text-white/70 font-mono uppercase tracking-wider mb-4">Common Symptom Profiles</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: <Activity className="w-5 h-5"/>, label: "Fever" },
                  { icon: <UserCircle2 className="w-5 h-5"/>, label: "Cough" },
                  { icon: <Activity className="w-5 h-5"/>, label: "Headache" },
                  { icon: <Activity className="w-5 h-5"/>, label: "Fatigue" }
                ].map((sym, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/5 rounded-xl hover:border-[#00E5FF]/50 transition-colors cursor-pointer">
                    <div className="text-[#00E5FF] mb-1.5">{sym.icon}</div>
                    <span className="text-[10px] text-white/60 tracking-wider uppercase font-mono">{sym.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Scheduling */}
        <motion.div 
          id="appointments"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col gap-6"
        >
          <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 md:p-8 backdrop-blur-md">
            <p className="text-[#00E5FF] text-xs font-bold tracking-[0.2em] uppercase mb-2 font-mono">Instant Triage</p>
            <h2 className="text-2xl font-semibold mb-6">Schedule Consultation</h2>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">Select Physician</label>
                <select 
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#00E5FF]"
                >
                  <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (Neurology & General)</option>
                  <option value="Dr. Michael Chang">Dr. Michael Chang (Internal Medicine)</option>
                  <option value="Dr. Elena Vance">Dr. Elena Vance (Cardiology)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">Date</label>
                  <select 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#00E5FF]"
                  >
                    <option value="24 Aug">Today, 24 Aug</option>
                    <option value="25 Aug">Tomorrow, 25 Aug</option>
                    <option value="26 Aug">Wed, 26 Aug</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">Slot</label>
                  <select 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-[#00E5FF]"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:45 PM">04:45 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">Your Name</label>
                <input 
                  type="text"
                  required
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#00E5FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">Email Address</label>
                <input 
                  type="email"
                  required
                  value={bookingEmail}
                  onChange={(e) => setBookingEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#00E5FF]"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#00E5FF]/20 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black transition-all border border-[#00E5FF]/40 rounded-xl font-bold text-sm tracking-wider uppercase font-mono flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "Confirming..." : "Confirm Appointment"}</span>
              </button>
            </form>
          </div>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-xs text-white/50 font-mono">
        <p>© 2026 MedSync · Engineered by Arisetek IT Solutions</p>
      </footer>
    </div>
  );
}
