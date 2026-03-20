import { useState, useEffect, useRef, useCallback } from "react";

const anjaneyaImage     = "/AnjaneyaStatue.jpeg";
const anjaneyaRoofImage = "/anjaneyaroof.jpeg";
const qrCodeImage       = "/qr code.jpeg";
/* ─────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700&family=Tiro+Telugu&family=Raleway:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; -webkit-font-smoothing: antialiased; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #431407; }
  ::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 3px; }

  .font-cinzel-dec { font-family: 'Cinzel Decorative', serif; }
  .font-cinzel     { font-family: 'Cinzel', serif; }
  .font-telugu     { font-family: 'Tiro Telugu', serif; }
  .font-raleway    { font-family: 'Raleway', sans-serif; }

  @keyframes flicker {
    0%,100% { text-shadow: 0 0 20px #f97316cc, 0 0 40px #fb923c55; }
    50%     { text-shadow: 0 0 32px #ea580cee, 0 0 60px #f9731677; }
  }
  @keyframes float-y {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-10px); }
  }
  @keyframes spin-cw  { to { transform: translate(-50%,-50%) rotate(360deg);  } }
  @keyframes spin-ccw { to { transform: translate(-50%,-50%) rotate(-360deg); } }
  @keyframes pulse-dot {
    0%,100% { transform: scale(1);   opacity: .6; }
    50%     { transform: scale(1.1); opacity: 1;  }
  }
  @keyframes glow-pulse {
    0%,100% { text-shadow: 0 0 20px #fbbf24bb, 0 0 40px #f59e0b55; }
    50%     { text-shadow: 0 0 36px #fde68aff, 0 0 72px #f59e0b99; }
  }
  @keyframes ticker {
    0%   { transform: translateX(0);    }
    100% { transform: translateX(-50%); }
  }
  @keyframes shimmer-bar {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }
  @keyframes nav-shimmer {
    0%   { background-position: 0%   50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0%   50%; }
  }
  @keyframes milestone-pop {
    0%  { transform: scale(.85); opacity: 0; }
    70% { transform: scale(1.04); }
    100%{ transform: scale(1);   opacity: 1; }
  }
  @keyframes badge-bounce {
    0%,100% { transform: scale(1);    }
    50%     { transform: scale(1.18); }
  }
  @keyframes confetti-fall {
    0%   { transform: translateY(-10px) rotate(0deg);    opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg);  opacity: 0; }
  }
  @keyframes conic-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%     { transform: translateX(-6px); }
    40%     { transform: translateX(6px); }
    60%     { transform: translateX(-4px); }
    80%     { transform: translateX(4px); }
  }
  @keyframes img-zoom {
    from { transform: scale(1); }
    to   { transform: scale(1.06); }
  }

  .flame       { animation: flicker   3.5s ease-in-out infinite; }
  .float-anim  { animation: float-y   4s   ease-in-out infinite; }
  .glow-num    { animation: glow-pulse 2.5s ease-in-out infinite; }
  .pulse-dot   { animation: pulse-dot 1.6s ease-in-out infinite; }
  .shake-anim  { animation: shake .45s ease; }

  .mandala-1 {
    position: absolute; top: 50%; left: 50%;
    border-radius: 50%;
    width: min(600px, 160vw); height: min(600px, 160vw);
    border: 1px solid rgba(245,158,11,.10);
    pointer-events: none;
    animation: spin-cw 44s linear infinite;
  }
  .mandala-2 {
    position: absolute; top: 50%; left: 50%;
    border-radius: 50%;
    width: min(440px, 120vw); height: min(440px, 120vw);
    border: 1px solid rgba(251,146,60,.08);
    pointer-events: none;
    animation: spin-ccw 30s linear infinite;
  }
  .mandala-3 {
    position: absolute; top: 50%; left: 50%;
    border-radius: 50%;
    width: min(300px, 80vw); height: min(300px, 80vw);
    border: 1px solid rgba(253,186,116,.07);
    pointer-events: none;
    animation: spin-cw 20s linear infinite;
  }

  .nav-shimmer::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(245,158,11,.12), transparent);
    background-size: 200% 100%;
    animation: nav-shimmer 4s infinite;
  }

  .hero-pattern {
    position: absolute; inset: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23f59e0b' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .tracker-pattern {
    position: absolute; inset: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59e0b' fill-opacity='0.025'%3E%3Cpath d='M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30Z'/%3E%3C/g%3E%3C/svg%3E");
  }

  .img-conic-border::before {
    content: '';
    position: absolute; inset: -7px;
    border-radius: 22px;
    background: conic-gradient(from 0deg, #f59e0b, #ea580c, #fbbf24, #ea580c, #f59e0b);
    animation: conic-spin 9s linear infinite;
    z-index: -1; filter: blur(2px);
  }

  .ticker-inner {
    display: flex; white-space: nowrap;
    animation: ticker 32s linear infinite;
  }
  .ticker-inner:hover { animation-play-state: paused; }

  .prog-bar-shim::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.28), transparent);
    background-size: 200% 100%;
    animation: shimmer-bar 2.2s infinite;
  }

  .reveal { opacity: 0; transform: translateY(32px); transition: opacity .75s ease, transform .75s ease; }
  .revealed { opacity: 1; transform: none; }
  .delay-1 { transition-delay: .07s; }
  .delay-2 { transition-delay: .16s; }
  .delay-3 { transition-delay: .25s; }
  .delay-4 { transition-delay: .34s; }
  .delay-5 { transition-delay: .43s; }

  .milestone-reached {
    background: rgba(245,158,11,.11) !important;
    border-color: rgba(245,158,11,.38) !important;
    animation: milestone-pop .5s ease both;
  }
  .milestone-reached .ms-icon {
    background: rgba(245,158,11,.18) !important;
    border-color: #f59e0b !important;
    animation: badge-bounce 1s ease .3s;
  }

  .confetti-p {
    position: fixed;
    border-radius: 2px;
    animation: confetti-fall 3s ease forwards;
    z-index: 9999;
    pointer-events: none;
  }

  #float-btn {
    transform: translateY(90px);
    opacity: 0;
    transition: transform .5s cubic-bezier(.34,1.56,.64,1), opacity .5s ease, box-shadow .3s ease;
  }
  #float-btn.show   { transform: translateY(0); opacity: 1; }
  #float-btn:hover  { transform: scale(1.04) translateY(-2px); box-shadow: 0 10px 36px rgba(249,115,22,.7); }
  #float-btn:active { transform: scale(.97) translateY(0); }

  .circ-track { fill: none; stroke: rgba(255,255,255,.07); stroke-width: 13; }
  .circ-fill  {
    fill: none; stroke: url(#cGrad); stroke-width: 13;
    stroke-linecap: round;
    stroke-dasharray: 540;
    stroke-dashoffset: 540;
    transition: stroke-dashoffset 2.2s cubic-bezier(.4,0,.2,1);
  }

  .btn-donate { position: relative; overflow: hidden; }
  .btn-donate::before {
    content: '';
    position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
    transition: left .5s;
  }
  .btn-donate:hover::before { left: 100%; }

  /* Image preview modal */
  .img-preview-overlay {
    position: fixed; inset: 0; z-index: 10000;
    background: rgba(0,0,0,.92);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: fadeIn .2s ease;
  }
  @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
  .img-preview-overlay img {
    max-width: 90vw; max-height: 88vh;
    border-radius: 12px;
    border: 2px solid rgba(245,158,11,.4);
    object-fit: contain;
  }

  /* Before/After image cards */
  .ba-card { position: relative; overflow: hidden; border-radius: 16px; cursor: pointer; }
  .ba-card img { transition: transform .5s ease; display: block; width: 100%; }
  .ba-card:hover img { transform: scale(1.04); }

  /* QR section */
  .qr-glow {
    box-shadow: 0 0 0 1px rgba(245,158,11,.2),
                0 8px 32px rgba(245,158,11,.15),
                0 0 60px rgba(249,115,22,.08);
  }

  /* Password input */
  .pwd-input:focus { outline: none; border-color: rgba(245,158,11,.6) !important; box-shadow: 0 0 0 3px rgba(245,158,11,.12); }
  .pwd-error { animation: shake .45s ease; }
`;

/* ─────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────── */
const DONATE_URL        = "https://rzp.io/rzp/wPNnSwwe";
const TARGET            = 60000;
const INITIAL_COLLECTED = 9145;
const CIRCUMFERENCE     = 2 * Math.PI * 86;
const ADMIN_PASSWORD    = "Nikhil@2000";
const STORAGE_KEY_AMT   = "anjaneya_collected_v2";
const STORAGE_KEY_DATE  = "anjaneya_updated_v2";

/* ─────────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────────── */
const fmtRupee = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

function animateCount(setter, from, to, duration = 1800) {
  const start = performance.now();
  const step  = (now) => {
    const t    = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    setter(Math.round(from + (to - from) * ease));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function formatDateNow() {
  const now = new Date();
  return now.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" })
    + " " + now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

/* ─────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io  = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -28px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx  = canvas.getContext("2d");
    let raf, particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    const mkP = () => ({
      x: Math.random() * canvas.width, y: canvas.height + 8,
      size: Math.random() * 2.5 + .8,
      vy: Math.random() * 1.1 + .35, vx: (Math.random() - .5) * .5,
      op: Math.random() * .55 + .2,
      col: Math.random() > .5 ? "#fbbf24" : "#fb923c",
      life: 0, max: Math.random() * 180 + 100,
    });
    for (let i = 0; i < 28; i++) { const p = mkP(); p.y = Math.random() * canvas.height; particles.push(p); }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < .28) particles.push(mkP());
      particles = particles.filter((p) => p.life < p.max);
      particles.forEach((p) => {
        p.life++; p.y -= p.vy; p.x += p.vx;
        const a = p.op * (1 - p.life / p.max);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.col + Math.round(a * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [canvasRef]);
}

/* ─────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────── */
function Divider({ light = false }) {
  const bg = light
    ? "bg-gradient-to-r from-transparent via-amber-400 to-transparent"
    : "bg-gradient-to-r from-transparent via-amber-500 to-transparent";
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <span className={`flex-1 max-w-[72px] h-px opacity-40 ${bg}`} />
      <span className="font-telugu text-amber-500 text-xl whitespace-nowrap">✦ ఓం ✦</span>
      <span className={`flex-1 max-w-[72px] h-px opacity-55 ${bg}`} />
    </div>
  );
}

function DonateBtn({ size = "md", className = "" }) {
  const pad = size === "lg" ? "px-14 py-5 text-lg" : size === "sm" ? "px-8 py-3 text-sm" : "px-12 py-4 text-base";
  return (
    <a href={DONATE_URL} target="_blank" rel="noopener noreferrer"
      className={`btn-donate inline-flex items-center gap-2 rounded-full font-raleway font-extrabold
        tracking-wider text-white cursor-pointer
        bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700
        shadow-lg shadow-orange-500/40
        hover:shadow-xl hover:shadow-orange-500/60 hover:-translate-y-0.5
        active:scale-95 transition-all duration-300 ${pad} ${className}`}>
      🙏 &nbsp;Donate Now
    </a>
  );
}

function SectionHead({ label, title, light = false }) {
  return (
    <div className="text-center mb-11">
      <span className={`font-telugu text-xs tracking-widest uppercase mb-2 block ${light ? "text-amber-400" : "text-orange-600"}`}>
        {label}
      </span>
      <h2 className={`font-cinzel font-bold ${light ? "text-white" : "text-stone-900"}`}
        style={{ fontSize: "clamp(1.4rem,4vw,2.2rem)", lineHeight: 1.25 }}>
        {title}
      </h2>
      <Divider light={light} />
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-amber-200/40 shadow-md
      bg-white/70 backdrop-blur-md
      hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-200/40
      transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}

function ProjectCard({ icon, title, body, delay }) {
  return (
    <GlassCard className={`p-6 reveal delay-${delay}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="w-11 h-11 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-xl flex-shrink-0">
          {icon}
        </span>
        <h3 className="font-cinzel font-bold text-stone-900 text-[15px]">{title}</h3>
      </div>
      <p className="font-telugu text-stone-600 text-sm leading-[1.9]">{body}</p>
    </GlassCard>
  );
}

function StepRow({ icon, title, body, delay }) {
  return (
    <div className={`flex items-start gap-4 reveal delay-${delay}`}>
      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-amber-500
        flex items-center justify-center text-lg flex-shrink-0 shadow-md shadow-orange-300/40 relative z-10">
        {icon}
      </div>
      <GlassCard className="flex-1 p-5">
        <h3 className="font-telugu font-bold text-stone-900 text-base mb-1">{title}</h3>
        <p className="font-telugu text-stone-600 text-sm leading-[1.85]">{body}</p>
      </GlassCard>
    </div>
  );
}

function MilestoneRow({ icon, label, sub, reached }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300
      ${reached ? "milestone-reached border-amber-500/40 bg-amber-500/11" : "border-amber-500/18 bg-white/5"}`}>
      <div className={`ms-icon w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0
        border transition-all duration-300
        ${reached ? "bg-amber-500/18 border-amber-500" : "bg-white/5 border-amber-500/18"}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-telugu text-sm font-bold text-amber-100/85 truncate">{label}</p>
        <p className="font-telugu text-[11px] text-amber-300/40 mt-0.5 truncate">{sub}</p>
      </div>
      <span className={`text-lg flex-shrink-0 ${reached ? "text-amber-400" : "text-amber-500/28"}`}>
        {reached ? "✅" : "○"}
      </span>
    </div>
  );
}

/* ── Image Preview Modal ── */
function ImageModal({ src, alt, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  return (
    <div className="img-preview-overlay" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative">
        <button onClick={onClose}
          className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full bg-amber-500 text-white font-bold text-lg
            flex items-center justify-center shadow-lg hover:bg-orange-500 transition-colors">
          ✕
        </button>
        <img src={src} alt={alt} />
        <p className="font-telugu text-amber-300/60 text-xs text-center mt-3">{alt}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────── */
export default function AnjaneyyaRoofingFund() {
  /* ── tracker state ── */
  const [collected, setCollected]     = useState(0);
  const [displayAmt, setDisplayAmt]   = useState(0);
  const [lastUpdated, setLastUpdated] = useState("నవీకరించబడలేదు");
  const [floatShow, setFloatShow]     = useState(false);

  /* ── admin state ── */
  const [adminOpen, setAdminOpen]       = useState(false);
  const [pwdStep, setPwdStep]           = useState(true);   // true = show pwd, false = show amount input
  const [pwdVal, setPwdVal]             = useState("");
  const [pwdError, setPwdError]         = useState(false);
  const [inputVal, setInputVal]         = useState("");
  const [updateMsg, setUpdateMsg]       = useState(false);

  /* ── image preview ── */
  const [previewImg, setPreviewImg] = useState(null);

  /* ── refs ── */
  const canvasRef   = useRef(null);
  const circFillRef = useRef(null);
  const prevAmtRef  = useRef(0);

  /* ── hooks ── */
  useReveal();
  useParticles(canvasRef);

  /* ── floating button ── */
  useEffect(() => {
    const onScroll = () => setFloatShow(window.scrollY > 380);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── star field ── */
  useEffect(() => {
    const field = document.getElementById("star-field");
    if (!field) return;
    for (let i = 0; i < 44; i++) {
      const s  = document.createElement("div");
      const sz = Math.random() * 2 + .8;
      const op = (Math.random() * .25 + .04).toFixed(2);
      s.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;border-radius:50%;
        background:rgba(253,230,138,${op});
        top:${Math.random()*100}%;left:${Math.random()*100}%;pointer-events:none;`;
      field.appendChild(s);
    }
  }, []);

  /* ── update circle fill ── */
  const updateCircle = useCallback((amount) => {
    const pct    = Math.min(amount / TARGET * 100, 100);
    const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
    if (circFillRef.current) {
      circFillRef.current.style.strokeDashoffset = offset;
    }
  }, []);

  /* ── load saved amount ── */
  useEffect(() => {
    const savedAmt  = localStorage.getItem(STORAGE_KEY_AMT);
    const savedDate = localStorage.getItem(STORAGE_KEY_DATE);
    const amount    = savedAmt ? parseInt(savedAmt, 10) : INITIAL_COLLECTED;

    // slight delay so SVG is mounted
    const timer = setTimeout(() => {
      setCollected(amount);
      setDisplayAmt(amount);
      prevAmtRef.current = amount;
      updateCircle(amount);
      if (savedDate) setLastUpdated("నవీకరించిన తేదీ: " + savedDate);
    }, 600);

    // animate display number from 0
    const animTimer = setTimeout(() => {
      animateCount(setDisplayAmt, 0, amount, 1800);
    }, 650);

    return () => { clearTimeout(timer); clearTimeout(animTimer); };
  }, [updateCircle]);

  /* ── apply circle whenever collected changes ── */
  useEffect(() => {
    updateCircle(collected);
  }, [collected, updateCircle]);

  /* ── password check ── */
  const handlePwdSubmit = () => {
    if (pwdVal === ADMIN_PASSWORD) {
      setPwdStep(false);
      setPwdError(false);
      setPwdVal("");
    } else {
      setPwdError(true);
      setTimeout(() => setPwdError(false), 600);
    }
  };

  /* ── amount update ── */
  const handleUpdate = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val) || val < 0 || val > 10000000) return;

    const ds = formatDateNow();
    localStorage.setItem(STORAGE_KEY_AMT, String(val));
    localStorage.setItem(STORAGE_KEY_DATE, ds);

    const prev = prevAmtRef.current;
    prevAmtRef.current = val;

    setCollected(val);
    animateCount(setDisplayAmt, prev, val, 1500);
    updateCircle(val);
    setLastUpdated("నవీకరించిన తేదీ: " + ds);
    setUpdateMsg(true);

    if (val >= TARGET) fireConfetti();

    setTimeout(() => {
      setUpdateMsg(false);
      setAdminOpen(false);
      setPwdStep(true);
      setInputVal("");
    }, 2500);
  };

  /* ── close admin & reset ── */
  const closeAdmin = () => {
    setAdminOpen(false);
    setPwdStep(true);
    setPwdVal("");
    setInputVal("");
    setPwdError(false);
  };

  /* ── confetti ── */
  const fireConfetti = () => {
    const cols = ["#f59e0b","#f97316","#fde68a","#fb923c","#fff"];
    for (let i = 0; i < 64; i++) {
      const el = document.createElement("div");
      el.className = "confetti-p";
      el.style.cssText = `left:${Math.random()*100}vw;top:0;
        background:${cols[i % cols.length]};
        width:${Math.random()*8+4}px;height:${Math.random()*8+4}px;
        border-radius:${Math.random()>.5?"50%":"2px"};
        animation-duration:${Math.random()*2+2.2}s;
        animation-delay:${Math.random()*.6}s;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4200);
    }
  };

  /* ── derived ── */
  const pct       = Math.min(collected / TARGET * 100, 100);
  const remaining = Math.max(TARGET - collected, 0);
  const milestones = [
    { id:"m1", icon:"🌱", label:"₹10,000 — ప్రారంభం",         sub:"పునాది మొదటి అడుగు",            target:10000 },
    { id:"m2", icon:"🔥", label:"₹25,000 — సగం లక్ష్యం",     sub:"మొత్తంలో 42% సేకరించాము",      target:25000 },
    { id:"m3", icon:"⚡", label:"₹45,000 — దగ్గరలో ఉన్నాం!", sub:"75% పూర్తి — నిర్మాణం సమీపంలో", target:45000 },
    { id:"m4", icon:"🏆", label:"₹60,000 — లక్ష్యం సాధించాము!", sub:"నిర్మాణం ప్రారంభమవుతుంది 🙏", target:60000 },
  ];

  /* ─────── RENDER ─────── */
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* Image preview modal */}
      {previewImg && (
        <ImageModal src={previewImg.src} alt={previewImg.alt} onClose={() => setPreviewImg(null)} />
      )}

      <div className="min-h-screen bg-amber-50 text-stone-900 overflow-x-hidden">

        {/* ══ FLOATING DONATE ══ */}
        <a id="float-btn" href={DONATE_URL} target="_blank" rel="noopener noreferrer"
          className={`fixed z-[999] flex items-center gap-2 rounded-full
            font-raleway font-extrabold text-sm tracking-widest text-white
            bg-gradient-to-br from-orange-500 to-amber-600
            shadow-lg shadow-orange-500/50 px-6 py-3
            ${floatShow ? "show" : ""}`}
          style={{ bottom:"calc(24px + env(safe-area-inset-bottom))", right:20 }}>
          <span className="pulse-dot w-2 h-2 rounded-full bg-amber-200 flex-shrink-0" />
          Donate Now
        </a>

        {/* ══ TOP STRIP ══ */}
        <div className="nav-shimmer relative overflow-hidden text-center py-2 px-4"
          style={{ background:"linear-gradient(90deg,#1c0500,#431407,#7c2d12,#431407,#1c0500)", borderBottom:"1px solid rgba(245,158,11,.35)" }}>
          <p className="font-telugu text-[13px] leading-relaxed" style={{ color:"rgba(253,230,138,.85)" }}>
            🙏 జై శ్రీ రామ్ &nbsp;·&nbsp; జై ఆంజనేయ స్వామి &nbsp;·&nbsp; జై భవాని జై శివాజీ &nbsp;·&nbsp; ఓం నమో హనుమతే నమః 🙏
          </p>
        </div>

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden"
          style={{ background:"radial-gradient(ellipse at 50% 0%,#b45309 0%,#7c2d12 40%,#431407 75%,#1c0802 100%)" }}>
          <div className="hero-pattern" />
          <div className="mandala-1" /><div className="mandala-2" /><div className="mandala-3" />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto px-5 py-16 md:py-24 pb-24">
            <p className="font-telugu text-amber-200 text-sm mb-3">⚔️ ఛత్రపతి శివాజీ మహారాజ్ యువసేన ఆధ్వర్యంలో</p>
            <div className="reveal delay-1 inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 border backdrop-blur-sm"
              style={{ background:"rgba(245,158,11,.1)", borderColor:"rgba(245,158,11,.28)" }}>
              <span className="text-amber-200 text-sm">✦</span>
              <span className="font-telugu text-[13px]" style={{ color:"rgba(253,230,138,.85)" }}>పవిత్ర భక్తి — దైవ సేవ</span>
              <span className="text-amber-200 text-sm">✦</span>
            </div>
            <h1 className="flame font-cinzel-dec text-white mb-2 reveal delay-2"
              style={{ fontSize:"clamp(1.6rem,5.5vw,3rem)", lineHeight:1.22 }}>
              శ్రీ ఆంజనేయ స్వామి
            </h1>
            <h2 className="flame font-cinzel font-bold text-amber-200 mb-6 reveal delay-3"
              style={{ fontSize:"clamp(1.15rem,3.8vw,2.2rem)", lineHeight:1.3 }}>
              విగ్రహం కప్పు నిర్మాణ నిధి
            </h2>
            <Divider light />
            <p className="font-telugu text-amber-100/85 leading-loose mt-4 mb-8 mx-auto reveal delay-4"
              style={{ fontSize:"clamp(.97rem,2.5vw,1.18rem)", maxWidth:600 }}>
              "పవిత్రమైన ఆంజనేయ స్వామి విగ్రహానికి రక్షణ కల్పించే కప్పు నిర్మాణానికి మీ సహాయం అందించండి — దైవాన్ని ఎండ మరియు వర్షం నుండి కాపాడుదాం."
            </p>
            <div className="flex flex-wrap gap-3 justify-center items-center reveal delay-4">
              <DonateBtn size="md" />
              <a href="#tracker"
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 border font-raleway font-bold text-sm
                  text-amber-200 backdrop-blur-sm transition-all duration-300 hover:bg-amber-500/15"
                style={{ borderColor:"rgba(245,158,11,.45)", background:"rgba(255,255,255,.05)" }}>
                నిధుల స్థితి చూడండి ↓
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-11 reveal delay-5">
              {[["₹60K","లక్ష్యం"],["100%","నిర్మాణానికే"],["🔐","పారదర్శకం"]].map(([val,lbl],i) => (
                <div key={i} className="flex items-center gap-4">
                  {i > 0 && <span className="hidden sm:block w-px h-7 bg-amber-500/20" />}
                  <div className="text-center">
                    <p className="font-raleway font-extrabold text-amber-200 text-2xl leading-none">{val}</p>
                    <p className="font-telugu text-[12px] mt-0.5" style={{ color:"rgba(253,230,138,.5)" }}>{lbl}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ lineHeight:0 }}>
            <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full" style={{ height:72, fill:"#fffbeb", display:"block" }}>
              <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72Z" />
            </svg>
          </div>
        </section>

        {/* ══ TICKER ══ */}
        <div className="overflow-hidden py-3 border-y" style={{ background:"linear-gradient(90deg,#431407,#7c2d12,#431407)", borderColor:"rgba(245,158,11,.2)" }}>
          <div className="ticker-inner">
            {[...Array(2)].flatMap(() =>
              ["🪔 ఓం శ్రీ హనుమతే నమః","🌸 మారుతి నందన భక్తులకు జయమగుగాక","✦ జై శ్రీ రామ్ ✦",
               "🪔 ఆంజనేయ స్వామి సర్వదా రక్షించుగాక","🌸 దానం చేయువారికి శుభం కలుగుగాక","✦ జై భవాని జై శివాజీ ✦"]
            ).map((t,i) => (
              <span key={i} className="font-telugu px-8 text-sm inline-flex items-center gap-2" style={{ color:"rgba(253,230,138,.72)" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BEFORE / AFTER IMAGE SECTION
        ══════════════════════════════════════════ */}
        <section className="py-16 md:py-20 px-5 bg-amber-50">
          <div className="max-w-5xl mx-auto">
            <SectionHead label="విగ్రహం చిత్రాలు" title="ముందు మరియు తర్వాత పోలిక" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

              {/* ── BEFORE ── */}
              <div className="reveal delay-1">
                <div className="ba-card shadow-xl shadow-red-900/20 border-2 border-red-200"
                  onClick={() => setPreviewImg({ src: anjaneyaImage, alt: "శ్రీ ఆంజనేయ స్వామి — కప్పు లేకుండా" })}>
                  <div className="absolute top-3 left-3 z-10">
                    <span className="font-raleway font-extrabold text-xs tracking-wider text-white px-3 py-1.5 rounded-full shadow-lg"
                      style={{ background:"linear-gradient(135deg,#dc2626,#b91c1c)" }}>
                      ❌ కప్పు లేదు — ముందు
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-10">
                    <span className="font-telugu text-white/80 text-[11px] px-2 py-1 rounded-full"
                      style={{ background:"rgba(0,0,0,.45)" }}>
                      👆 క్లిక్ చేయండి
                    </span>
                  </div>
                  <img
                    src={anjaneyaImage}
                    alt="శ్రీ ఆంజనేయ స్వామి విగ్రహం — కప్పు లేకుండా"
                    className="w-full object-cover"
                    style={{ height: 420, objectPosition: "top center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <p className="font-telugu text-white font-bold text-sm drop-shadow">
                      ☀️ ఎండకు మరియు వర్షానికి నేరుగా గురవుతున్నారు
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 pulse-dot" />
                  <p className="font-telugu text-red-700 text-sm font-bold">ప్రస్తుత స్థితి — రక్షణ లేదు</p>
                </div>
              </div>

              {/* ── AFTER / GOAL ── */}
              <div className="reveal delay-2">
                <div className="ba-card shadow-xl shadow-green-900/20 border-2 border-amber-300"
                  onClick={() => setPreviewImg({ src: anjaneyaRoofImage, alt: "శ్రీ ఆంజనేయ స్వామి — కప్పుతో" })}>
                  <div className="absolute top-3 left-3 z-10">
                    <span className="font-raleway font-extrabold text-xs tracking-wider text-white px-3 py-1.5 rounded-full shadow-lg"
                      style={{ background:"linear-gradient(135deg,#16a34a,#15803d)" }}>
                      ✅ కప్పుతో — లక్ష్యం
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-10">
                    <span className="font-telugu text-white/80 text-[11px] px-2 py-1 rounded-full"
                      style={{ background:"rgba(0,0,0,.45)" }}>
                      👆 క్లిక్ చేయండి
                    </span>
                  </div>
                  <img
                    src={anjaneyaRoofImage}
                    alt="శ్రీ ఆంజనేయ స్వామి విగ్రహం — కప్పుతో"
                    className="w-full object-cover"
                    style={{ height: 420, objectPosition: "top center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <p className="font-telugu text-white font-bold text-sm drop-shadow">
                      🏗️ పూర్తి రక్షణతో కప్పు నిర్మాణం
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <p className="font-telugu text-green-700 text-sm font-bold">లక్ష్య స్థితి — విగ్రహం సురక్షితం</p>
                </div>
              </div>

            </div>

            {/* compare CTA */}
            <div className="mt-10 text-center reveal delay-3">
              <GlassCard className="inline-block px-8 py-5 max-w-xl">
                <p className="font-telugu text-stone-700 text-base leading-loose">
                  మన స్వామి <span className="text-red-600 font-bold">ఎండలో మాడిపోతున్నారు</span> — మీ దానంతో ఆయనను
                  <span className="text-green-700 font-bold"> సురక్షితంగా</span> ఉంచగలం. 🙏
                </p>
                <div className="mt-4">
                  <DonateBtn size="sm" />
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PROJECT CARDS
        ══════════════════════════════════════════ */}
        <section className="py-16 md:py-20 px-5" style={{ background:"linear-gradient(to bottom,#fffbeb,#fff7ed)" }}>
          <div className="max-w-5xl mx-auto">
            <SectionHead label="మా లక్ష్యం" title="కప్పు నిర్మాణ ప్రాజెక్ట్ గురించి" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ProjectCard delay="1" icon="☀️" title="సమస్య ఏమిటి?"
                body="శ్రీ ఆంజనేయ స్వామి విగ్రహం ప్రస్తుతం తెరుచుకున్న ఆకాశానికి పూర్తిగా గురవుతోంది — వేసవి ఎండ, భారీ వర్షాలు, చలికాలపు చలి అన్నీ తట్టుకోవలసి వస్తోంది." />
              <ProjectCard delay="2" icon="🏗️" title="మా ప్రణాళిక"
                body="విగ్రహానికి నేరుగా పై భాగంలో అందంగా మరియు పటిష్టంగా ఉన్న రక్షణ కప్పు (షెడ్) నిర్మించే పని ప్రణాళిక చేయబడింది — వాతావరణం నుండి పూర్తి రక్షణ కల్పిస్తూ పవిత్రతను కాపాడుతుంది." />
              <ProjectCard delay="3" icon="₹" title="అంచనా వ్యయం"
                body="కప్పు నిర్మాణానికి మొత్తం అంచనా వ్యయం ₹50,000 నుండి ₹60,000 వరకు ఉంటుంది. భక్తుల నుండి తగినంత నిధులు సేకరించిన తర్వాత పని ప్రారంభమవుతుంది." />
              <ProjectCard delay="4" icon="🙏" title="మీ సహాయం"
                body="ప్రతి భక్తుని దానం, చిన్నదైనా పెద్దదైనా, నేరుగా ఈ పవిత్ర నిర్మాణం కోసమే వినియోగించబడుతుంది. మనం కలిసి మన ప్రియమైన స్వామిని కాపాడగలం." />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            TRACKER SECTION
        ══════════════════════════════════════════ */}
        <section id="tracker" className="relative overflow-hidden py-16 md:py-20 px-5"
          style={{ background:"radial-gradient(ellipse at 30% 50%,#7c2d12 0%,#431407 42%,#1c0802 100%)" }}>
          <div className="tracker-pattern" />
          <div id="star-field" className="absolute inset-0 overflow-hidden pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="reveal delay-1">
              <SectionHead label="నేటి వరకు సేకరించిన మొత్తం" title="నిధుల సేకరణ స్థితి" light />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-11 items-start">

              {/* LEFT: circle */}
              <div className="text-center reveal delay-2">
                <div className="relative w-full max-w-[200px] mx-auto">
                  <svg viewBox="0 0 200 200" className="w-full h-auto" style={{ transform:"rotate(-90deg)" }}>
                    <defs>
                      <linearGradient id="cGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#fde68a" />
                      </linearGradient>
                    </defs>
                    <circle className="circ-track" cx="100" cy="100" r="86" />
                    <circle ref={circFillRef} className="circ-fill" cx="100" cy="100" r="86" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="glow-num font-raleway font-extrabold text-amber-200 leading-none"
                      style={{ fontSize:"clamp(1.4rem,6vw,2rem)" }}>
                      {pct.toFixed(1)}%
                    </p>
                    <p className="font-telugu text-[10px] mt-1" style={{ color:"rgba(253,230,138,.45)" }}>పూర్తైంది</p>
                  </div>
                </div>
                <p className="glow-num font-raleway font-extrabold text-amber-200 mt-4"
                  style={{ fontSize:"clamp(1.6rem,6vw,2.4rem)", letterSpacing:"-.01em" }}>
                  {fmtRupee(displayAmt)}
                </p>
                <p className="font-telugu text-[12px] mt-1" style={{ color:"rgba(253,230,138,.4)" }}>{lastUpdated}</p>
                <div className="inline-block mt-4 rounded-xl px-5 py-2.5 border"
                  style={{ background:"rgba(255,255,255,.05)", borderColor:"rgba(245,158,11,.18)" }}>
                  <p className="font-telugu text-[11px]" style={{ color:"rgba(253,230,138,.45)" }}>లక్ష్య మొత్తం</p>
                  <p className="font-raleway font-extrabold text-orange-400 text-xl">{fmtRupee(TARGET)}</p>
                </div>
              </div>

              {/* RIGHT: stats + milestones */}
              <div className="reveal delay-3">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[["మిగిలిన మొత్తం", fmtRupee(remaining), "text-orange-400"],
                    ["పురోగతి", pct.toFixed(1)+"%", "text-amber-200"]].map(([lbl,val,clr]) => (
                    <div key={lbl} className="rounded-2xl p-4 text-center border transition-all duration-300
                      hover:border-amber-500/40"
                      style={{ background:"rgba(255,255,255,.05)", borderColor:"rgba(245,158,11,.18)" }}>
                      <p className="font-telugu text-[11px] mb-1" style={{ color:"rgba(253,230,138,.45)" }}>{lbl}</p>
                      <p className={`font-raleway font-extrabold text-xl ${clr}`}>{val}</p>
                    </div>
                  ))}
                </div>
                <p className="font-telugu text-[13px] mb-3" style={{ color:"rgba(253,230,138,.55)" }}>🏆 మైలురాళ్ళు</p>
                <div className="flex flex-col gap-2">
                  {milestones.map((m) => (
                    <MilestoneRow key={m.id} icon={m.icon} label={m.label} sub={m.sub} reached={collected >= m.target} />
                  ))}
                </div>
                <div className="mt-5 text-center">
                  <DonateBtn size="sm" />
                </div>
              </div>
            </div>

            {/* linear bar */}
            <div className="mt-9 rounded-2xl p-6 border reveal delay-4"
              style={{ background:"rgba(255,255,255,.05)", borderColor:"rgba(245,158,11,.18)" }}>
              <div className="flex justify-between items-center mb-3">
                <span className="font-telugu text-[13px]" style={{ color:"rgba(253,230,138,.65)" }}>మొత్తం పురోగతి</span>
                <span className="font-raleway font-bold text-amber-200 text-[13px]">{pct.toFixed(1)}%</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,.06)" }}>
                <div className="prog-bar-shim h-full rounded-full relative overflow-hidden transition-all duration-[2200ms]"
                  style={{ width: pct + "%", background:"linear-gradient(90deg,#f97316,#fbbf24)" }} />
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-raleway font-bold text-amber-200 text-xs">{fmtRupee(displayAmt)}</span>
                <span className="font-raleway text-xs" style={{ color:"rgba(253,230,138,.38)" }}>{fmtRupee(TARGET)}</span>
              </div>
            </div>

            {/* ── ADMIN TOGGLE ── */}
            <div className="text-center mt-5">
              <button onClick={() => { setAdminOpen((v) => !v); if (adminOpen) closeAdmin(); }}
                className="font-telugu text-[13px] rounded-full px-5 py-2 border transition-all duration-200 hover:bg-amber-500/10"
                style={{ background:"rgba(255,255,255,.05)", borderColor:"rgba(245,158,11,.18)", color:"rgba(253,230,138,.5)" }}>
                🔧 మొత్తం నవీకరించండి (Admin)
              </button>
            </div>

            {/* ── ADMIN PANEL ── */}
            {adminOpen && (
              <div className="mt-4 rounded-2xl p-6 border" style={{ background:"rgba(255,255,255,.05)", borderColor:"rgba(245,158,11,.22)" }}>

                {pwdStep ? (
                  /* Password Step */
                  <>
                    <p className="font-telugu text-amber-200 text-[15px] text-center mb-2">🔐 Admin Password నమోదు చేయండి</p>
                    <p className="font-telugu text-amber-400/50 text-[11px] text-center mb-5">అధికారిక వ్యక్తులు మాత్రమే నవీకరించగలరు</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-sm mx-auto">
                      <input
                        type="password"
                        value={pwdVal}
                        onChange={(e) => setPwdVal(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handlePwdSubmit()}
                        placeholder="పాస్‌వర్డ్ నమోదు చేయండి"
                        className={`pwd-input flex-1 px-4 py-3.5 rounded-xl border outline-none font-raleway text-base text-white transition-colors ${pwdError ? "pwd-error" : ""}`}
                        style={{ background:"rgba(255,255,255,.08)", borderColor: pwdError ? "rgba(239,68,68,.7)" : "rgba(245,158,11,.3)" }}
                      />
                      <button onClick={handlePwdSubmit}
                        className="btn-donate rounded-xl px-6 py-3.5 font-raleway font-extrabold text-sm text-white border-none cursor-pointer bg-gradient-to-br from-orange-500 to-amber-600 flex-shrink-0">
                        🔓 Login
                      </button>
                    </div>
                    {pwdError && (
                      <p className="font-telugu text-red-400 text-center text-[13px] mt-3">❌ తప్పు పాస్‌వర్డ్ — మళ్ళీ ప్రయత్నించండి</p>
                    )}
                    <div className="text-center mt-3">
                      <button onClick={closeAdmin} className="font-telugu text-[12px]" style={{ color:"rgba(253,230,138,.3)" }}>రద్దు చేయండి</button>
                    </div>
                  </>
                ) : (
                  /* Amount Update Step */
                  <>
                    <div className="flex items-center justify-between mb-5">
                      <p className="font-telugu text-amber-200 text-[15px]">📝 నేటి మొత్తం నమోదు చేయండి</p>
                      <button onClick={closeAdmin} className="text-amber-500/50 hover:text-amber-400 font-bold text-xl transition-colors">✕</button>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-sm mx-auto">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 font-extrabold text-lg font-raleway pointer-events-none">₹</span>
                        <input
                          type="number"
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
                          placeholder="ఉదా: 15000"
                          className="w-full pl-8 pr-4 py-3.5 rounded-xl border outline-none font-raleway font-bold text-base text-white transition-colors"
                          style={{ background:"rgba(255,255,255,.08)", borderColor:"rgba(245,158,11,.3)" }}
                        />
                      </div>
                      <button onClick={handleUpdate}
                        className="btn-donate rounded-xl px-6 py-3.5 font-raleway font-extrabold text-sm text-white border-none cursor-pointer bg-gradient-to-br from-orange-500 to-amber-600 flex-shrink-0">
                        ✓ &nbsp;Update
                      </button>
                    </div>
                    <p className={`font-telugu text-center text-[13px] mt-3 transition-all duration-500 ${updateMsg ? "text-amber-200 opacity-100" : "opacity-0"}`}>
                      ✅ విజయవంతంగా నవీకరించబడింది!
                    </p>
                    <p className="font-telugu text-center text-[11px] mt-3" style={{ color:"rgba(253,230,138,.28)" }}>
                      💡 పేజీ మూసినా మొత్తం భద్రపరచబడుతుంది
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ lineHeight:0 }}>
            <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full" style={{ height:72, fill:"#fff7ed", display:"block" }}>
              <path d="M0,36 C360,0 720,72 1080,36 C1260,18 1380,54 1440,36 L1440,72 L0,72Z" />
            </svg>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            QR CODE PAYMENT SECTION
        ══════════════════════════════════════════ */}
        <section id="qr-donate" className="py-16 md:py-20 px-5" style={{ background:"linear-gradient(to bottom,#fff7ed,#fef3c7)" }}>
          <div className="max-w-3xl mx-auto">
            <SectionHead label="నేరుగా UPI ద్వారా దానం" title="QR కోడ్ స్కాన్ చేయండి" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

              {/* QR image */}
              <div className="text-center reveal delay-1">
                <div className="inline-block relative">
                  {/* decorative rings */}
                  <div className="absolute -inset-4 rounded-3xl border-2 border-amber-400/20 pointer-events-none" />
                  <div className="absolute -inset-8 rounded-3xl border border-amber-400/10 pointer-events-none" />

                  <div className="relative bg-white rounded-2xl p-4 qr-glow cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                    onClick={() => setPreviewImg({ src: qrCodeImage, alt: "UPI QR కోడ్ — Axis Bank" })}>
                    <img
                      src={qrCodeImage}
                      alt="UPI QR Code — Axis Bank"
                      className="rounded-xl"
                      style={{ width: 240, height: 240, objectFit: "contain" }}
                    />
                    <div className="mt-3 py-2 px-4 rounded-xl" style={{ background:"linear-gradient(135deg,#fef3c7,#fde68a)" }}>
                      <p className="font-raleway font-extrabold text-amber-900 text-sm tracking-wide">AXIS BANK — UPI</p>
                      <p className="font-telugu text-amber-700 text-[12px] mt-0.5">స్కాన్ చేసి దానం చేయండి</p>
                    </div>
                    {/* zoom hint */}
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-amber-500/80 flex items-center justify-center">
                      <span className="text-white text-xs">🔍</span>
                    </div>
                  </div>
                </div>
                <p className="font-telugu text-stone-500 text-xs mt-4">👆 పెద్దది చేసి చూడడానికి క్లిక్ చేయండి</p>
              </div>

              {/* Instructions */}
              <div className="reveal delay-2">
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background:"linear-gradient(135deg,#ea580c,#d97706)" }}>
                      📱
                    </div>
                    <div>
                      <p className="font-cinzel font-bold text-stone-900 text-[15px]">UPI తో ఎలా దానం చేయాలి?</p>
                      <p className="font-telugu text-stone-400 text-xs">చాలా సులభం — 3 అడుగులు మాత్రమే</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { step:"1", icon:"📱", title:"App తెరవండి", body:"Google Pay, PhonePe, Paytm, BHIM లేదా మీ Bank App తెరవండి" },
                      { step:"2", icon:"📷", title:"QR స్కాన్ చేయండి", body:"'Scan QR' ఆప్షన్ ఎంచుకుని ఈ కోడ్ స్కాన్ చేయండి" },
                      { step:"3", icon:"💰", title:"మొత్తం నమోదు చేయి", body:"మీకు ఇష్టమైన మొత్తం నమోదు చేసి pay చేయండి" },
                    ].map(({ step, icon, title, body }) => (
                      <div key={step} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-raleway font-extrabold text-white text-xs flex-shrink-0"
                          style={{ background:"linear-gradient(135deg,#ea580c,#d97706)" }}>
                          {step}
                        </div>
                        <div>
                          <p className="font-telugu font-bold text-stone-900 text-sm">{icon} {title}</p>
                          <p className="font-telugu text-stone-500 text-[13px] leading-relaxed mt-0.5">{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-amber-100">
                    <p className="font-telugu text-stone-500 text-[12px] text-center leading-relaxed">
                      💳 Razorpay ద్వారా కూడా దానం చేయవచ్చు (Cards / Net Banking)
                    </p>
                    <div className="mt-3 text-center">
                      <DonateBtn size="sm" />
                    </div>
                  </div>
                </GlassCard>

                {/* supported apps */}
                <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
                  {["Google Pay","PhonePe","Paytm","BHIM"].map((app) => (
                    <span key={app} className="font-raleway text-[12px] font-bold px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-900">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            STEPS SECTION
        ══════════════════════════════════════════ */}
        <section className="py-16 md:py-20 px-5 bg-amber-50">
          <div className="max-w-2xl mx-auto">
            <SectionHead label="నిర్మాణ ప్రణాళిక" title="ఇది ఎలా జరుగుతుంది?" />
            <div className="relative pl-14">
              <span className="absolute left-[21px] top-5 bottom-5 w-0.5 bg-gradient-to-b from-amber-500 to-amber-500/10 z-0" />
              <div className="flex flex-col gap-7">
                <StepRow delay="1" icon="💰" title="నిధుల సేకరణ"      body="Razorpay / UPI QR ద్వారా భక్తుల నుండి స్వచ్ఛంద దానాలు సేకరించబడతాయి. లక్ష్యం ₹60,000." />
                <StepRow delay="2" icon="📋" title="సంస్థ నమోదు"       body="అధికారిక నమోదు మరియు ఉమ్మడి బ్యాంక్ ఖాతా ఏర్పాటు సమాంతరంగా జరుగుతోంది — పూర్తి జవాబుదారీతనం కోసం." />
                <StepRow delay="3" icon="🏗️" title="నిర్మాణ ప్రారంభం"  body="తగినంత నిధులు సేకరించిన వెంటనే కప్పు నిర్మాణ పని ప్రారంభమవుతుంది. అంచనా వ్యయం ₹50,000–₹60,000." />
                <StepRow delay="4" icon="✅" title="విగ్రహం సురక్షితం" body="కప్పు నిర్మాణం పూర్తయిన తర్వాత అన్ని దాతలకు ఫోటోలతో నివేదిక పంపబడుతుంది." />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            TRANSPARENCY
        ══════════════════════════════════════════ */}
        <section className="py-16 md:py-20 px-5" style={{ background:"#fff7ed" }}>
          <div className="max-w-2xl mx-auto">
            <SectionHead label="మా నిబద్ధత" title="పూర్తి పారదర్శకత" />
            <GlassCard className="overflow-hidden reveal delay-2">
              <div className="flex items-center gap-3 px-6 py-5"
                style={{ background:"linear-gradient(135deg,#ea580c,#b45309,#92400e)" }}>
                <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center text-xl flex-shrink-0">🔐</div>
                <div>
                  <p className="font-cinzel text-white font-bold text-[15px]">మీ నిధులు ఎలా వినియోగించబడతాయి</p>
                  <p className="font-telugu text-white/55 text-xs mt-0.5">నిజాయితీగా, పారదర్శకంగా</p>
                </div>
              </div>
              <div className="p-6 space-y-0">
                {[
                  "అన్ని నిధులు బహిరంగంగా మరియు పారదర్శకంగా సేకరించబడతాయి — ప్రతి రూపాయి కేవలం కప్పు నిర్మాణానికే వినియోగించబడుతుంది.",
                  "భక్తుల ఉదారమైన సహాయంతో తగినంత నిధులు సేకరించిన వెంటనే కప్పు నిర్మాణ పని ప్రారంభమవుతుంది.",
                  "సంస్థ అధికారిక నమోదు మరియు ఉమ్మడి బ్యాంక్ ఖాతా ఏర్పాటు చేసే పనులు సమాంతరంగా జరుగుతున్నాయి.",
                  "పూర్తి నమ్మకం మరియు బహిరంగతను కాపాడేందుకు అన్ని దాతలకు పురోగతి నివేదికలు మరియు ఫోటోలు పంచుకోబడతాయి.",
                  "నిర్మాణ వ్యయానికి మించి మిగులు నిధులు ఉంటే, భవిష్యత్తు నిర్వహణ మరియు ఆలయ అభివృద్ధి కార్యక్రమాలకు వినియోగించబడతాయి.",
                ].map((text, i) => (
                  <div key={i} className={`flex items-start gap-3 py-4 ${i < 4 ? "border-b border-amber-100" : ""}`}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-raleway font-extrabold text-[12px] flex-shrink-0 mt-0.5"
                      style={{ background:"linear-gradient(135deg,#ea580c,#d97706)", minWidth:32 }}>
                      {i + 1}
                    </div>
                    <p className="font-telugu text-stone-600 text-[15px] leading-[1.9]">{text}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════ */}
        <section className="py-16 md:py-20 px-5 relative overflow-hidden" style={{ background:"linear-gradient(to bottom,#fff7ed,#fef3c7)" }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="font-telugu text-amber-400 opacity-[0.04] leading-none" style={{ fontSize:"clamp(8rem,40vw,18rem)" }}>ఓం</span>
          </div>
          <div className="relative z-10 max-w-xl mx-auto text-center reveal delay-1">
            <span className="font-telugu text-orange-600 text-xs tracking-widest uppercase block mb-2">ఇప్పుడే సహాయం చేయండి</span>
            <h2 className="font-cinzel font-bold text-stone-900 mb-3" style={{ fontSize:"clamp(1.4rem,4vw,2.2rem)" }}>
              కప్పు నిర్మాణానికి సహాయం చేయండి
            </h2>
            <Divider />
            <GlassCard className="mt-7 p-8 md:p-10 reveal delay-2">
              <div className="text-3xl mb-5 flex justify-center gap-2">🙏 🕌 🙏</div>
              <p className="font-telugu text-stone-600 text-lg leading-loose mb-8">
                చిన్నదైనా పెద్దదైనా — మీ ప్రతి సహాయం పవిత్రమైన ఆంజనేయ స్వామి విగ్రహాన్ని ఎండ మరియు వర్షం నుండి కాపాడుతుంది.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-7">
                {["₹100","₹500","₹1,000","₹5,000"].map((amt) => (
                  <a key={amt} href={DONATE_URL} target="_blank" rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full border border-amber-300 bg-amber-100 text-amber-900
                      font-raleway font-bold text-sm hover:bg-amber-200 transition-all duration-200">
                    {amt}
                  </a>
                ))}
                <a href={DONATE_URL} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full font-raleway font-bold text-sm text-white
                    bg-gradient-to-br from-orange-500 to-amber-600 hover:opacity-85 transition-all duration-200">
                  మీ ఇష్టం ↗
                </a>
              </div>
              <DonateBtn size="lg" />
              <div className="mt-5 pt-4 border-t border-amber-100">
                <p className="font-telugu text-stone-400 text-xs mb-2">లేదా QR కోడ్ ద్వారా దానం చేయండి</p>
                <a href="#qr-donate"
                  className="inline-flex items-center gap-2 font-raleway font-bold text-sm text-orange-600 hover:text-orange-700 transition-colors">
                  📷 QR కోడ్ చూడండి ↓
                </a>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════ */}
        <footer className="relative overflow-hidden text-center px-5 pt-16 pb-8"
          style={{ background:"linear-gradient(180deg,#1c1917 0%,#0a0908 100%)", paddingBottom:"calc(2rem + env(safe-area-inset-bottom))" }}>
          <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ lineHeight:0, transform:"rotate(180deg)" }}>
            <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full" style={{ height:56, fill:"#fef9c3", display:"block" }}>
              <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56Z" />
            </svg>
          </div>
          <div className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
            style={{ width:"min(500px,90vw)", height:"min(500px,90vw)", transform:"translate(-50%,-50%)", border:"1px solid rgba(245,158,11,.04)", animation:"spin-cw 70s linear infinite" }} />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="float-anim text-5xl mb-4">🕉️</div>
            <h3 className="font-cinzel-dec text-amber-500 font-bold mb-1" style={{ fontSize:"clamp(1rem,3.5vw,1.4rem)" }}>
              శ్రీ ఆంజనేయ స్వామి విగ్రహం
            </h3>
            <p className="font-raleway text-amber-300 text-sm mt-1">ఛత్రపతి శివాజీ మహారాజ్ యువసేన నిర్వహణలో</p>
            <p className="font-telugu text-amber-400/50 text-[15px] mb-6">కప్పు నిర్మాణ నిధి — దైవాన్ని రక్షిద్దాం</p>

            <div className="flex items-center justify-center gap-3 mb-6 max-w-sm mx-auto">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
              <span className="font-telugu text-amber-500/45 text-lg whitespace-nowrap">✦ ఓం ✦</span>
              <span className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["🙏 జై శ్రీ రామ్","🙏 జై ఆంజనేయ స్వామి","⚔️ జై భవాని | జై శివాజీ"].map((s,i) => (
                <span key={i} className="font-telugu text-yellow-300 font-bold text-base">{s}</span>
              ))}
            </div>

            <div className="mb-6">
              <p className="font-telugu text-amber-300 text-sm">సంప్రదించండి</p>
              <p className="font-raleway text-yellow-300 text-sm mt-1">📞 9150299458 &nbsp;|&nbsp; 📞 9133489472</p>
            </div>

            <div className="border-t border-white/6 pt-5">
              <p className="font-telugu text-stone-500 text-[13px]">
                అన్ని దానాలు పవిత్ర కార్యం కోసం స్వచ్ఛంద సహాయం.{" "}
                <a href={DONATE_URL} target="_blank" rel="noopener noreferrer"
                  className="text-amber-700 hover:text-amber-500 underline transition-colors">
                  ఇక్కడ దానం చేయండి
                </a>
              </p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}