import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import primaryNavSvg from '@/assets/primary-nav.svg';
import signupHeroPng from '@/assets/signup-hero.png';
import titleBarSvg from '@/assets/title-bar.svg';
import toastBgSvg from '@/assets/toast-bg.svg';
import rsaLogoPng from '@/assets/rsa-logo.png';

/* ── Aspirational copy data ───────────────────────────────────── */
interface AspirationalMessage {
  title: string;
  sub: string;
}

const MESSAGES: AspirationalMessage[] = [
  {
    title: "Your future isn't decided today!",
    sub: "It's shaped by what you choose to learn and do every day.",
  },
  {
    title: 'Every expert was once a beginner.',
    sub: 'Start now, learn daily, and watch yourself grow.',
  },
];

/* ── Component ────────────────────────────────────────────────── */
export const SignUpPage: React.FC = () => {
  const [mobileValue, setMobileValue] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [toastVisible, setToastVisible] = useState(false);
  const [aspIndex, setAspIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const otpBtnRef = useRef<HTMLButtonElement>(null);
  const [carouselTop, setCarouselTop] = useState(0);

  useLayoutEffect(() => {
    const syncCarousel = () => {
      if (otpBtnRef.current && splitContainerRef.current) {
        const btnRect = otpBtnRef.current.getBoundingClientRect();
        const containerRect = splitContainerRef.current.getBoundingClientRect();
        setCarouselTop(btnRect.top - containerRect.top);
      }
    };
    syncCarousel();
    window.addEventListener('resize', syncCarousel);
    const timer = setTimeout(syncCarousel, 150);
    return () => {
      window.removeEventListener('resize', syncCarousel);
      clearTimeout(timer);
    };
  }, [otpSent]);

  /* ---- derived ---- */
  const isDisabled = otpSent ? false : !/^\d{10}$/.test(mobileValue);

  /* ---- countdown ---- */
  const startCountdown = useCallback(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    setSeconds(60);
    tickRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          if (tickRef.current) clearInterval(tickRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const formattedTimer = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  /* ---- toast ---- */
  const showToast = useCallback(() => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setToastVisible(true);
    fadeTimerRef.current = setTimeout(() => setToastVisible(false), 15000);
    hideTimerRef.current = setTimeout(() => setToastVisible(false), 15500);
  }, []);

  /* ---- aspirational carousel ---- */
  const carouselTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCarousel = useCallback(() => {
    if (carouselTimerRef.current) clearInterval(carouselTimerRef.current);
    carouselTimerRef.current = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setAspIndex((prev) => (prev + 1) % MESSAGES.length);
        setIsFading(false);
      }, 300);
    }, 6000);
  }, []);

  useEffect(() => {
    startCarousel();
    return () => {
      if (carouselTimerRef.current) clearInterval(carouselTimerRef.current);
    };
  }, [startCarousel]);

  /* ---- cleanup ---- */
  useEffect(() => {
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  /* ---- input handler ---- */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setMobileValue(val);
  };

  /* ---- switch to OTP ---- */
  const switchToOtp = () => {
    setOtpSent(true);
    setMobileValue('');
    inputRef.current?.focus();
  };

  /* ---- action click ---- */
  const handleAction = () => {
    if (isDisabled) return;
    if (!otpSent) {
      switchToOtp();
      startCountdown();
      showToast();
      return;
    }
    window.location.hash = '#home';
  };

  /* ---- pip click ---- */
  const handlePip = (idx: number) => {
    if (idx === aspIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setAspIndex(idx);
      setIsFading(false);
      startCarousel();
    }, 300);
  };

  /* ---- resend ---- */
  const handleResend = () => {
    startCountdown();
    showToast();
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0e0f13] m-0 p-0 font-['DM_Sans',sans-serif]">

      {/* Toast Notification (Absolute Overlay) */}
      {toastVisible && (
        <div className="absolute z-50 top-4 left-1/2 -translate-x-1/2 h-[45px] w-[90%] max-w-[600px] flex items-center justify-start pl-6 transition-opacity duration-500 rounded overflow-hidden">
          <div
            className="absolute inset-0 -z-10 bg-cover bg-left bg-no-repeat opacity-90"
            style={{ backgroundImage: `url('${toastBgSvg}')` }}
          />
          <p className="m-0 text-left font-['DM_Sans',sans-serif] font-semibold text-[14px] text-white">
            A 6-digit code will be sent to this number. Enter it below to continue.
          </p>
        </div>
      )}

      {/* Left Sidebar (Fixed 115px) */}
      <aside className="w-[115px] h-full shrink-0 border-r border-[#272735] relative z-20 hidden md:block bg-[#0e0f13]">
        <img src={primaryNavSvg} alt="" className="w-full h-full object-contain object-left" />
      </aside>

      {/* Main Container */}
      <div className="flex flex-col flex-1 relative overflow-hidden min-h-0">
        {/* Top Title Bar */}
        <header className="h-[67px] w-full shrink-0 relative z-10 flex items-center justify-end bg-[#0e0f13]">
          <img className="absolute inset-0 w-full h-full object-cover object-right" src={titleBarSvg} alt="" />
        </header>

        {/* 50/50 Split Form & Hero */}
        <div ref={splitContainerRef} className="flex flex-col md:flex-row flex-1 w-full relative overflow-hidden min-h-0 responsive-scale">

          {/* Left Form Section (Strictly no scroll, perfectly centered) */}
          <section className="w-full md:w-1/2 flex flex-col items-center justify-center bg-[#0e0f13] relative z-10 px-4 py-2 overflow-hidden min-h-0">

            <div className="w-full max-w-[434px] flex flex-col justify-center">

              {/* Logo above the box */}
              <div className="mb-4 w-[238px] h-[32px] shrink-0">
                <img src={rsaLogoPng} alt="RightStepAhead" className="h-full w-auto object-contain block" />
              </div>

              {/* Form Card Box */}
              <div className="border border-[#272735] rounded-xl p-4 lg:p-6 flex flex-col justify-center bg-[#0B0F17] shrink-0 w-full">
                <h1 className="m-0 font-['Outfit',sans-serif] font-semibold text-xl lg:text-2xl tracking-[-0.192px] text-[#f8f8fc]">
                  Decoding Aspirations
                </h1>
                <p className="mt-1 lg:mt-2 w-full max-w-[277px] font-['Outfit',sans-serif] text-sm lg:text-base tracking-[-0.144px] text-[#f8f8fc]">
                  Sign up using your email address or mobile number
                </p>

                {/* Social buttons */}
                <div className="mt-4 flex flex-col gap-4 lg:gap-5">
                  <button type="button" className="flex items-center justify-center gap-3 border-0 rounded-md h-10 lg:h-11 cursor-pointer font-['Outfit',sans-serif] font-medium text-[14px] lg:text-[15px] tracking-[-0.144px] bg-[#fdfdfd] text-[#515151] hover:bg-gray-100 transition-colors">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                      <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.2-2.2H12v4.1h6.6c-.1 1.1-.9 2.8-2.5 3.9l3.8 3c2.3-2.1 3.6-5.2 3.6-8.8z" />
                      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.8-3c-1 .7-2.4 1.2-4.2 1.2-3.2 0-5.9-2.1-6.9-5l-3.9 3C3.2 21.3 7.3 24 12 24z" />
                      <path fill="#FBBC05" d="M5.1 14.3c-.3-.8-.4-1.5-.4-2.3s.2-1.6.4-2.3l-4-3C.4 8.3 0 10.1 0 12s.4 3.7 1.2 5.3l3.9-3z" />
                      <path fill="#EA4335" d="M12 4.8c2.3 0 3.8 1 4.7 1.8l3.4-3.3C18 1.2 15.2 0 12 0 7.3 0 3.2 2.7 1.2 6.7l3.9 3c1-2.9 3.7-4.9 6.9-4.9z" />
                    </svg>
                    Sign up with Google
                  </button>
                  <button type="button" className="flex items-center justify-center gap-3 border-0 rounded-md h-10 lg:h-11 cursor-pointer font-['Outfit',sans-serif] font-medium text-[14px] lg:text-[15px] tracking-[-0.144px] bg-[#272727] text-[#fdfdfd] hover:bg-[#333] transition-colors">
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="#fdfdfd" className="w-5 h-5">
                      <path d="M16.4 12.7c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.7 2.5 3 2.4 1.2 0 1.6-.8 3.1-.8 1.4 0 1.8.8 3.1.8 1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.5-3.9zM14 5.4c.7-.8 1.1-2 1-3.2-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3.1 1.1.1 2.2-.6 2.9-1.4z" />
                    </svg>
                    Sign in with Apple
                  </button>
                </div>

                {/* Divider */}
                <div className="relative mt-4 flex items-center gap-2">
                  <span className="flex-1 h-[1px] bg-[#404249]" />
                  <span className="font-['DM_Sans',sans-serif] italic font-medium text-sm text-[#b3b3b3]">or</span>
                  <span className="flex-1 h-[1px] bg-[#404249]" />
                </div>

                {/* Mobile / OTP field */}
                <div className="mt-4">
                  <label className="block mb-1.5 font-['Outfit',sans-serif] font-medium text-[13px] lg:text-[14px] text-[#f8f8fc]" htmlFor="mobile">
                    Enter Your Mobile Number
                  </label>
                  <div className="flex items-center bg-[#08081a] border border-[#393948] rounded px-3 h-10 lg:h-11">
                    <input
                      ref={inputRef}
                      id="mobile"
                      type={otpSent ? 'text' : 'tel'}
                      inputMode={otpSent ? 'numeric' : 'tel'}
                      maxLength={otpSent ? 6 : 10}
                      placeholder={otpSent ? 'Enter OTP' : 'Enter your registered contact number'}
                      autoComplete="tel"
                      value={mobileValue}
                      onChange={handleInput}
                      className="w-full bg-transparent border-0 outline-none font-['DM_Sans',sans-serif] text-[14px] leading-[18px] text-[#e8e8f2] placeholder-[#6b6b76]"
                    />
                  </div>
                </div>

                {/* OTP row */}
                {otpSent && (
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <div className="flex items-center gap-2">
                      <span className="font-['DM_Sans',sans-serif] text-[11px] lg:text-[12px] text-[#6b6b76]">Didn't receive it?</span>
                      <button type="button" className="bg-transparent border-0 p-0 cursor-pointer font-['Outfit',sans-serif] font-semibold text-[11px] lg:text-[12px] text-[#6177ff] hover:underline" onClick={handleResend}>
                        Resend OTP
                      </button>
                    </div>
                    <span className="font-['Outfit',sans-serif] font-semibold text-[11px] lg:text-[12px] text-[#6177ff]">{formattedTimer}</span>
                  </div>
                )}

                {/* Primary action button */}
                <button
                  ref={otpBtnRef}
                  type="button"
                  className="w-full flex items-center justify-center border-0 rounded h-10 lg:h-11 mt-5 bg-[#3355f6] text-white font-['Outfit',sans-serif] font-bold text-[14px] lg:text-[15px] cursor-pointer shadow-[0_1px_0.25px_rgba(29,41,61,0.02)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2541cc] transition-colors"
                  disabled={isDisabled}
                  onClick={handleAction}
                >
                  {otpSent ? 'Verify Code' : 'Send OTP'}
                </button>

                {/* Footer Inside Card */}
                <div className="flex items-center justify-between mt-5 shrink-0">
                  <div className="flex items-center gap-1 font-['DM_Sans',sans-serif] text-[11px] lg:text-[12px] text-[#6b6b76]">
                    Already have an account? <a className="font-['Outfit',sans-serif] font-semibold text-[11px] lg:text-[12px] text-[#6177ff] no-underline hover:underline ml-1" href="#signin">Sign In</a>
                  </div>
                  <a className="font-['Outfit',sans-serif] font-semibold text-[11px] lg:text-[12px] text-[#6177ff] no-underline hover:underline" href="#">Forgot Password?</a>
                </div>
              </div>
            </div>
          </section>

          {/* Right Hero Section */}
          <section className="flex-1 w-1/2 h-full relative overflow-hidden border-l border-[#272735] hidden md:block bg-[#0e0f13]">
            {/* Edge-to-edge cover image */}
            <img className="absolute inset-0 w-full h-full object-cover opacity-[0.35]" src={signupHeroPng} alt="Student looking ahead" />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e0f13]/85 via-[#0e0f13]/35 to-[#0e0f13]/15" />

            {/* Aspirational copy inside the right section, dynamically aligned with Send OTP button */}
            <div 
              className="absolute inset-x-0 flex flex-col px-8 lg:px-20 z-10 break-words whitespace-normal transition-all duration-300"
              style={carouselTop > 0 ? { top: `${carouselTop}px` } : { bottom: '60px' }}
            >
              <div className="w-full max-w-[637px]">
                <div className={`transition-opacity duration-300 ease-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                  <h2 className="m-0 text-white font-['Outfit',sans-serif] font-bold text-[24px] lg:text-[40px] leading-[1.2] tracking-[-0.5px]">
                    {MESSAGES[aspIndex].title}
                  </h2>
                  <p className="mt-2 lg:mt-4 text-white font-['Outfit',sans-serif] font-medium text-[16px] lg:text-[24px] leading-[1.35]">
                    {MESSAGES[aspIndex].sub}
                  </p>
                </div>
                <div className="flex gap-[4px] mt-6">
                  {MESSAGES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Message ${idx + 1}`}
                      className={`block h-[3px] border-0 p-0 rounded-full cursor-pointer transition-all duration-300 ${idx === aspIndex ? 'w-[12px] bg-[#3355f6]' : 'w-[8px] bg-white/40'
                        }`}
                      onClick={() => handlePip(idx)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
