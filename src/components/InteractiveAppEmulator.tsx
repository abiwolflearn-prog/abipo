import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Zap, Check, X, RotateCcw, Award, Shield, Wifi, Battery, ChevronRight, Globe } from 'lucide-react';

type AppType = 'fetena' | 'eva';

export default function InteractiveAppEmulator() {
  const [activeApp, setActiveApp] = useState<AppType>('fetena');
  const [phoneTime, setPhoneTime] = useState('12:00');

  // Fetena State
  const [lang, setLang] = useState<'EN' | 'AM'>('EN');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [streakCount, setStreakCount] = useState(14);
  const [accuracy, setAccuracy] = useState(94);

  // Eva State
  const [rating, setRating] = useState(0);
  const [evalSubmitted, setEvalSubmitted] = useState(false);
  const [evalComment, setEvalComment] = useState('');

  // Real-time phone clock syncer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setPhoneTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleFetenaAnswerClick = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleFetenaSubmit = () => {
    if (selectedAnswer === null) return;
    setQuizSubmitted(true);
    if (selectedAnswer === 1) { // Choice 'B' is correct
      setStreakCount(prev => prev + 1);
      setAccuracy(95);
    } else {
      setAccuracy(92);
    }
  };

  const resetFetena = () => {
    setSelectedAnswer(null);
    setQuizSubmitted(false);
  };

  const handleEvaSubmit = () => {
    if (rating === 0) return;
    setEvalSubmitted(true);
  };

  const resetEva = () => {
    setRating(0);
    setEvalSubmitted(false);
    setEvalComment('');
  };

  return (
    <div id="emulator" className="relative glass-panel rounded-3xl border border-[var(--border-color)] p-5 md:p-6 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute -bottom-10 right-0 w-80 h-40 bg-blue-500/5 rounded-full filter blur-[80px]" />

      <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
        
        {/* Left column: Info panel */}
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-400 animate-bounce" />
            <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest text-glow-cyan">Native Mobile Suite</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-display font-semibold text-[var(--heading-color)]">React Native & Expo App Emulator</h1>
          <p className="text-sm text-[var(--text-color)] leading-relaxed">
            Abel specializes in writing fluid, high-performance hybrid applications using <strong>React Native</strong> and <strong>Expo</strong>. Build layouts that are responsive, feature-rich, and tailored to both iOS and Android.
          </p>

          {/* Selector Tabs */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Pick Application to Run</h4>
            <div className="space-y-2">
              <button
                id="btn-app-fetena"
                onClick={() => { setActiveApp('fetena'); resetFetena(); }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                  activeApp === 'fetena'
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-[var(--contrast-light)] border-[var(--border-color)] text-[var(--text-color)] hover:border-blue-500/30'
                }`}
              >
                <div>
                  <h5 className="font-display font-medium text-sm text-[var(--heading-color)] group-hover:text-blue-550 dark:group-hover:text-blue-400 transition-colors">Fetena Pro Mobile</h5>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">High school prep exam engine with Amharic l10n support.</p>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeApp === 'fetena' ? 'translate-x-1 text-blue-500' : ''}`} />
              </button>

              <button
                id="btn-app-eva"
                onClick={() => { setActiveApp('eva'); resetEva(); }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                  activeApp === 'eva'
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-[var(--contrast-light)] border-[var(--border-color)] text-[var(--text-color)] hover:border-blue-500/30'
                }`}
              >
                <div>
                  <h5 className="font-display font-medium text-sm text-[var(--heading-color)] group-hover:text-blue-555 dark:group-hover:text-blue-400 transition-colors">Eva App (Evaluation)</h5>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Institutional feedback ecosystem for schools and universities.</p>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeApp === 'eva' ? 'translate-x-1 text-blue-500' : ''}`} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-[11px] font-mono border border-[var(--border-color)] bg-[var(--contrast-light)] text-[var(--text-color)] px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400" /> React Native Layouts
            </span>
            <span className="text-[11px] font-mono border border-[var(--border-color)] bg-[var(--contrast-light)] text-[var(--text-color)] px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 dark:bg-fuchsia-400" /> Expo OTA Routing
            </span>
            <span className="text-[11px] font-mono border border-[var(--border-color)] bg-[var(--contrast-light)] text-[var(--text-color)] px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" /> Shared Reducer State
            </span>
          </div>
        </div>

        {/* Right column: The rendered Phone mockup */}
        <div className="w-[300px] h-[580px] bg-neutral-950 rounded-[44px] border-[10px] border-neutral-800 relative shadow-[0_25px_50px_-12px_rgba(139,92,246,0.15)] flex flex-col overflow-hidden shrink-0">
          
          {/* Top Speaker Bezel & Camera notch */}
          <div className="absolute top-0 inset-x-0 h-6 bg-neutral-800 flex justify-center items-center z-30">
            <div className="w-16 h-4 bg-black rounded-full flex items-center justify-around px-2">
              <div className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
              <div className="w-6 h-1 bg-neutral-800 rounded-full" />
            </div>
          </div>

          {/* Top Bar Indicators */}
          <div className="pt-7 px-5 pb-2 bg-neutral-950 text-white flex justify-between items-center text-[10px] font-mono z-20 shrink-0">
            <span>{phoneTime}</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-neutral-300" />
              <span className="text-[8px] bg-violet-500/20 text-violet-400 font-bold px-1 rounded">5G</span>
              <Battery className="w-3.5 h-3.5 text-neutral-300" />
            </div>
          </div>

          {/* Dynamic App Screens Canvas */}
          <div className="flex-1 bg-neutral-950 text-neutral-100 flex flex-col p-4 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeApp === 'fetena' ? (
                <motion.div
                  key="fetena-app"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: -20 }}
                  className="h-full flex flex-col"
                >
                  {/* App Header */}
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-2.5 mb-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-[9px] font-bold">F</div>
                      <span className="font-display font-medium text-xs">Fetena Pro</span>
                    </div>

                    {/* Language Toggler */}
                    <button
                      id="btn-fetena-lang"
                      onClick={() => setLang(prev => prev === 'EN' ? 'AM' : 'EN')}
                      className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded px-1.5 py-0.5 text-[8px] font-mono text-neutral-300 flex items-center gap-1"
                    >
                      <Globe className="w-2.5 h-2.5 text-violet-400" /> {lang}
                    </button>
                  </div>

                  {/* Top quick metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-3 bg-neutral-900/40 p-2 border border-neutral-900 rounded-lg">
                    <div className="text-center">
                      <span className="text-[8px] text-neutral-500 font-mono uppercase block">{lang === 'EN' ? 'Streak' : 'ቀናት'}</span>
                      <span className="text-xs font-mono font-bold text-violet-400 flex items-center justify-center gap-0.5">
                        <Zap className="w-3 h-3 fill-current" /> {streakCount}
                      </span>
                    </div>
                    <div className="text-center border-l border-neutral-900">
                      <span className="text-[8px] text-neutral-500 font-mono uppercase block">{lang === 'EN' ? 'Accuracy' : 'ውጤት'}</span>
                      <span className="text-xs font-mono font-bold text-fuchsia-400 flex items-center justify-center gap-0.5">
                        <Award className="w-3 h-3" /> {accuracy}%
                      </span>
                    </div>
                  </div>

                  {/* Exam Question Card */}
                  <div className="bg-neutral-900 border border-neutral-800/80 p-3 rounded-lg flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[8px] text-neutral-400 uppercase font-mono tracking-wider">
                          {lang === 'EN' ? 'Grade 12 Prep Exam' : 'ክፍል 12 ፈተና'}
                        </span>
                        <span className="text-[8px] bg-violet-500/20 text-violet-400 px-1 rounded">Subject: Calculus</span>
                      </div>
                      
                      <p className="text-[10px] md:text-sm text-white font-medium mb-3 leading-relaxed">
                        {lang === 'EN' 
                          ? 'What is the derivative of the composite transcendental function f(x) = ln(e^x) with respect to x?' 
                          : 'f(x) = ln(e^x) ከ x አንጻር ተዋፅኦው (derivative) የትኛው ነው?'}
                      </p>

                      {/* Multichoice checkboxes */}
                      <div className="space-y-1.5">
                        {[
                          { key: 'A', text: '0', val: 0 },
                          { key: 'B', text: '1', val: 1 },
                          { key: 'C', text: 'x', val: 2 },
                          { key: 'D', text: 'e^x', val: 3 }
                        ].map((choice, i) => {
                          const isPicked = selectedAnswer === choice.val;
                          let btnStyle = 'border-neutral-800 bg-neutral-950/50 hover:bg-neutral-900';
                          
                          if (quizSubmitted) {
                            if (choice.val === 1) { // Choice B is correct
                              btnStyle = 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400';
                            } else if (isPicked) {
                              btnStyle = 'border-red-500/50 bg-red-950/20 text-red-400';
                            }
                          } else if (isPicked) {
                            btnStyle = 'border-violet-500 bg-violet-950/20 text-violet-300';
                          }

                          return (
                            <button
                              id={`fetena-ans-${choice.key}`}
                              key={choice.key}
                              onClick={() => handleFetenaAnswerClick(choice.val)}
                              disabled={quizSubmitted}
                              className={`w-full text-left p-2 rounded-lg border text-[10px] transition-colors flex items-center gap-2 ${btnStyle}`}
                            >
                              <span className="font-bold text-[9px] text-neutral-500">{choice.key})</span>
                              <span>{choice.text}</span>
                              {quizSubmitted && choice.val === 1 && <Check className="w-3 h-3 text-emerald-400 ml-auto shrink-0" />}
                              {quizSubmitted && isPicked && choice.val !== 1 && <X className="w-3 h-3 text-red-500 ml-auto shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-3">
                      {!quizSubmitted ? (
                        <button
                          id="btn-fetena-submit-answer"
                          onClick={handleFetenaSubmit}
                          disabled={selectedAnswer === null}
                          className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold text-[10px] py-2 rounded-lg text-center transition-colors cursor-pointer"
                        >
                          {lang === 'EN' ? 'Submit Answer' : 'መልስ አስገባ'}
                        </button>
                      ) : (
                        <button
                          id="btn-fetena-reset"
                          onClick={resetFetena}
                          className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] py-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" /> {lang === 'EN' ? 'Try Another' : 'ድጋሚ ሞክር'}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="eva-app"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: -20 }}
                  className="h-full flex flex-col"
                >
                  {/* App Header */}
                  <div className="flex items-center gap-1.5 border-b border-neutral-900 pb-2.5 mb-3.5">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span className="font-display font-medium text-xs">Eva Feedback</span>
                  </div>

                  {!evalSubmitted ? (
                    <div className="space-y-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <img 
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher" 
                            alt="Teacher" 
                            className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900"
                          />
                          <div>
                            <h6 className="text-[10px] font-bold text-white leading-none">Dr. Samuel Berhanu</h6>
                            <span className="text-[8px] text-neutral-500">Computer Science Dept.</span>
                          </div>
                        </div>
                        
                        <p className="text-[9px] text-neutral-400 italic leading-relaxed">
                          Please evaluate the performance based on communication and material preparation.
                        </p>
                      </div>

                      <div className="space-y-3 bg-neutral-900/50 p-3 rounded-xl border border-neutral-900">
                        <div className="space-y-1">
                          <span className="text-[9px] text-neutral-500 uppercase font-mono">Overall Rating</span>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                onClick={() => setRating(s)}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                  rating >= s ? 'bg-emerald-500 text-white' : 'bg-neutral-800 text-neutral-600'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1 text-left">
                          <span className="text-[9px] text-neutral-500 uppercase font-mono">Comment (Optional)</span>
                          <textarea
                            value={evalComment}
                            onChange={(e) => setEvalComment(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-[10px] text-white focus:outline-none focus:border-emerald-500/50 h-16 resize-none"
                            placeholder="Share your thoughts..."
                          />
                        </div>
                      </div>

                      <button
                        id="btn-eva-submit"
                        onClick={handleEvaSubmit}
                        disabled={rating === 0}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-white font-bold text-[10px] py-2.5 rounded-lg text-center transition-colors shadow-lg shadow-emerald-500/10 mt-auto"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center gap-4 py-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                        <Award className="w-8 h-8" />
                      </div>
                      
                      <div>
                        <h6 className="text-sm font-bold text-white">Evaluation Received</h6>
                        <p className="text-[10px] text-neutral-400 mt-2 leading-relaxed px-4">
                          Your feedback has been logged in the institutional matrix anonymously.
                        </p>
                      </div>

                      <button
                        onClick={resetEva}
                        className="text-[10px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> New Evaluation
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Phone Bottom Pill bar */}
          <div className="h-4 bg-neutral-950 flex justify-center items-center shrink-0">
            <div className="w-20 h-1 bg-neutral-700/80 rounded-full" />
          </div>

        </div>

      </div>

      {/* Styled Android / App Store Download badge buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mt-8 pt-6 border-t border-neutral-800">
        <a
          id="mock-download-apk"
          href="#apk"
          onClick={(e) => e.preventDefault()}
          className="bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 flex items-center gap-2 transition-all cursor-not-allowed group opacity-75"
        >
          <div className="text-emerald-400"><Smartphone className="w-5 h-5 shrink-0" /></div>
          <div>
            <span className="text-[9px] font-mono text-neutral-500 block leading-none">Download</span>
            <span className="text-xs font-medium text-white block mt-0.5 group-hover:text-cyan-400 transition-colors">Android (APK)</span>
          </div>
        </a>

        <a
          id="mock-store-android"
          href="#playstore"
          onClick={(e) => e.preventDefault()}
          className="bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 flex items-center gap-2 transition-all cursor-not-allowed group opacity-75"
        >
          <div className="text-cyan-400"><Smartphone className="w-5 h-5 shrink-0" /></div>
          <div>
            <span className="text-[9px] font-mono text-neutral-500 block leading-none">Get it on</span>
            <span className="text-xs font-medium text-white block mt-0.5 group-hover:text-cyan-400 transition-colors">Google Play</span>
          </div>
        </a>

        <a
          id="mock-store-apple"
          href="#appstore"
          onClick={(e) => e.preventDefault()}
          className="bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 flex items-center gap-2 transition-all cursor-not-allowed group opacity-75 col-span-2 sm:col-span-1"
        >
          <div className="text-violet-400"><Smartphone className="w-5 h-5 shrink-0" /></div>
          <div>
            <span className="text-[9px] font-mono text-neutral-500 block leading-none">Download from</span>
            <span className="text-xs font-medium text-white block mt-0.5 group-hover:text-cyan-400 transition-colors">App Store</span>
          </div>
        </a>
      </div>
    </div>
  );
}
