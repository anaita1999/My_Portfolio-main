import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAdminAuth } from '@/context/AdminAuthContext';
import CustomCursor from '@/components/portfolio/CustomCursor';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginStep1, loginStep2, isAuthenticated } = useAdminAuth();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [code, setCode] = useState('');
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [loading, setLoading] = useState(false);

  // If already authenticated, direct to dashboard
  if (isAuthenticated) {
    navigate('/admin', { replace: true });
  }

  // Handle Step 1: Email & Password
  const handleStep1Submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error('Please enter your admin email and password.');
      return;
    }
    setLoading(true);
    try {
      const data = await loginStep1(email, password);
      if (data.temp_token) {
        setTempToken(data.temp_token);
        setStep(2);
        toast.info(data.message || 'Credentials verified. Please enter your 2FA Authenticator code.');
      }
    } catch (err) {
      const detail = err.response?.data?.detail || 'Invalid email or password.';
      toast.error(detail);
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 2: 2FA TOTP Code / Backup Code
  const handleStep2Submit = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error('Please enter your 6-digit 2FA code or backup recovery code.');
      return;
    }
    setLoading(true);
    try {
      const data = await loginStep2(tempToken, code);
      if (data.access_token) {
        toast.success('2-Factor Authentication verified. Welcome back, Anaita!');
        navigate('/admin');
      }
    } catch (err) {
      const detail = err.response?.data?.detail || 'Invalid 2FA code. Please check your Authenticator app.';
      toast.error(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-[#dfe7e0] flex items-center justify-center p-6 relative overflow-hidden">
      <CustomCursor />

      {/* Subtle Background Radial Ambient Glow */}
      <div
        className="absolute pointer-events-none w-[600px] h-[600px] rounded-full blur-[140px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #e0231c 0%, rgba(224,35,28,0) 70%)',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      <div
        className="w-full max-w-md relative z-10 p-8 rounded-2xl border border-[rgba(224,35,28,0.25)] bg-[rgba(10,14,20,0.85)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(224,35,28,0.15)]"
      >
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-[#e0231c] text-white font-mono font-bold text-sm shadow-[0_0_24px_rgba(224,35,28,0.6)]">
            AP
          </div>
          <h1 className="font-display text-2xl font-light text-white tracking-wide">
            Sanctuary <span className="text-[#e0231c] font-normal">Command Portal</span>
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#78837c] mt-1.5 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#32d278] shadow-[0_0_8px_#32d278]" />
            High-Security 2FA Authentication
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
              step === 1
                ? 'bg-[rgba(224,35,28,0.2)] text-[#e0231c] border border-[rgba(224,35,28,0.4)]'
                : 'bg-[rgba(255,255,255,0.05)] text-[#78837c]'
            }`}
          >
            <span>01</span> Email & Password
          </div>
          <span className="text-[#78837c] text-xs">→</span>
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
              step === 2
                ? 'bg-[rgba(224,35,28,0.2)] text-[#e0231c] border border-[rgba(224,35,28,0.4)]'
                : 'bg-[rgba(255,255,255,0.05)] text-[#78837c]'
            }`}
          >
            <span>02</span> 2FA TOTP Code
          </div>
        </div>

        {/* Form Step 1: Email + Password */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#aab4ad] mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="anaita.pal.cse@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c] focus:ring-1 focus:ring-[#e0231c] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#aab4ad] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(223,231,224,0.12)] text-white text-sm focus:outline-none focus:border-[#e0231c] focus:ring-1 focus:ring-[#e0231c] transition-colors pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#78837c] hover:text-white px-1"
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-lg font-mono text-xs uppercase tracking-[0.24em] font-semibold text-white transition-all duration-300 shadow-[0_0_20px_rgba(224,35,28,0.4)] disabled:opacity-50 hover:scale-[1.01]"
              style={{
                background: 'linear-gradient(135deg, #ff5a3c, #e0231c)',
              }}
            >
              {loading ? 'Verifying Credentials...' : 'Continue to 2FA Code →'}
            </button>
          </form>
        )}

        {/* Form Step 2: 2FA TOTP Code */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-5">
            <div className="p-3.5 rounded-lg bg-[rgba(224,35,28,0.08)] border border-[rgba(224,35,28,0.2)] text-xs text-[#dfe7e0] leading-relaxed">
              Open your <strong>Google Authenticator</strong>, <strong>Authy</strong>, or password manager app and enter the active 6-digit code for <em>Anaita Pal Portfolio</em>.
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#aab4ad]">
                  {useBackupCode ? 'Emergency Recovery Backup Code' : '6-Digit Authenticator Code'}
                </label>
                <button
                  type="button"
                  onClick={() => setUseBackupCode(!useBackupCode)}
                  className="font-mono text-[9px] uppercase tracking-wider text-[#e0231c] hover:underline"
                >
                  {useBackupCode ? 'Use 6-digit OTP' : 'Use backup code'}
                </button>
              </div>

              <input
                type="text"
                required
                autoFocus
                placeholder={useBackupCode ? 'ANAITA-8821-4902' : '000000'}
                maxLength={useBackupCode ? 32 : 6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3.5 rounded-lg bg-[rgba(255,255,255,0.06)] border border-[rgba(224,35,28,0.4)] text-center text-white font-mono text-xl tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-[#e0231c] transition-all"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-lg font-mono text-[10px] uppercase tracking-wider text-[#78837c] border border-[rgba(223,231,224,0.12)] hover:text-white hover:border-white/30 transition-colors"
              >
                ← Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-2/3 py-3.5 rounded-lg font-mono text-xs uppercase tracking-[0.2em] font-semibold text-white transition-all duration-300 shadow-[0_0_20px_rgba(224,35,28,0.4)] disabled:opacity-50 hover:scale-[1.01]"
                style={{
                  background: 'linear-gradient(135deg, #ff5a3c, #e0231c)',
                }}
              >
                {loading ? 'Authenticating...' : 'Unlock Admin 🔐'}
              </button>
            </div>
          </form>
        )}

        {/* Back to Home Link */}
        <div className="mt-8 text-center pt-6 border-t border-[rgba(223,231,224,0.08)]">
          <Link
            to="/"
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#78837c] hover:text-[#e0231c] transition-colors"
          >
            ← Return to Public Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
