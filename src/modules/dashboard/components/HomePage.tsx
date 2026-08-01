import { useState, useEffect } from 'react';

import logoShort from '@/assets/nav_Short_Logo.png';
import logoFull from '@/assets/rsa-logo.png';
import iconPathway from '@/assets/nav_inline_icon_pathway.svg';
import iconBluebook from '@/assets/nav_inline_icon_bluebook.svg';
import iconNetwork from '@/assets/nav_inline_icon_network.svg';
import iconUserProfile from '@/assets/nav_inline_icon_user_profile.svg';
import iconSchedule from '@/assets/nav_inline_icon_schedule.svg';
import iconUserProf from '@/assets/nav_User_Profile.svg';
import iconSettings from '@/assets/nav_icon_Settings.svg';
import iconExpandCollapse from '@/assets/nav_Expand_Collapse_icon.svg';
import titleBarSvg from '@/assets/title-bar.svg';

import pathwayBg from '@/assets/pathway_pathway_bg.png';
import iconHello from '@/assets/pathway_icon_hello.svg';
import createNewBtn from '@/assets/pathway_create_new_aspiration.svg';

import { UntitledPathView } from './UntitledPathView';
import { BluebookView } from '@/modules/bluebook';

export const HomePage: React.FC<{ currentRoute?: string }> = ({ currentRoute = '#home' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [selectedNav, setSelectedNav] = useState('pathway');

  const navItems = [
    { id: 'pathway', label: 'Pathway', icon: iconPathway },
    { id: 'bluebook', label: 'Blue Book', icon: iconBluebook },
    { id: 'network', label: 'Network', icon: iconNetwork },
    { id: 'profile', label: 'My Profile', icon: iconUserProfile },
    { id: 'schedule', label: 'Schedule', icon: iconSchedule },
  ];

  return (
    <div className={`h-screen w-screen overflow-hidden flex bg-[#0e0f13] m-0 p-0 font-['Outfit',sans-serif]`}>

      {/* Sidebar */}
      <aside className={`h-full shrink-0 relative z-20 flex flex-col bg-black transition-[width] duration-200 ease-out overflow-hidden ${isExpanded ? 'w-[224px]' : 'w-[115px]'}`}>

        {/* Sidebar Body */}
        <div className={`flex flex-col flex-1 ${isExpanded ? 'py-[28px] px-5 items-stretch' : 'py-6 items-center'}`}>

          {/* Logo */}
          <div className={`mb-[60px] flex w-full ${isExpanded ? 'justify-start' : 'justify-center'}`}>
            <img src={logoShort} alt="RSA" className={`h-8 w-auto ${isExpanded ? 'hidden' : 'block'}`} />
            <img src={logoFull} alt="RightStepAhead" className={`h-7 w-auto ${isExpanded ? 'block' : 'hidden'}`} />
          </div>

          {/* Navigation Items */}
          <div className="flex-1 flex w-full justify-center">
            <nav className={`flex flex-col gap-2 ${isExpanded ? 'items-stretch w-full' : 'items-center'}`}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedNav(item.id)}
                  className={`group relative flex items-center border-0 rounded-lg cursor-pointer text-white font-medium text-[14px] transition-colors duration-150 ${isExpanded ? 'w-full justify-start px-3.5 h-[52px]' : 'w-[65px] h-[52px] justify-center'} ${selectedNav === item.id ? 'bg-[#3355f6]' : 'bg-transparent hover:bg-white/5'}`}
                >
                  <span className="relative inline-flex items-center justify-center">
                    <img src={item.icon} alt="" className="w-5 h-5 block" />
                    {!isExpanded && (
                      <span className="absolute left-1/2 bottom-[calc(100%+6px)] -translate-x-1/2 bg-[#3d3d45] text-white font-normal text-[13px] rounded px-2.5 py-1.5 whitespace-nowrap z-50 shadow-[0_4px_12px_rgba(0,0,0,0.25)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        {item.label}
                      </span>
                    )}
                  </span>
                  {isExpanded && <span className="ml-3 whitespace-nowrap">{item.label}</span>}
                </button>
              ))}
            </nav>
          </div>

          {/* Sidebar Bottom (Profile & Settings) */}
          <div className={`flex w-full mt-auto ${isExpanded ? 'flex-row items-center justify-between' : 'flex-col items-center gap-3'}`}>
            <div className="flex items-center gap-2">
              <img src={iconUserProf} alt="Profile" className="w-10 h-10 rounded-lg block" />
              {isExpanded && <div className="text-white text-sm font-medium">User Profile</div>}
            </div>

            <button type="button" className="w-10 h-10 p-0 bg-transparent border-0 cursor-pointer flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors">
              <img src={iconSettings} alt="Settings" className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" />
            </button>
          </div>

        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-30 h-full border-l border-[#272735]">

        {/* Toggle Sidebar Button (Positioned over the border) */}
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute z-40 left-0 top-[80px] -translate-x-1/2 w-4 h-6 p-0 border-0 bg-black cursor-pointer flex items-center justify-center rounded-r shadow-[2px_0_4px_rgba(0,0,0,0.5)] transition-transform"
        >
          <img src={iconExpandCollapse} alt="" className={`w-4 h-2.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Title Bar */}
        <header className="h-[67px] shrink-0 w-full relative z-10 flex items-center justify-end bg-[#0e0f13]">
          <img className="absolute inset-0 w-full h-full object-cover object-right" src={titleBarSvg} alt="" />

          <button
            type="button"
            className="relative z-10 flex items-center gap-2 border-0 rounded-full bg-[#2c2e35] p-1 mr-[34px] cursor-pointer"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
          >
            <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-[#3355f6]' : 'bg-transparent'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={isDark ? "#fff" : "transparent"} stroke={isDark ? "#fff" : "#9090b0"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </span>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${!isDark ? 'bg-[#3355f6]' : 'bg-transparent'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={!isDark ? "#fff" : "transparent"} stroke={!isDark ? "#fff" : "#9090b0"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            </span>
          </button>
        </header>

        {/* Main Content Pane */}
        <main className="flex-1 bg-[#0e0f13] relative overflow-hidden">
          {currentRoute === '#home' && selectedNav === 'pathway' && (
            <section className="absolute inset-0 overflow-hidden bg-[#0e0f13] flex flex-col justify-center responsive-scale">
              <img className="absolute inset-0 w-full h-full object-cover object-right opacity-90" src={pathwayBg} alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0e0f13] via-[#0e0f13]/90 via-[45%] to-[#0e0f13]/5" />

              {/* Vertically Centered Responsive Container */}
              <div className="relative px-6 md:px-12 lg:px-[96px] w-full max-w-[900px] z-10">
                <div className="flex items-center gap-2.5">
                  <img src={iconHello} alt="" className="w-5 h-5 lg:w-6 lg:h-6 block" />
                  <span className="font-['Outfit',sans-serif] font-medium text-[16px] lg:text-[20px] text-[#9090b0]">Hi Mohit</span>
                </div>
                <p className="mt-3 lg:mt-4 font-['Outfit',sans-serif] font-light text-[18px] md:text-[20px] lg:text-[22px] leading-[1.35] text-white">
                  Every meaningful achievement starts with a clear aspiration.
                </p>
                <h1 className="mt-3 w-full max-w-[720px] font-['Outfit',sans-serif] font-bold text-[24px] md:text-[28px] lg:text-[30px] leading-[1.25] text-transparent bg-clip-text bg-gradient-to-r from-[#002af4] via-[#02d9dd] via-[55%] to-[#5bb947]">
                  Start with your aspiration. We'll help you build the path to get there.
                </h1>
                <a className="mt-8 lg:mt-10 p-0 border-0 bg-transparent cursor-pointer inline-block hover:opacity-90 transition-opacity" href="#untitled-path">
                  <img src={createNewBtn} alt="Create New Aspiration" className="block w-[180px] md:w-auto" />
                </a>
              </div>
            </section>
          )}

          {currentRoute === '#untitled-path' && (
            <UntitledPathView />
          )}
        </main>
      </div>
    </div>
  );
};
