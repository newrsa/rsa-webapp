import { useState, useRef, useEffect } from 'react';

// Icons & Images
import iconCanvasGrad from '@/assets/untitled-path_icon_grad_canvas.svg';
import iconTimeline from '@/assets/untitled-path_tabs_icon_timeline.svg';
import iconCards from '@/assets/untitled-path_tabs_icon_cards.svg';
import iconMilestone from '@/assets/untitled-path_tabs_icon_milestone.svg';
import iconAccOpen from '@/assets/untitled-path_tabs_accordion_open.svg';
import iconAccClose from '@/assets/untitled-path_tabs_accordion_close.svg';

import iconBotSmall from '@/assets/untitled-path_icon_rsabot_small.svg';
import iconBotLarge from '@/assets/untitled-path_icon_rsabot_large.svg';
import imgPhd from '@/assets/untitled-path_image_phd_physics.png';
import imgEng from '@/assets/untitled-path_image_electronics_engineer.png';
import imgClinical from '@/assets/untitled-path_image_clinical_researcher.png';

import iconAttach from '@/assets/untitled-path_icon_attachment.svg';
import iconVoice from '@/assets/untitled-path_icon_voice_input.svg';

import iconWorklab from '@/assets/worklab_icon_Worklab.svg';
import iconRsaWorklab from '@/assets/worklab_icon_RSA_worklab.svg';
import iconConfigure from '@/assets/worklab_icon_configure.svg';
import iconGenerate from '@/assets/worklab_icon_generate.svg';
import iconStore from '@/assets/worklab_icon_store.svg';

// Check Icon
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const UntitledPathView: React.FC = () => {
  const [isWorklabOpen, setIsWorklabOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'cards' | 'milestones'>('timeline');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [pathTitle, setPathTitle] = useState('Untitled Path');

  // Resize State
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(38);
  const [worklabWidth, setWorklabWidth] = useState(26);
  const [isResizing, setIsResizing] = useState<0 | 1 | null>(null);

  useEffect(() => {
    if (isResizing === null) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      let newPercent = (mouseX / rect.width) * 100;

      // Engine minimum width in pixels to fit cards nicely
      const engineMinPx = 340;
      const engineMinPercent = (engineMinPx / rect.width) * 100;

      if (isResizing === 0) {
        if (newPercent < 20) newPercent = 20;
        let maxCanvasPercent = 100 - worklabWidth - engineMinPercent;
        if (newPercent > maxCanvasPercent) newPercent = maxCanvasPercent;
        setCanvasWidth(newPercent);
      } else if (isResizing === 1) {
        if (newPercent > 85) newPercent = 85;
        const maxLeft = canvasWidth + engineMinPercent;
        if (newPercent < maxLeft) newPercent = maxLeft;
        setWorklabWidth(100 - newPercent);
      }
    };
    const handleMouseUp = () => setIsResizing(null);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isResizing, canvasWidth]);

  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [isRoadmapGenerated, setIsRoadmapGenerated] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; sender: 'user' | 'bot' | 'thinking'; text: string; role?: string }>>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = (text: string, role?: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text }]);
    setChatInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { id: 'thinking', sender: 'thinking', text: '' }]);
      setTimeout(() => {
        setMessages(prev => {
          const filtered = prev.filter(m => m.id !== 'thinking');
          return [...filtered, {
            id: Date.now().toString(),
            sender: 'bot',
            text: '',
            role: role || text
          }];
        });
      }, 1500);
    }, 400);
  };

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Phase toggles
  const [phase1Open, setPhase1Open] = useState(true);
  const [phase2Open, setPhase2Open] = useState(false);

  // Task states
  const [tasksPhase1, setTasksPhase1] = useState([false, false, false, false]);
  const [tasksPhase2, setTasksPhase2] = useState([false, false, false, false]);

  const toggleTask1 = (index: number) => {
    const n = [...tasksPhase1];
    n[index] = !n[index];
    setTasksPhase1(n);
  };
  const toggleTask2 = (index: number) => {
    const n = [...tasksPhase2];
    n[index] = !n[index];
    setTasksPhase2(n);
  };

  const countPhase1 = tasksPhase1.filter(Boolean).length;
  const countPhase2 = tasksPhase2.filter(Boolean).length;

  return (
    <div ref={containerRef} className={`absolute inset-0 flex bg-slate-50 dark:bg-[#0e0f13] ${isWorklabOpen ? 'worklab-open' : ''}`}>

      {/* ================= RSA CANVAS ================= */}
      <section className="relative flex flex-col shrink min-w-0 transition-none" style={{ width: `${canvasWidth}%` }}>
        {/* Head */}
        <div className="p-5 lg:px-10 lg:py-5 bg-slate-50 dark:bg-[#08080f]">
          <div className="font-['Outfit',sans-serif] font-semibold text-[12px] tracking-[0.12em] text-[#5bb947]">
            RSA CANVAS
          </div>

          {isEditingTitle ? (
            <input
              autoFocus
              className="mt-3 w-full bg-transparent border-0 outline-none p-0 font-['Outfit',sans-serif] font-semibold text-[16px] text-slate-900 dark:text-white tracking-[-0.5px]"
              value={pathTitle}
              onChange={(e) => setPathTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') setIsEditingTitle(false);
              }}
            />
          ) : (
            <h1
              className="mt-3 flex items-center gap-2 font-['Outfit',sans-serif] font-semibold text-[16px] text-slate-900 dark:text-white tracking-[-0.5px] cursor-pointer"
              onClick={() => setIsEditingTitle(true)}
            >
              <span>{pathTitle || 'Untitled Path'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9090B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </h1>
          )}

          <div className="mt-3">
            <div className="relative w-full h-[6px] rounded-full bg-[#1e1e2a] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#002af4] to-[#02d9dd] transition-all duration-400 ease-out"
                style={{ width: `${Math.max(12, (countPhase1 + countPhase2) / 8 * 100)}%` }}
              />
            </div>
            <div className="mt-3 text-right font-['Outfit',sans-serif] font-medium text-[14px] text-slate-600 dark:text-[#9090b0]">
              {Math.round((countPhase1 + countPhase2) / 8 * 100)}% Complete
            </div>
          </div>
        </div>

        {/* Roadmap Body */}
        {!isRoadmapGenerated ? (
          <div className="flex-1 flex flex-col items-center justify-center pb-[60px]">
            <img src={iconCanvasGrad} alt="" className="w-20 h-[78px]" />
            <p className="mt-7 text-center max-w-[380px] font-['Outfit',sans-serif] font-light text-[16px] leading-[1.5] text-slate-600 dark:text-[#9090b0]">
              Chat with RSA Engine to start building your roadmap.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="grid grid-cols-3 border-y border-slate-200 dark:border-[#1e1e2a] bg-slate-50 dark:bg-[#0e0f13]">
              {[
                { id: 'timeline', label: 'Timeline', icon: iconTimeline },
                { id: 'cards', label: 'Cards', icon: iconCards },
                { id: 'milestones', label: 'Milestones', icon: iconMilestone },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  className={`flex items-center justify-center gap-2 py-3.5 bg-transparent border-0 cursor-pointer font-['Outfit',sans-serif] text-[15px] ${activeTab === tab.id ? 'bg-slate-100 dark:bg-[#1a1a24] font-semibold text-slate-900 dark:text-white' : 'font-normal text-slate-600 dark:text-[#9090b0]'}`}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  <img src={tab.icon} alt="" className={`w-4 h-4 ${activeTab === tab.id ? 'brightness-0 invert' : ''}`} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 lg:px-10 lg:py-6">
              {/* Timeline Tab */}
              {activeTab === 'timeline' && (
                <div className="flex flex-col gap-7">
                  {/* Phase 1 */}
                  <article className="flex items-start gap-3">
                    <button type="button" className="bg-transparent border-0 p-0 mt-1 cursor-pointer" onClick={() => setPhase1Open(!phase1Open)}>
                      <img src={phase1Open ? iconAccOpen : iconAccClose} alt="" className="w-4 h-4" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="m-0 font-['Outfit',sans-serif] font-semibold text-[18px] text-slate-900 dark:text-white">Class 8–9 (Now) — Build Foundations</h3>
                        <span className="px-2.5 py-1 rounded-md font-['Outfit',sans-serif] font-semibold text-[11px] tracking-[0.12em] whitespace-nowrap bg-[rgba(91,185,71,0.12)] border border-[#5bb947] text-[#5bb947]">ACTIVE</span>
                      </div>
                      <p className="mt-2.5 font-['Outfit',sans-serif] font-light text-[14px] leading-[1.5] text-slate-600 dark:text-[#9090b0]">
                        Build basics in Physics &amp; Maths. Start hobby electronics. Score 80%+.
                      </p>

                      {phase1Open && (
                        <div className="mt-4 flex flex-col gap-2.5">
                          {[
                            "Class 8–9th standard — Focus on important subjects like — Mathematics, Science",
                            "Watch and subscribe youtube channels related to learning add on as beginner",
                            "Join school's science club or the one near you",
                            "Score 80%+ in Maths and Science in 9th std this is important for Class 10"
                          ].map((txt, idx) => (
                            <button key={idx} type="button" onClick={() => toggleTask1(idx)} className="flex items-center gap-3 px-3.5 py-3 rounded-lg bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-[#1e1e2a] cursor-pointer text-left hover:border-[#3355f6] transition-colors">
                              <span className={`w-[18px] h-[18px] shrink-0 rounded border-[1.5px] flex items-center justify-center ${tasksPhase1[idx] ? 'bg-[#3355f6] border-[#3355f6]' : 'border-slate-400 dark:border-[#3a3a48] bg-transparent'}`}>
                                {tasksPhase1[idx] && <CheckIcon />}
                              </span>
                              <span className={`font-['Outfit',sans-serif] font-normal text-[14px] ${tasksPhase1[idx] ? 'text-slate-400 dark:text-[#6b6b76] line-through' : 'text-slate-800 dark:text-[#e6e6ee]'}`}>{txt}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>

                  {/* Phase 2 */}
                  <article className="flex items-start gap-3">
                    <button type="button" className="bg-transparent border-0 p-0 mt-1 cursor-pointer" onClick={() => setPhase2Open(!phase2Open)}>
                      <img src={phase2Open ? iconAccOpen : iconAccClose} alt="" className="w-4 h-4" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="m-0 font-['Outfit',sans-serif] font-semibold text-[18px] text-slate-900 dark:text-white">Class 10 — ICSE Board Exams</h3>
                        <span className="px-2.5 py-1 rounded-md font-['Outfit',sans-serif] font-semibold text-[11px] tracking-[0.12em] whitespace-nowrap bg-[rgba(232,163,61,0.12)] border border-[#e8a33d] text-[#e8a33d]">UP NEXT</span>
                      </div>
                      <p className="mt-2.5 font-['Outfit',sans-serif] font-light text-[14px] leading-[1.5] text-slate-600 dark:text-[#9090b0]">
                        Score 90%+. Decide on stream. Begin entrance exam awareness.
                      </p>

                      {phase2Open && (
                        <div className="mt-4 flex flex-col gap-2.5">
                          {[
                            "Enroll in school physics practical sessions",
                            "Make a board exam strategy — Prepare ICSE-specific from April of Class 9 itself",
                            "Search for the best tuition class nearby",
                            "Attend all school practicals without fail — ICSE practical marks carry significant weight"
                          ].map((txt, idx) => (
                            <button key={idx} type="button" onClick={() => toggleTask2(idx)} className="flex items-center gap-3 px-3.5 py-3 rounded-lg bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-[#1e1e2a] cursor-pointer text-left hover:border-[#3355f6] transition-colors">
                              <span className={`w-[18px] h-[18px] shrink-0 rounded border-[1.5px] flex items-center justify-center ${tasksPhase2[idx] ? 'bg-[#3355f6] border-[#3355f6]' : 'border-slate-400 dark:border-[#3a3a48] bg-transparent'}`}>
                                {tasksPhase2[idx] && <CheckIcon />}
                              </span>
                              <span className={`font-['Outfit',sans-serif] font-normal text-[14px] ${tasksPhase2[idx] ? 'text-slate-400 dark:text-[#6b6b76] line-through' : 'text-slate-800 dark:text-[#e6e6ee]'}`}>{txt}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </div>
              )}

              {/* Cards Tab */}
              {activeTab === 'cards' && (
                <div>
                  <div className="p-5 rounded-xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-[#1e1e2a]">
                    <div className="flex items-center justify-between">
                      <h3 className="m-0 font-['Outfit',sans-serif] font-semibold text-[16px] text-slate-900 dark:text-white">Class 8–9 (Now) — Build Foundations</h3>
                      <span className="px-2.5 py-1 rounded-md font-['Outfit',sans-serif] font-semibold text-[11px] tracking-[0.12em] bg-[rgba(91,185,71,0.12)] border border-[#5bb947] text-[#5bb947]">ACTIVE</span>
                    </div>
                    <p className="mt-2.5 mb-3.5 font-['Outfit',sans-serif] font-light text-[14px] text-slate-600 dark:text-[#9090b0]">Build basics in Physics &amp; Maths. Start hobby electronics. Score 80%+.</p>
                    <div className="font-['Outfit',sans-serif] text-[13px] text-slate-600 dark:text-[#9090b0]">{countPhase1} of 4 tasks complete</div>
                  </div>
                  <div className="mt-4 p-5 rounded-xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-[#1e1e2a]">
                    <div className="flex items-center justify-between">
                      <h3 className="m-0 font-['Outfit',sans-serif] font-semibold text-[16px] text-slate-900 dark:text-white">Class 10 — ICSE Board Exams</h3>
                      <span className="px-2.5 py-1 rounded-md font-['Outfit',sans-serif] font-semibold text-[11px] tracking-[0.12em] bg-[rgba(232,163,61,0.12)] border border-[#e8a33d] text-[#e8a33d]">UP NEXT</span>
                    </div>
                    <p className="mt-2.5 mb-3.5 font-['Outfit',sans-serif] font-light text-[14px] text-slate-600 dark:text-[#9090b0]">Score 90%+. Decide on stream. Begin entrance exam awareness.</p>
                    <div className="font-['Outfit',sans-serif] text-[13px] text-slate-600 dark:text-[#9090b0]">{countPhase2} of 4 tasks complete</div>
                  </div>
                </div>
              )}

              {/* Milestones Tab */}
              {activeTab === 'milestones' && (
                <div className="flex flex-col">
                  <div className="flex gap-3.5">
                    <div className="flex flex-col items-center">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#3355f6] shadow-[0_0_0_4px_rgba(51,85,246,0.2)]"></span>
                      <span className="w-0.5 flex-1 bg-[#1e1e2a] mt-1 min-h-[30px]"></span>
                    </div>
                    <div className="flex-1 pb-5">
                      <p className="m-0 font-['Outfit',sans-serif] font-semibold text-[15px] text-slate-900 dark:text-white">Foundation Built</p>
                      <p className="m-0 mt-1 font-['Outfit',sans-serif] font-light text-[13px] text-slate-600 dark:text-[#9090b0]">Class 8–9 · Physics, Maths and hobby electronics groundwork</p>
                    </div>
                  </div>
                  <div className="flex gap-3.5">
                    <div className="flex flex-col items-center">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#3355f6] shadow-[0_0_0_4px_rgba(51,85,246,0.2)]"></span>
                      <span className="w-0.5 flex-1 bg-[#1e1e2a] mt-1 min-h-[30px]"></span>
                    </div>
                    <div className="flex-1 pb-5">
                      <p className="m-0 font-['Outfit',sans-serif] font-semibold text-[15px] text-slate-900 dark:text-white">ICSE Boards Cleared</p>
                      <p className="m-0 mt-1 font-['Outfit',sans-serif] font-light text-[13px] text-slate-600 dark:text-[#9090b0]">Class 10 · Score 90%+ and lock the PCM stream</p>
                    </div>
                  </div>
                  <div className="flex gap-3.5">
                    <div className="flex flex-col items-center">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#1e1e2a]"></span>
                    </div>
                    <div className="flex-1 pb-5">
                      <p className="m-0 font-['Outfit',sans-serif] font-semibold text-[15px] text-[#9090B0]">B.E. Electronics</p>
                      <p className="m-0 mt-1 font-['Outfit',sans-serif] font-light text-[13px] text-slate-600 dark:text-[#9090b0]">Final milestone · Engineering degree and first role</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Divider */}
      <div
        className="w-[1px] shrink-0 bg-[#272735] relative cursor-col-resize group"
        onMouseDown={() => setIsResizing(0)}
      >
        <div className={`absolute inset-y-0 -left-1.5 -right-1.5 z-30 ${isResizing === 0 ? 'bg-[#3355f6]/50' : 'group-hover:bg-white/10'} transition-colors`} />
      </div>

      {/* ================= RSA ENGINE ================= */}
      <section className="relative flex flex-col shrink min-w-0 transition-none" style={{ width: `${isWorklabOpen ? 100 - canvasWidth - worklabWidth : 100 - canvasWidth}%` }}>

        {/* Worklab Toggle Button (on border) */}
        <button
          type="button"
          className={`absolute z-30 top-0 right-0 p-0 bg-transparent border-0 cursor-pointer flex items-center justify-center hover:opacity-80 transition-transform ${isWorklabOpen ? 'translate-x-1/2' : ''}`}
          onClick={() => setIsWorklabOpen(!isWorklabOpen)}
        >
          <img src={iconWorklab} alt="Toggle Worklab" className={`w-[38px] h-[39px] transition-transform duration-300 ${isWorklabOpen ? '-scale-x-100' : ''}`} />
        </button>

        {/* Engine Header */}
        <div className="flex items-center gap-2 pt-7 px-6 lg:px-10">
          <img src={iconBotSmall} alt="" className="w-3.5 h-3.5" />
          <span className="font-['Outfit',sans-serif] font-semibold text-[12px] tracking-[0.12em]">
            <span className="text-[#5bb947]">RSA ENGINE</span>
            <span className="text-slate-900 dark:text-white mx-1.5">•</span>
            <span className="text-slate-900 dark:text-white">Active</span>
          </span>
        </div>

        {/* Engine Scroll Area */}
        <div className="flex-1 overflow-y-auto px-6 pt-10 pb-4 lg:px-10 lg:pt-10">

          {messages.length === 0 ? (
            <>
              <div className="flex flex-col items-center">
                <img src={iconBotLarge} alt="" className="w-16 h-16" />
                <h2 className="mt-5 font-['Outfit',sans-serif] font-semibold text-[20px] text-slate-900 dark:text-white">RSA Engine is ready</h2>
                <p className="mt-4 max-w-[520px] text-center font-['Outfit',sans-serif] font-light text-[14px] leading-[1.5] text-slate-600 dark:text-[#9090b0]">
                  Based on your interests, achievements, skills, and learning profile, here are a few career paths that may suit your strengths.
                </p>
              </div>

              <div className="mt-10 grid gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                <button type="button" onClick={() => sendMessage('Tell me about PhD in Physics', 'PhD in Physics')} className="p-0 border border-slate-200 dark:border-[#1e1e2a] rounded-xl bg-slate-50 dark:bg-[#08080f] overflow-hidden cursor-pointer text-left group">
                  <div className="relative w-full h-[150px] overflow-hidden">
                    <img src={imgPhd} alt="" className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/85 via-black/40"></div>
                    <div className="absolute left-4 right-4 bottom-3.5">
                      <p className="m-0 font-['Outfit',sans-serif] font-bold text-[14px] text-white">PhD in Physics</p>
                      <p className="m-0 mt-1 font-['Outfit',sans-serif] font-light text-[13px] leading-[1.35] text-[#9090b0] line-clamp-3">Explore the mysteries of the universe.</p>
                    </div>
                  </div>
                </button>
                <button type="button" onClick={() => sendMessage('Tell me about Electronics Engineer', 'Electronics Engineer')} className="p-0 border border-slate-200 dark:border-[#1e1e2a] rounded-xl bg-slate-50 dark:bg-[#08080f] overflow-hidden cursor-pointer text-left group">
                  <div className="relative w-full h-[150px] overflow-hidden">
                    <img src={imgEng} alt="" className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/85 via-black/40"></div>
                    <div className="absolute left-4 right-4 bottom-3.5">
                      <p className="m-0 font-['Outfit',sans-serif] font-bold text-[14px] text-white">Electronics Engineer</p>
                      <p className="m-0 mt-1 font-['Outfit',sans-serif] font-light text-[13px] leading-[1.35] text-[#9090b0] line-clamp-3">Turn ideas into innovative technology.</p>
                    </div>
                  </div>
                </button>
                <button type="button" onClick={() => sendMessage('Tell me about Clinical Researcher', 'Clinical Researcher')} className="p-0 border border-slate-200 dark:border-[#1e1e2a] rounded-xl bg-slate-50 dark:bg-[#08080f] overflow-hidden cursor-pointer text-left group">
                  <div className="relative w-full h-[150px] overflow-hidden">
                    <img src={imgClinical} alt="" className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/85 via-black/40"></div>
                    <div className="absolute left-4 right-4 bottom-3.5">
                      <p className="m-0 font-['Outfit',sans-serif] font-bold text-[14px] text-white">Clinical Researcher</p>
                      <p className="m-0 mt-1 font-['Outfit',sans-serif] font-light text-[13px] leading-[1.35] text-[#9090b0] line-clamp-3">Improve lives through scientific discovery.</p>
                    </div>
                  </div>
                </button>
              </div>

              <p className="mt-8 font-['Outfit',sans-serif] font-normal text-[15px] text-slate-600 dark:text-[#9090b0] text-center md:text-left">
                Tell me more about any of these, or type your own aspiration below.
              </p>
            </>
          ) : (
            <div className="flex flex-col gap-6">
              {messages.map(msg => {
                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} className="flex justify-end gap-3">
                      <div className="max-w-[78%] text-right">
                        <div className="inline-block px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#1a1a24] border border-slate-200 dark:border-[#23232f] text-slate-900 dark:text-white font-['Outfit',sans-serif] font-normal text-[14px] leading-[1.5] text-left">
                          {msg.text}
                        </div>
                        <div className="mt-1.5 font-['Outfit',sans-serif] font-normal text-[11px] text-slate-600 dark:text-[#9090b0] tracking-[0.08em]">JUST NOW</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#3355f6] text-slate-900 dark:text-white flex items-center justify-center font-['Outfit',sans-serif] font-semibold text-[12px] shrink-0">
                        M
                      </div>
                    </div>
                  );
                }

                if (msg.sender === 'thinking') {
                  return (
                    <div key={msg.id} className="flex gap-3 items-center">
                      <img src={iconBotSmall} className="w-8 h-8 rounded-full" alt="" />
                      <div className="font-['Outfit',sans-serif] font-normal text-[14px] text-slate-600 dark:text-[#9090b0] flex items-center gap-1.5">
                        RSA Engine is thinking
                        <div className="inline-flex gap-[3px]">
                          <i className="w-[5px] h-[5px] rounded-full bg-[#9090b0] animate-[rsaBlink_1.2s_infinite_ease-in-out]"></i>
                          <i className="w-[5px] h-[5px] rounded-full bg-[#9090b0] animate-[rsaBlink_1.2s_infinite_ease-in-out_150ms]"></i>
                          <i className="w-[5px] h-[5px] rounded-full bg-[#9090b0] animate-[rsaBlink_1.2s_infinite_ease-in-out_300ms]"></i>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full flex shrink-0 items-center justify-center bg-transparent">
                      <img src={iconBotSmall} className="w-full h-full" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-['Outfit',sans-serif] text-[14px] leading-[1.6] text-slate-600 dark:text-[#9090b0]">
                        <p className="m-0 font-normal text-slate-900 dark:text-white">Based on your background and interests, I've mapped out a potential path.</p>
                        <div className="mt-[14px]">
                          <strong className="block font-bold text-slate-900 dark:text-white">{msg.role}</strong>
                          <span className="block mt-[2px] font-light text-slate-600 dark:text-[#9090b0]">Suggested Foundation Phase</span>
                        </div>
                        <ul className="mt-[10px] pl-[18px] font-light text-slate-600 dark:text-[#9090b0] list-disc marker:text-slate-600 dark:text-[#9090b0]">
                          <li className="mt-[6px]">Focus on advanced mathematics and sciences.</li>
                          <li className="mt-[6px]">Participate in practical labs and projects early on.</li>
                          <li className="mt-[6px]">Prepare for competitive entrance exams starting Class 10.</li>
                        </ul>
                        <div className="mt-[16px] font-normal text-slate-600 dark:text-[#9090b0]">
                          You need an aggregate of <strong className="text-slate-900 dark:text-white font-bold">90%+</strong> in your 10th boards to lock this stream.
                        </div>
                      </div>

                      <div className="mt-[16px] flex flex-wrap gap-[8px]">
                        <button className="px-[14px] py-[8px] rounded-full border border-slate-300 dark:border-[#2b2b3a] bg-transparent text-slate-900 dark:text-white font-['Outfit',sans-serif] font-normal text-[13px] cursor-pointer hover:bg-white/5 transition-colors">
                          Show detailed roadmap
                        </button>
                        <button
                          className="px-[14px] py-[8px] rounded-full border border-[#00494a] bg-transparent text-[#00dcdf] font-['Outfit',sans-serif] font-medium text-[13px] cursor-pointer hover:bg-[#00dcdf]/10 transition-colors"
                          onClick={() => {
                            setIsRoadmapGenerated(true);
                            if (msg.role) setPathTitle(msg.role);
                          }}
                        >
                          Add to Canvas
                        </button>
                      </div>

                      <div className="mt-2.5 font-['Outfit',sans-serif] text-[11px] text-slate-600 dark:text-[#9090b0] tracking-[0.08em]">JUST NOW</div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>
          )}

        </div>

        {/* Composer */}
        <div className="px-6 pb-5 lg:px-10 lg:pb-5 shrink-0">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-[#0f0f18] border border-[#00494a]">
            <button type="button" className="bg-transparent border-0 p-0 cursor-pointer">
              <img src={iconAttach} alt="Attach" className="w-7 h-7 block" />
            </button>
            <input
              placeholder="Ask RSA anything about your path..."
              className="flex-1 min-w-0 bg-transparent border-0 outline-none font-['Outfit',sans-serif] font-normal text-[15px] text-slate-900 dark:text-white placeholder-[#9090b0]"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') sendMessage(chatInput);
              }}
            />
            <button type="button" className="bg-transparent border-0 p-0 cursor-pointer">
              <img src={iconVoice} alt="Voice" className="w-7 h-7 block" />
            </button>
            <button
              type="button"
              className="w-9 h-9 rounded-lg border-0 bg-[#00dcdf] flex items-center justify-center cursor-pointer hover:bg-[#00dcdf]/90 transition-colors"
              onClick={() => sendMessage(chatInput)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
              </svg>
            </button>
          </div>
          <p className="mt-2.5 text-center font-['Outfit',sans-serif] font-normal text-[12px] text-slate-600 dark:text-[#9090b0]">
            RSA Engine · Powered by Right Step Ahead intelligence
          </p>
        </div>

      </section>

      {/* ================= RSA WORKLAB ================= */}
      {isWorklabOpen && (
        <>
          <div
            className="w-[1px] shrink-0 bg-[#272735] relative cursor-col-resize group"
            onMouseDown={() => setIsResizing(1)}
          >
            <div className={`absolute inset-y-0 -left-1.5 -right-1.5 z-30 ${isResizing === 1 ? 'bg-[#3355f6]/50' : 'group-hover:bg-white/10'} transition-colors`} />
          </div>
          <section className="relative flex flex-col shrink min-w-0 transition-none" style={{ width: `${worklabWidth}%` }}>

            <div className="flex items-center justify-between pt-7 px-7">
              <div className="flex items-center gap-2">
                <img src={iconRsaWorklab} alt="" className="w-3.5 h-3.5" />
                <span className="font-['Outfit',sans-serif] font-semibold text-[12px] tracking-[0.12em] text-[#5bb947]">RSA WORKLAB</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pt-6 px-7">
              <p className="m-0 font-['Outfit',sans-serif] font-normal text-[15px] leading-[1.5] text-slate-900 dark:text-white">
                Workspace to create your reports and refine aspirations through RSA chat
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5 items-center">
                <button type="button" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-transparent border border-[#3355f6] text-[#6177ff] font-['Outfit',sans-serif] font-medium text-[14px] cursor-pointer hover:bg-[#3355f6]/10">
                  <img src={iconConfigure} alt="" className="w-5 h-[18px]" />Configure
                </button>
                <button type="button" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-transparent border border-[#3355f6] text-[#6177ff] font-['Outfit',sans-serif] font-medium text-[14px] cursor-pointer hover:bg-[#3355f6]/10">
                  <img src={iconGenerate} alt="" className="w-5 h-[18px]" />Generate
                </button>
                <button type="button" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-transparent border border-[#3355f6] text-[#6177ff] font-['Outfit',sans-serif] font-medium text-[14px] cursor-pointer hover:bg-[#3355f6]/10">
                  <img src={iconStore} alt="" className="w-5 h-[18px]" />Store
                </button>
                <button type="button" className="w-[34px] h-[34px] rounded-lg bg-transparent border border-[#3355f6] text-[#6177ff] flex items-center justify-center cursor-pointer hover:bg-[#3355f6]/10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" />
                  </svg>
                </button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 pb-6">
                {[
                  { label: 'Voice Notes (2)', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6177FF" strokeWidth="1.6"><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" /></svg> },
                  { label: 'Videos (1)', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6177FF" strokeWidth="1.6"><rect x="3" y="6" width="14" height="12" rx="2" /><path d="M17 10l4-2v8l-4-2z" /></svg> },
                  { label: 'Reports (3)', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6177FF" strokeWidth="1.6"><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" strokeLinecap="round" /></svg> },
                  { label: 'Insights (4)', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6177FF" strokeWidth="1.6"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" strokeLinecap="round" /></svg> }
                ].map((item, i) => (
                  <button key={i} type="button" className="flex flex-col gap-5 p-4 rounded-xl bg-white dark:bg-[#0f0f18] border border-slate-200 dark:border-[#1e1e2a] text-left cursor-pointer hover:border-[#3355f6] transition-colors">
                    {item.icon}
                    <span className="font-['Outfit',sans-serif] font-medium text-[14px] text-slate-800 dark:text-[#e6e6ee]">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Worklab Composer */}
            <div className="px-7 pb-5 shrink-0">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-[#0f0f18] border border-[#00494a]">
                <button type="button" className="bg-transparent border-0 p-0 cursor-pointer">
                  <img src={iconAttach} alt="Attach" className="w-7 h-7 block" />
                </button>
                <input
                  placeholder="Refine your aspirations..."
                  className="flex-1 min-w-0 bg-transparent border-0 outline-none font-['Outfit',sans-serif] font-normal text-[15px] text-slate-900 dark:text-white placeholder-[#9090b0]"
                />
                <button type="button" className="bg-transparent border-0 p-0 cursor-pointer">
                  <img src={iconVoice} alt="Voice" className="w-7 h-7 block" />
                </button>
                <button type="button" className="bg-transparent border-0 p-0 cursor-pointer text-[#00dcdf]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
                  </svg>
                </button>
              </div>
            </div>

          </section>
        </>
      )}

    </div>
  );
};
