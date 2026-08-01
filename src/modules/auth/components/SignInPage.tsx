import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import primaryNavSvg from '@/assets/primary-nav.svg';
import signupHeroPng from '@/assets/signup-hero.png';
import titleBarSvg from '@/assets/title-bar.svg';
import rsaLogoPng from '@/assets/rsa-logo.png';

const MESSAGES = [
  {
    title: "Your future isn't decided today!",
    sub: "It's shaped by what you choose to learn and do every day.",
  },
  {
    title: 'Every expert was once a beginner.',
    sub: 'Start now, learn daily, and watch yourself grow.',
  },
];

export const SignInPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLogged, setKeepLogged] = useState(true);
  const [passError, setPassError] = useState(false);

  const [aspIndex, setAspIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const signInBtnRef = useRef<HTMLButtonElement>(null);
  const [carouselTop, setCarouselTop] = useState(0);

  // Aspirational carousel
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

  // Carousel layout alignment
  useLayoutEffect(() => {
    const syncCarousel = () => {
      if (signInBtnRef.current && splitContainerRef.current) {
        const btnRect = signInBtnRef.current.getBoundingClientRect();
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
  }, []);

  const handlePip = (idx: number) => {
    if (idx === aspIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setAspIndex(idx);
      setIsFading(false);
      startCarousel();
    }, 300);
  };

  const isDisabled = identifier.trim().length === 0 || password.length === 0;

  const handleSignIn = () => {
    if (isDisabled) return;
    if (password !== 'test') {
      setPassError(true);
      return;
    }
    // Simulate routing to home
    window.location.hash = '#home';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPassError(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0e0f13] m-0 p-0 font-['DM_Sans',sans-serif]">
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

          {/* Left Form Section */}
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

                {/* Email/Mobile field */}
                <div className="mt-6">
                  <label className="block mb-1.5 font-['Outfit',sans-serif] font-medium text-[13px] lg:text-[14px] text-[#f8f8fc]" htmlFor="identifier">
                    Enter Your Email or Mobile Number
                  </label>
                  <div className="flex items-center bg-[#08081a] border border-[#393948] rounded px-3 h-10 lg:h-11">
                    <input
                      id="identifier"
                      type="text"
                      placeholder="Enter your email or mobile number"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full bg-transparent border-0 outline-none font-['DM_Sans',sans-serif] text-[14px] leading-[18px] text-[#e8e8f2] placeholder-[#6b6b76]"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="mt-5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="font-['Outfit',sans-serif] font-medium text-[13px] lg:text-[14px] text-[#f8f8fc]">Password</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9c9ca3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                    </svg>
                  </div>
                  <div className={`flex items-center bg-[#08081a] border rounded px-3 h-10 lg:h-11 ${passError ? 'border-[#da4545]' : 'border-[#393948]'}`}>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="w-full bg-transparent border-0 outline-none font-['DM_Sans',sans-serif] text-[14px] leading-[18px] text-[#e8e8f2] placeholder-[#6b6b76]"
                    />
                    <button
                      type="button"
                      className="bg-transparent border-0 p-0 ml-2 cursor-pointer text-[#9c9ca3] flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8Z" /><circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9.9 4.2A10.9 10.9 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.2 3.2" />
                          <path d="M6.6 6.6A18.5 18.5 0 0 0 2 12s3 8 10 8a10.9 10.9 0 0 0 5.4-1.4" />
                          <path d="M14.1 14.1a3 3 0 1 1-4.2-4.2" /><path d="m2 2 20 20" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {passError && (
                    <div className="mt-1.5 font-['Outfit',sans-serif] font-medium text-[12px] text-[#da4545]">
                      Incorrect Password
                    </div>
                  )}
                </div>

                {/* Keep logged in */}
                <button
                  type="button"
                  className="flex items-center gap-2 mt-4 bg-transparent border-0 p-0 cursor-pointer"
                  onClick={() => setKeepLogged(!keepLogged)}
                >
                  <span className={`w-4 h-4 rounded-[3px] flex items-center justify-center ${keepLogged ? 'bg-[#3355f6] border-0' : 'bg-transparent border-[1.5px] border-[#6b6b76]'}`}>
                    {keepLogged && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <span className="font-['Outfit',sans-serif] text-[14px] text-[#f8f8fc]">Keep me logged in</span>
                </button>

                {/* Primary action button */}
                <button
                  ref={signInBtnRef}
                  type="button"
                  className="w-full flex items-center justify-center border-0 rounded h-10 lg:h-11 mt-6 bg-[#3355f6] text-white font-['Outfit',sans-serif] font-bold text-[14px] lg:text-[15px] cursor-pointer shadow-[0_1px_0.25px_rgba(29,41,61,0.02)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2541cc] transition-colors"
                  disabled={isDisabled}
                  onClick={handleSignIn}
                >
                  Sign In
                </button>

                {/* Footer Inside Card */}
                <div className="flex items-center justify-between mt-6 shrink-0">
                  <div className="flex items-center gap-1 font-['DM_Sans',sans-serif] text-[11px] lg:text-[12px] text-[#6b6b76]">
                    Don't have an account? <a className="font-['Outfit',sans-serif] font-semibold text-[11px] lg:text-[12px] text-[#6177ff] no-underline hover:underline ml-1" href="#signup">Register</a>
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

            {/* Aspirational copy inside the right section, dynamically aligned with Sign In button */}
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
                      className={`block h-[3px] border-0 p-0 rounded-full cursor-pointer transition-all duration-300 ${
                        idx === aspIndex ? 'w-[12px] bg-[#3355f6]' : 'w-[8px] bg-white/40'
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
