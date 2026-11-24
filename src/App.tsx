import { useEffect, useState, type FormEvent, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Braces, Check, Code2,
  Download, FileText, GraduationCap, LoaderCircle, Mail, MapPin, Menu,
  MessageCircle, Sparkles, X,
} from 'lucide-react';

const email = 'abidahasan5002@gmail.com';
const cvPath = `${import.meta.env.BASE_URL}assets/Abid_Ahasan_CV.pdf`;
const socials = [
  { label: 'GitHub', href: 'https://github.com/abidahasan2903' },
  { label: 'Facebook', href: 'https://www.facebook.com/share/14wQCfYDeE4/' },
  { label: 'Instagram', href: 'https://www.instagram.com/abidahasan29' },
  { label: 'WhatsApp', href: 'https://wa.me/8801522100498' },
  { label: 'Email', href: `mailto:${email}` },
];
const navItems = [
  ['about', 'About'], ['work', 'Work'], ['toolkit', 'Toolkit'], ['journey', 'Journey'], ['contact', 'Contact'],
] as const;
const skills = [
  { name: 'Kotlin', group: 'Mobile', color: 'lime' },
  { name: 'Jetpack Compose', group: 'Mobile', color: 'lime' },
  { name: 'React Native', group: 'Mobile', color: 'cyan' },
  { name: 'React', group: 'Web', color: 'cyan' },
  { name: 'Java Swing', group: 'Desktop', color: 'violet' },
  { name: 'C / C++', group: 'Core', color: 'violet' },
  { name: 'PHP', group: 'Web', color: 'amber' },
  { name: 'MySQL', group: 'Data', color: 'amber' },
];

function SectionTitle({ index, eyebrow, title, accent }: { index: string; eyebrow: string; title: string; accent: string }) {
  return <div className="section-title"><span className="section-index">{index}</span><div><p className="eyebrow">{eyebrow}</p><h2>{title} <em>{accent}</em></h2></div></div>;
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return <div className={`social-links${compact ? ' social-links-compact' : ''}`} aria-label="Social and contact links">
    {socials.map(({ label, href }) => <a key={label} href={href} aria-label={label} title={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
      <SocialIcon label={label} size={compact ? 17 : 19} /><span className="sr-only">{label}</span>
    </a>)}
  </div>;
}

function SocialIcon({ label, size }: { label: string; size: number }) {
  if (label === 'GitHub') return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .7a11.3 11.3 0 0 0-3.58 22.02c.57.1.78-.25.78-.55v-2.12c-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.52-2.53-.29-5.19-1.27-5.19-5.64 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.12 1.17a10.85 10.85 0 0 1 5.68 0c2.17-1.48 3.12-1.17 3.12-1.17.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.07 0 4.38-2.66 5.35-5.2 5.63.41.36.77 1.05.77 2.12v3.13c0 .3.21.65.79.54A11.3 11.3 0 0 0 12 .7Z" /></svg>;
  if (label === 'Facebook') return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.4 21.7v-8.5h2.86l.43-3.32H13.4V7.76c0-.96.27-1.62 1.65-1.62h1.76V3.17c-.3-.04-1.4-.14-2.66-.14-2.64 0-4.45 1.61-4.45 4.57v2.28H6.72v3.32H9.7v8.5h3.7Z" /></svg>;
  if (label === 'Instagram') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.7" r=".7" fill="currentColor" stroke="none"/></svg>;
  if (label === 'WhatsApp') return <MessageCircle size={size} strokeWidth={1.8} aria-hidden="true" />;
  return <Mail size={size} strokeWidth={1.8} aria-hidden="true" />;
}

function CvLinks({ available, onMissing }: { available: boolean; onMissing: () => void }) {
  const href = available ? cvPath : '#cv';
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => { if (!available) { event.preventDefault(); onMissing(); } };
  return <div className="button-row cv-buttons">
    <a className="button button-primary" href={href} onClick={handleClick} target={available ? '_blank' : undefined} rel={available ? 'noreferrer' : undefined}>
      <FileText size={17} /> View CV <ArrowUpRight size={15} />
    </a>
    <a className="button button-outline" href={href} onClick={handleClick} download={available ? 'Abid_Ahasan_CV.pdf' : undefined}>
      <Download size={17} /> Download CV
    </a>
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cvAvailable, setCvAvailable] = useState(false);
  const [cvNotice, setCvNotice] = useState('');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error' | 'offline'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [mailFallback, setMailFallback] = useState('');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let active = true;
    fetch(cvPath, { method: 'HEAD', cache: 'no-store' })
      .then((response) => { if (active) setCvAvailable(response.ok); })
      .catch(() => { if (active) setCvAvailable(false); });
    return () => { active = false; };
  }, []);

  const missingCv = () => setCvNotice(`CV PDF is unavailable. Check that public/assets/Abid_Ahasan_CV.pdf exists, then reload.`);

  async function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const subject = data.subject.trim();
    const body = `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${subject}\n\n${data.message}`;
    setMailFallback(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setFormState('sending');
    setFormMessage('');
    try {
      if (!navigator.onLine) throw new Error('offline');
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: `Portfolio message: ${subject}`, _url: window.location.href }),
      });
      const result = await response.json().catch(() => ({})) as { success?: string | boolean; message?: string };
      if (!response.ok || result.success === false || result.success === 'false') throw new Error(result.message || 'The contact service could not accept this message.');
      form.reset();
      setFormState('success');
      setFormMessage('Message submitted. Thanks for reaching out!');
    } catch (error) {
      const offline = !navigator.onLine || (error instanceof Error && error.message === 'offline');
      setFormState(offline ? 'offline' : 'error');
      setFormMessage(offline ? 'You appear to be offline. Use the email fallback below.' : (error instanceof Error ? error.message : 'Something went wrong. Please try email instead.'));
    }
  }

  const fade = reduceMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } } : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } };

  return <div className="portfolio-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Abid Ahasan home"><span className="wordmark-icon">aa<span>.</span></span><span className="wordmark-label">ABID AHASAN <small>DEVELOPER PORTFOLIO</small></span></a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
        {navItems.map(([id, title]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{title}</a>)}
        <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={14} /></a>
      </nav>
    </header>

    <main id="top">
      <section className="hero section-wrap">
        <div className="hero-copy">
          <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .1 }}><span className="status-dot" /> OPEN TO BUILDING WHAT’S NEXT</motion.p>
          <motion.h1 initial={fade.initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .12 }}>
            Ideas into<br /><span className="gradient-text">useful apps.</span>
          </motion.h1>
          <motion.p className="hero-lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .32 }}>
            I’m <strong>Abid Ahasan</strong> — a Computer Science &amp; Engineering student and mobile &amp; web app developer, exploring how thoughtful software can make everyday life a little easier.
          </motion.p>
          <motion.div className="button-row hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .46 }}>
            <a className="button button-primary" href="#work">Explore my work <ArrowRight size={17} /></a>
            <a className="button button-quiet" href="#contact">Get in touch <ArrowDownRight size={17} /></a>
          </motion.div>
          <motion.div className="hero-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}><span><MapPin size={14} /> Bangladesh</span><span className="hero-foot-divider" /><span>Building with curiosity <Sparkles size={14} /></span></motion.div>
        </div>
        <motion.div className="hero-art" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .85, delay: .2 }} aria-label="Abstract orbiting developer monogram">
          <div className="art-grid" /><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" />
          <div className="orbit-core"><span>AA</span><small>BUILD / LEARN</small></div>
          <span className="orbit-tag tag-top">MOBILE <b>↗</b></span><span className="orbit-tag tag-right">WEB <b>↗</b></span><span className="orbit-tag tag-bottom">IDEAS → APPS</span>
          <span className="art-coord">23.8103° N<br />90.4125° E</span><div className="art-cross cross-a">+</div><div className="art-cross cross-b">+</div>
        </motion.div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></a>
      </section>

      <motion.section id="about" className="section-wrap content-section" initial={fade.initial} whileInView={fade.whileInView} viewport={{ once: true, margin: '-70px' }} transition={{ duration: .65 }}>
        <SectionTitle index="01" eyebrow="A LITTLE ABOUT ME" title="Curious mind." accent="Builder’s hands." />
        <div className="about-grid">
          <div className="about-copy"><p className="large-copy">I enjoy moving from <span className="text-lime">“what if?”</span> to something people can actually use.</p><p>My path runs through mobile and web development, programming fundamentals, and a steady curiosity about how technology works. I learn best by building, testing an idea, and refining it with care.</p><p>Right now, I’m creating student-focused Android apps and exploring different ways to make useful tools feel clear, capable, and welcoming.</p></div>
          <div className="about-aside"><div className="aside-card"><span className="aside-icon"><GraduationCap size={21} /></span><span className="aside-label">CURRENT CHAPTER</span><strong>Computer Science<br />&amp; Engineering</strong><small>Student · Bangladesh</small></div><div className="aside-card aside-card-accent"><span className="aside-icon"><Code2 size={21} /></span><span className="aside-label">MY APPROACH</span><strong>Build small.<br />Think deeply.</strong><small>Curiosity into practice</small></div></div>
        </div>
      </motion.section>

      <motion.section id="work" className="section-wrap content-section work-section" initial={fade.initial} whileInView={fade.whileInView} viewport={{ once: true, margin: '-70px' }} transition={{ duration: .65 }}>
        <SectionTitle index="02" eyebrow="SELECTED BUILDS" title="Useful things," accent="made real." />
        <p className="section-lede">A couple of projects where I’ve been able to bring a useful idea all the way to an Android app.</p>
        <div className="project-grid">
          <article className="project-card project-studora"><div className="project-topline"><span className="project-number">01 / STUDENT LIFE</span><span className="project-status"><span /> ANDROID APP</span></div><div className="project-graphic studora-graphic"><div className="graphic-orbit" /><div className="graphic-book"><span>ST</span></div><div className="graphic-note note-a">Plan your day <b>✓</b></div><div className="graphic-note note-b">One step at a time</div><span className="graphic-star">✳</span></div><div className="project-body"><h3>STUDORA</h3><p>A student companion for organizing notes, study routines, tasks, schedules, and daily tools — designed to keep the essentials close.</p><div className="tag-list"><span>Kotlin</span><span>Jetpack Compose</span><span>Offline-first</span></div><a className="project-link" href="https://github.com/abidahasan2903/STUDORA" target="_blank" rel="noreferrer">Explore project <ArrowUpRight size={16} /></a></div></article>
          <article className="project-card project-calcora"><div className="project-topline"><span className="project-number">02 / EVERYDAY MATH</span><span className="project-status"><span /> ANDROID APP</span></div><div className="project-graphic calcora-graphic"><div className="calc-display"><small>CALCORA / SCIENCE</small><strong>Σ x² <i>=</i> 42</strong></div><div className="calc-keys"><b>7</b><b>8</b><b>9</b><b className="key-op">÷</b><b>4</b><b>5</b><b>6</b><b className="key-op">×</b><b>1</b><b>2</b><b>3</b><b className="key-go">=</b></div><span className="calc-spark">✳</span></div><div className="project-body"><h3>CALCORA</h3><p>An offline calculator built around science, commerce, arts, student GPA tools, and everyday conversions in one place.</p><div className="tag-list"><span>Kotlin</span><span>Jetpack Compose</span><span>Offline</span></div><a className="project-link" href="https://github.com/abidahasan2903/CALCORA" target="_blank" rel="noreferrer">Explore project <ArrowUpRight size={16} /></a></div></article>
        </div>
        <div className="other-work"><span className="other-work-mark"><Braces size={20} /></span><div><span className="eyebrow">ALSO EXPLORING</span><p>React Native · Java Swing · C / C++ · PHP · MySQL</p></div><a href="https://github.com/abidahasan2903?tab=repositories" target="_blank" rel="noreferrer" aria-label="Browse all GitHub repositories"><ArrowUpRight size={18} /></a></div>
      </motion.section>

      <motion.section id="toolkit" className="section-wrap content-section toolkit-section" initial={fade.initial} whileInView={fade.whileInView} viewport={{ once: true, margin: '-70px' }} transition={{ duration: .65 }}>
        <SectionTitle index="03" eyebrow="TOOLS I REACH FOR" title="A growing" accent="toolkit." />
        <p className="section-lede">Different tools for different problems. I’m building breadth while strengthening the fundamentals beneath them.</p>
        <div className="skill-grid">{skills.map((skill, index) => <div className={`skill-tile skill-${skill.color}`} key={skill.name}><span className="skill-index">0{index + 1}</span><strong>{skill.name}</strong><span className="skill-group">{skill.group}</span><span className="skill-arrow"><ArrowUpRight size={15} /></span></div>)}</div>
        <div className="skill-note"><span className="skill-note-line" /> Always learning: clear code, thoughtful UI, and better ways to solve problems.</div>
      </motion.section>

      <motion.section id="journey" className="section-wrap content-section journey-section" initial={fade.initial} whileInView={fade.whileInView} viewport={{ once: true, margin: '-70px' }} transition={{ duration: .65 }}>
        <SectionTitle index="04" eyebrow="THE JOURNEY SO FAR" title="Learning with" accent="purpose." />
        <div className="journey-card"><div className="journey-icon"><GraduationCap size={24} /></div><div className="journey-main"><span className="eyebrow">EDUCATION</span><h3>Computer Science &amp; Engineering</h3><p>Student · Focused on programming, software development, and turning ideas into working applications.</p></div><span className="journey-year">IN PROGRESS <span>↗</span></span></div>
        <div className="journey-bottom"><span className="journey-marker"><Sparkles size={16} /></span><p><strong>Outside the code:</strong> robotics, cybersecurity, competitive programming, and learning something new.</p></div>
      </motion.section>

      <motion.section id="cv" className="section-wrap cv-section" initial={fade.initial} whileInView={fade.whileInView} viewport={{ once: true, margin: '-70px' }} transition={{ duration: .65 }}>
        <div className="cv-panel"><div className="cv-illustration"><div className="cv-sheet"><span>AA / CV</span><i /><i /><i /><b>PDF</b></div><div className="cv-orbit cv-orbit-one" /><div className="cv-orbit cv-orbit-two" /></div><div className="cv-content"><p className="eyebrow">A CLOSER LOOK</p><h2>Want the full<br /><em>story?</em></h2><p>My CV brings together my education, skills, and experience. View it in your browser or download a copy.</p><CvLinks available={cvAvailable} onMissing={missingCv} /><p className="cv-file-hint">CV file: <code>public/assets/Abid_Ahasan_CV.pdf</code></p><p className="cv-notice" role="status">{cvNotice || (!cvAvailable ? 'CV could not be found at the path above.' : 'CV ready to view or download.')}</p></div></div>
      </motion.section>

      <motion.section id="contact" className="section-wrap content-section contact-section" initial={fade.initial} whileInView={fade.whileInView} viewport={{ once: true, margin: '-70px' }} transition={{ duration: .65 }}>
        <SectionTitle index="05" eyebrow="SAY HELLO" title="Let’s make" accent="something useful." />
        <div className="contact-grid"><div className="contact-copy"><p className="large-copy">Have an idea, a question, or a project in mind?</p><p>I’d love to hear about it. Send a note here, or reach out on whichever channel works best for you.</p><SocialLinks /><a className="email-line" href={`mailto:${email}`}><Mail size={17} /> {email} <ArrowUpRight size={15} /></a>
          <a className="phone-line" href="https://wa.me/8801522100498" target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp · +880 1522-100498 <ArrowUpRight size={14} /></a><div className="contact-location"><MapPin size={16} /> Narsingdi, Dhaka, Bangladesh</div></div>
          <div className="contact-form-card"><div className="form-card-top"><span className="form-code">MESSAGE / 001</span><span className="form-live"><span /> DIRECT EMAIL</span></div><form id="contact-form" onSubmit={handleContact}>
            <label>Your name<input name="name" type="text" autoComplete="name" placeholder="How should I address you?" required maxLength={100} /></label>
            <label>Your email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label>
            <label>Subject<input name="subject" type="text" placeholder="What’s on your mind?" required maxLength={150} /></label>
            <label>Your message<textarea name="message" rows={4} placeholder="Tell me a little about it..." required minLength={10} maxLength={5000} /></label>
            <label className="honeypot" aria-hidden="true">Leave this field empty<input name="_honey" type="text" tabIndex={-1} autoComplete="off" /></label>
            <button className="button button-primary send-button" type="submit" disabled={formState === 'sending'}>{formState === 'sending' ? <><LoaderCircle className="spinner" size={17} /> Sending…</> : <>Send message <ArrowUpRight size={17} /></>}</button>
            <div className={`form-feedback ${formState}`} aria-live="polite" role="status">{formState === 'success' && <Check size={16} />}{formMessage}{(formState === 'offline' || formState === 'error') && <a href={mailFallback}>Open your email app <ArrowUpRight size={13} /></a>}</div>
          </form><p className="activation-note">First test submission sends a one-time FormSubmit activation email to {email}.</p></div>
        </div>
      </motion.section>
    </main>

    <footer className="site-footer"><a className="footer-mark" href="#top">aa<span>.</span></a><span>Built with curiosity &amp; care · © {new Date().getFullYear()} Abid Ahasan</span><SocialLinks compact /></footer>
  </div>;
}

export default App;
