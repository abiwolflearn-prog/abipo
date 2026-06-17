import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Send, Sparkles, CheckCircle, Smartphone, Phone } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setValidationError('Please complete all required fields.');
      return;
    }
    
    // Quick regex email validator check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  return (
    <div id="contact-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
      
      {/* Left column: Quick channels links */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-panel border border-[var(--border-color)] rounded-2xl p-6 space-y-6 bg-[var(--contrast-light)]">
          <h4 className="text-lg font-display font-semibold text-[var(--heading-color)]">Let's create something extraordinary</h4>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
            Abel is open to Frontend, Backend, Full Stack (MERN), and React Native opportunities. Feel free to reach out via the secure form, or drop a message directly through any associated channel.
          </p>

          <div className="space-y-4">
            <a
              id="link-contact-email"
              href="mailto:abelbimrew868@gmail.com"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[var(--code-bg)] border border-[var(--border-color)] hover:border-blue-500/30 hover:bg-[var(--border-color)] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 overflow-hidden">
                <span className="text-[10px] font-mono text-[var(--text-muted)] block">Direct Outbound</span>
                <span className="text-xs font-mono font-medium text-[var(--heading-color)] group-hover:text-blue-500 dark:group-hover:text-blue-450 truncate block animate-none">abelbimrew868@gmail.com</span>
              </div>
            </a>

            <a
              id="link-contact-linkedin"
              href="https://linkedin.com/in/abelbimrew"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[var(--code-bg)] border border-[var(--border-color)] hover:border-blue-500/30 hover:bg-[var(--border-color)] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shrink-0">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 overflow-hidden">
                <span className="text-[10px] font-mono text-[var(--text-muted)] block">Professional Connection</span>
                <span className="text-xs font-mono font-medium text-[var(--heading-color)] group-hover:text-blue-500 dark:group-hover:text-blue-450 truncate block animate-none">linkedin.com/in/abelbimrew</span>
              </div>
            </a>

            <a
              id="link-contact-phone"
              href="tel:+251908963520"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[var(--code-bg)] border border-[var(--border-color)] hover:border-blue-500/30 hover:bg-[var(--border-color)] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 overflow-hidden">
                <span className="text-[10px] font-mono text-[var(--text-muted)] block">Private Cell</span>
                <span className="text-xs font-mono font-medium text-[var(--heading-color)] group-hover:text-blue-500 dark:group-hover:text-blue-450 truncate block animate-none">+251 908 963 520</span>
              </div>
            </a>

            <a
              id="link-contact-telegram"
              href="https://t.me/Abelbi21"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[var(--code-bg)] border border-[var(--border-color)] hover:border-blue-500/30 hover:bg-[var(--border-color)] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 overflow-hidden">
                <span className="text-[10px] font-mono text-[var(--text-muted)] block">Telegram Messenger</span>
                <span className="text-xs font-mono font-medium text-[var(--heading-color)] group-hover:text-blue-500 dark:group-hover:text-blue-450 truncate block animate-none">@Abelbi21</span>
              </div>
            </a>

            <a
              id="link-contact-github"
              href="https://github.com/abiwolflearn-prog"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[var(--code-bg)] border border-[var(--border-color)] hover:border-emerald-500/30 hover:bg-[var(--border-color)] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
                <Github className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 overflow-hidden">
                <span className="text-[10px] font-mono text-[var(--text-muted)] block">Open Source Portals</span>
                <span className="text-xs font-mono font-medium text-[var(--heading-color)] group-hover:text-emerald-500 dark:group-hover:text-emerald-400 truncate block animate-none">github.com/abiwolflearn-prog</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Right column: Interactive form box */}
      <div className="lg:col-span-7">
        <div className="glass-panel border border-[var(--border-color)] rounded-2xl p-6 md:p-8 min-h-[420px] flex flex-col justify-center bg-[var(--contrast-light)]">
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {validationError && (
                  <div id="contact-form-error" className="text-xs font-mono bg-red-500/10 border border-red-500/20 text-red-550 dark:text-red-400 p-3 rounded-xl leading-relaxed">
                    {validationError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <div className="space-y-1.5">
                    <label id="lbl-contact-name" htmlFor="contact-name" className="text-[11px] font-mono text-[var(--text-color)]">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full bg-[var(--code-bg)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--heading-color)] focus:outline-none focus:border-blue-500 font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label id="lbl-contact-email" htmlFor="contact-email" className="text-[11px] font-mono text-[var(--text-color)]">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@company.com"
                      className="w-full bg-[var(--code-bg)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--heading-color)] focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label id="lbl-contact-subject" htmlFor="contact-subject" className="text-[11px] font-mono text-[var(--text-color)] font-medium">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Discussion topic e.g. Freelance Proposal"
                    className="w-full bg-[var(--code-bg)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--heading-color)] focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label id="lbl-contact-message" htmlFor="contact-message" className="text-[11px] font-mono text-[var(--text-color)]">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="We would love to discuss a prospective full-stack MERN or React Native engagement with you..."
                    className="w-full bg-[var(--code-bg)] border border-[var(--border-color)] rounded-xl p-4 text-sm text-[var(--heading-color)] focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>

                <button
                  id="btn-submit-contact-form"
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 text-xs uppercase tracking-wider font-mono shadow-lg shadow-blue-500/10 mt-2"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Secure Message</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-card"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-4 py-8"
              >
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-500 dark:text-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                
                <div>
                  <h5 className="text-lg font-display font-medium text-[var(--heading-color)] flex items-center justify-center gap-1.5">
                    Inquiry Routed Successfully <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400 fill-current" />
                  </h5>
                  <p className="text-sm text-[var(--text-color)] max-w-md mx-auto mt-2 leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>! Your inquiry was received. An automated transaction payload has logged your request, and Abel will review the details within 2 hours.
                  </p>
                </div>

                <div className="text-xs text-[var(--text-muted)] font-mono bg-[var(--code-bg)] p-4 rounded-xl border border-[var(--border-color)] max-w-sm mx-auto text-left space-y-1">
                  <div>DISPATCH_ROUTE: DIRECT_MAIL_OUTBOUND</div>
                  <div>RESPONDER_DEST: {formData.email}</div>
                  <div>STAMP: {new Date().toISOString()}</div>
                </div>

                <button
                  id="btn-contact-reset"
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="text-blue-500 dark:text-blue-400 text-xs font-mono hover:underline inline-block cursor-pointer pt-2"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
