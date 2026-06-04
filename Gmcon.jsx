import { useState, useRef } from "react";
import {
  Calendar, MapPin, Ticket, BookOpen, Heart,
  Users, MessageSquare, Loader2, X, Copy,
  Shield, Clock, ChevronDown, CheckCircle
} from "lucide-react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES — injected into <head> via JSX
   ───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Barlow:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .gmc-root { font-family: 'Barlow', sans-serif; }
    .gmc-serif  { font-family: 'Playfair Display', serif; }
    .gmc-cond   { font-family: 'Barlow Condensed', sans-serif; }

    /* ── Gold shimmer text ── */
    .gold-text {
      background: linear-gradient(120deg, #F7D87A 0%, #D4A520 20%, #F0C040 40%, #C9941A 60%, #F5C842 80%, #D4A520 100%);
      background-size: 250% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: goldShimmer 5s linear infinite;
    }
    @keyframes goldShimmer {
      0%   { background-position: 0% center; }
      100% { background-position: 250% center; }
    }

    /* ── Hero decorative patterns ── */
    .hero-bg {
      background:
        repeating-linear-gradient(
          -45deg,
          transparent, transparent 18px,
          rgba(212,165,32,0.03) 18px,
          rgba(212,165,32,0.03) 19px
        ),
        linear-gradient(155deg, #1C0509 0%, #330810 35%, #1C0509 65%, #0D0205 100%);
    }
    .corner-ornament { position: absolute; width: 48px; height: 48px; border-color: rgba(212,165,32,0.35); }
    .radial-glow {
      background: radial-gradient(ellipse 60% 55% at 50% 45%,
        rgba(107,21,36,0.45) 0%, transparent 70%);
    }

    /* ── Fade-up entrance animations ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up { opacity: 0; animation: fadeUp 0.75s ease forwards; }
    .d1 { animation-delay: 0.05s; }
    .d2 { animation-delay: 0.22s; }
    .d3 { animation-delay: 0.38s; }
    .d4 { animation-delay: 0.54s; }
    .d5 { animation-delay: 0.70s; }

    /* ── CTA button ── */
    .cta-btn {
      background: linear-gradient(135deg, #C9941A 0%, #F0C040 50%, #C9941A 100%);
      background-size: 200% auto;
      color: #1C0509;
      border: none;
      cursor: pointer;
      transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .cta-btn:hover {
      background-position: right center;
      transform: translateY(-3px);
      box-shadow: 0 14px 38px rgba(212,165,32,0.45);
    }
    .cta-btn:active { transform: translateY(-1px); }

    /* Pulse ring on CTA */
    @keyframes pulseRing {
      0%,100% { box-shadow: 0 0 0 0 rgba(212,165,32,0.5); }
      50%      { box-shadow: 0 0 0 14px rgba(212,165,32,0); }
    }
    .pulse-ring { animation: pulseRing 2.2s ease-in-out infinite; }

    /* ── Scroll bounce ── */
    @keyframes scrollBounce {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(7px); }
    }
    .scroll-bounce { animation: scrollBounce 2s ease-in-out infinite; }

    /* ── Meta info cards ── */
    .meta-card { transition: transform 0.28s ease, border-color 0.28s ease; }
    .meta-card:hover { transform: translateY(-4px); border-color: rgba(212,165,32,0.55) !important; }

    /* ── Highlight feature cards ── */
    .hl-card { transition: transform 0.28s ease, box-shadow 0.28s ease; }
    .hl-card:hover { transform: translateY(-5px); box-shadow: 0 22px 50px rgba(74,14,26,0.14); }

    /* ── Form inputs ── */
    .f-input {
      width: 100%;
      background: rgba(255,255,255,0.055);
      border: 1.5px solid rgba(255,255,255,0.11);
      color: #FAF6F0;
      border-radius: 10px;
      padding: 13px 16px;
      font-family: 'Barlow', sans-serif;
      font-size: 15px;
      transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
    }
    .f-input::placeholder { color: rgba(250,246,240,0.32); }
    .f-input:focus {
      outline: none;
      border-color: #D4A520;
      background: rgba(255,255,255,0.08);
      box-shadow: 0 0 0 3px rgba(212,165,32,0.14);
    }
    .f-input.has-error { border-color: #E05252 !important; }

    /* ── Submit button ── */
    .submit-btn {
      width: 100%;
      padding: 16px;
      border-radius: 12px;
      border: none;
      background: linear-gradient(135deg, #C9941A 0%, #F0C040 50%, #C9941A 100%);
      background-size: 200% auto;
      color: #1C0509;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .submit-btn:hover:not(:disabled) {
      background-position: right center;
      transform: translateY(-2px);
      box-shadow: 0 14px 38px rgba(212,165,32,0.42);
    }
    .submit-btn:disabled { opacity: 0.75; cursor: not-allowed; }

    /* ── Spinner ── */
    @keyframes spin { to { transform: rotate(360deg); } }
    .spin { animation: spin 0.9s linear infinite; }

    /* ── Modal entrance ── */
    @keyframes modalIn {
      from { opacity: 0; transform: scale(0.88) translateY(18px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
    .modal-card { animation: modalIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards; }

    /* ── Animated SVG checkmark ── */
    .check-path {
      stroke-dasharray: 90;
      stroke-dashoffset: 90;
      animation: drawCheck 0.65s ease forwards 0.25s;
    }
    @keyframes drawCheck { to { stroke-dashoffset: 0; } }

    /* ── Gold divider ── */
    .gold-divider { background: linear-gradient(90deg, transparent, rgba(212,165,32,0.55), transparent); height: 1px; }

    /* ── Seats badge pulse ── */
    @keyframes seatPulse { 0%,100%{opacity:1} 50%{opacity:0.65} }
    .seat-badge { animation: seatPulse 2.5s ease-in-out infinite; }

    /* ── Responsive helpers ── */
    @media (max-width: 640px) {
      .meta-grid { grid-template-columns: 1fr !important; }
      .hl-grid   { grid-template-columns: 1fr !important; }
      .form-2col { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const HIGHLIGHTS = [
  {
    icon: BookOpen,
    title: "Teaching & Prayers",
    description:
      "Spiritually anchored sessions compulsory for business men — building an unshakeable Kingdom foundation that aligns faith with entrepreneurial purpose and ambition.",
  },
  {
    icon: Heart,
    title: "Health Talk",
    description:
      "Professional medical check-ups and expert wellness discussions to equip you physically and mentally, so you can lead at your peak capacity.",
  },
  {
    icon: Users,
    title: "Family Life",
    description:
      "In-depth teaching and interactive dialogue on family leadership — building legacy, nurturing wholesome homes, and raising the next generation of Kingdom men.",
  },
  {
    icon: MessageSquare,
    title: "Networking & Q&A",
    description:
      "Interactive sessions, open mic discussions, curated menus, and valuable connections forged with like-minded men of influence and integrity.",
  },
];

/* ─────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────── */
const genTicket = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "GMC26-";
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
};

const validate = (data) => {
  const errs = {};
  if (!data.fullName.trim()) errs.fullName = "Full name is required.";
  if (!data.email.trim()) errs.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Enter a valid email address.";
  if (!data.address.trim()) errs.address = "Contact address is required.";
  if (!data.phone.trim()) errs.phone = "Phone number is required.";
  else if (!/^[\d\s\+\-\(\)]{7,16}$/.test(data.phone.trim())) errs.phone = "Enter a valid phone number.";
  if (!data.expectations.trim()) errs.expectations = "Please share your expectations.";
  return errs;
};

/* ─────────────────────────────────────────────
   LABEL COMPONENT
   ───────────────────────────────────────────── */
const FLabel = ({ children }) => (
  <label
    style={{
      display: "block",
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "rgba(240,192,64,0.78)",
      marginBottom: 8,
    }}
  >
    {children}
  </label>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */
export default function GMCConference2026() {
  const [form, setForm] = useState({ fullName: "", email: "", address: "", phone: "", expectations: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticket, setTicket] = useState("");
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 3200));
    setTicket(genTicket());
    setSubmitting(false);
    setSuccess(true);
  };

  const copyTicket = () => {
    navigator.clipboard?.writeText(ticket);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* ── inline style constants ── */
  const burg900 = "#1C0509";
  const burg800 = "#2E0810";
  const gold400 = "#F0C040";
  const gold500 = "#D4A520";
  const cream   = "#FAF6F0";

  return (
    <>
      <GlobalStyles />
      <div className="gmc-root" style={{ background: "#0D0205", minHeight: "100vh" }}>

        {/* ════════════════════════════════════
            HERO
            ════════════════════════════════════ */}
        <section
          className="hero-bg"
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Radial glow overlay */}
          <div
            className="radial-glow"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          />

          {/* Top accent bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${gold500}, transparent)` }} />

          {/* Corner ornaments */}
          {[
            { top: 20, left: 20, borderTop: true, borderLeft: true },
            { top: 20, right: 20, borderTop: true, borderRight: true },
            { bottom: 20, left: 20, borderBottom: true, borderLeft: true },
            { bottom: 20, right: 20, borderBottom: true, borderRight: true },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 44,
                height: 44,
                top: pos.top,
                bottom: pos.bottom,
                left: pos.left,
                right: pos.right,
                borderTop: pos.borderTop ? `2px solid rgba(212,165,32,0.32)` : "none",
                borderBottom: pos.borderBottom ? `2px solid rgba(212,165,32,0.32)` : "none",
                borderLeft: pos.borderLeft ? `2px solid rgba(212,165,32,0.32)` : "none",
                borderRight: pos.borderRight ? `2px solid rgba(212,165,32,0.32)` : "none",
              }}
            />
          ))}

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              textAlign: "center",
              padding: "80px 24px 100px",
              maxWidth: 820,
              margin: "0 auto",
              width: "100%",
            }}
          >
            {/* Badge */}
            <div
              className="fade-up d1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 20px",
                borderRadius: 50,
                background: "rgba(212,165,32,0.11)",
                border: "1px solid rgba(212,165,32,0.28)",
                marginBottom: 28,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: gold500, display: "inline-block" }} />
              <span
                className="gmc-cond"
                style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: gold400 }}
              >
                Men's Conference · Ondo · 2026
              </span>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: gold500, display: "inline-block" }} />
            </div>

            {/* Main title */}
            <h1
              className="fade-up d2 gmc-serif"
              style={{
                fontSize: "clamp(1.9rem, 5vw, 3.4rem)",
                fontWeight: 900,
                color: cream,
                lineHeight: 1.15,
                marginBottom: 10,
              }}
            >
              GMC Men's Conference 2026
            </h1>

            {/* Subtitle with gold shimmer */}
            <div className="fade-up d3" style={{ marginBottom: 28 }}>
              <p
                className="gmc-serif gold-text"
                style={{
                  fontSize: "clamp(1.4rem, 3.6vw, 2.5rem)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  lineHeight: 1.2,
                }}
              >
                The Making of Kingdom Men
              </p>
            </div>

            {/* Divider */}
            <div className="fade-up d3 gold-divider" style={{ width: 100, margin: "0 auto 36px" }} />

            {/* Meta grid */}
            <div
              className="fade-up d4 meta-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                maxWidth: 740,
                margin: "0 auto 36px",
              }}
            >
              {/* Date & Time */}
              <div
                className="meta-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  padding: "18px 14px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.038)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "rgba(212,165,32,0.14)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Calendar size={18} color={gold500} />
                </div>
                <div>
                  <p className="gmc-cond" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,246,240,0.48)", marginBottom: 4 }}>Date & Time</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: cream, lineHeight: 1.3 }}>Saturday, 20th June</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 4 }}>
                    <Clock size={12} color="rgba(250,246,240,0.55)" />
                    <p style={{ fontSize: 12, color: "rgba(250,246,240,0.6)" }}>10:00 AM</p>
                  </div>
                </div>
              </div>

              {/* Venue */}
              <div
                className="meta-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  padding: "18px 14px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.038)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "rgba(212,165,32,0.14)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={18} color={gold500} />
                </div>
                <div>
                  <p className="gmc-cond" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,246,240,0.48)", marginBottom: 4 }}>Venue</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: cream, lineHeight: 1.3 }}>Willyvicky Plaza</p>
                  <p style={{ fontSize: 11, color: "rgba(250,246,240,0.55)", marginTop: 3, lineHeight: 1.4 }}>Ademulegun Rd, Ondo</p>
                </div>
              </div>

              {/* Fee */}
              <div
                className="meta-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  padding: "18px 14px",
                  borderRadius: 14,
                  background: "rgba(212,165,32,0.07)",
                  border: "1px solid rgba(212,165,32,0.28)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "rgba(212,165,32,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Ticket size={18} color={gold500} />
                </div>
                <div>
                  <p className="gmc-cond" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,246,240,0.48)", marginBottom: 4 }}>Registration</p>
                  <p className="gmc-serif" style={{ fontSize: 22, fontWeight: 900, color: gold400, lineHeight: 1 }}>₦2,000</p>
                  <span
                    className="seat-badge gmc-cond"
                    style={{
                      display: "inline-block",
                      marginTop: 6,
                      padding: "3px 10px",
                      borderRadius: 20,
                      background: "rgba(212,165,32,0.2)",
                      color: gold400,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                    }}
                  >
                    80 Seats Available
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="fade-up d5">
              <button
                onClick={scrollToForm}
                className="cta-btn pulse-ring gmc-cond"
                style={{
                  padding: "16px 40px",
                  borderRadius: 14,
                  fontSize: 17,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Secure Your Seat Now &nbsp;→
              </button>
              <p style={{ marginTop: 14, fontSize: 12, color: "rgba(250,246,240,0.38)" }}>
                Limited availability — register before 15th June to guarantee your place
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="scroll-bounce"
            style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)" }}
          >
            <ChevronDown size={22} color="rgba(212,165,32,0.45)" />
          </div>
        </section>

        {/* ════════════════════════════════════
            VENUE STRIP
            ════════════════════════════════════ */}
        <div
          style={{
            background: burg900,
            borderTop: "1px solid rgba(212,165,32,0.22)",
            borderBottom: "1px solid rgba(212,165,32,0.22)",
            padding: "14px 24px",
            textAlign: "center",
          }}
        >
          <p
            className="gmc-cond"
            style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(240,192,64,0.72)", fontWeight: 500 }}
          >
            📍&nbsp;&nbsp;Willyvicky Plaza · Former Jock Filling Station · Ademulegun Rd · M&C FM Radio Station · Ondo
          </p>
        </div>

        {/* ════════════════════════════════════
            EVENT HIGHLIGHTS
            ════════════════════════════════════ */}
        <section style={{ background: "#FAF6F0", padding: "88px 24px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>

            {/* Section header */}
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p
                className="gmc-cond"
                style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#8B2035", marginBottom: 12 }}
              >
                Conference Programme
              </p>
              <h2
                className="gmc-serif"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, color: burg900, marginBottom: 16 }}
              >
                What Awaits You
              </h2>
              <div className="gold-divider" style={{ width: 80, margin: "0 auto" }} />
            </div>

            {/* 2×2 grid */}
            <div
              className="hl-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}
            >
              {HIGHLIGHTS.map(({ icon: Icon, title, description }, i) => (
                <div
                  key={i}
                  className="hl-card"
                  style={{
                    display: "flex",
                    gap: 20,
                    padding: "28px 24px",
                    borderRadius: 18,
                    background: "#fff",
                    border: "1px solid rgba(74,14,26,0.09)",
                    boxShadow: "0 4px 22px rgba(74,14,26,0.05)",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #5C1020 0%, #8B2035 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <Icon size={22} color={gold400} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: burg900, marginBottom: 8, lineHeight: 1.25 }}>{title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: "#5A4A4E" }}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            REGISTRATION FORM
            ════════════════════════════════════ */}
        <section
          ref={formRef}
          style={{
            background: `linear-gradient(155deg, ${burg900} 0%, ${burg800} 50%, ${burg900} 100%)`,
            padding: "88px 24px 100px",
          }}
        >
          <div style={{ maxWidth: 640, margin: "0 auto" }}>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p className="gmc-cond" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: gold500, marginBottom: 12 }}>
                Secure Your Spot Today
              </p>
              <h2 className="gmc-serif" style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800, color: cream, marginBottom: 6 }}>
                Conference Registration
              </h2>
              <p className="gmc-cond" style={{ fontSize: 14, color: "rgba(250,246,240,0.45)", letterSpacing: "0.06em" }}>
                &amp; Seat Reservation
              </p>
              <div className="gold-divider" style={{ width: 80, margin: "18px auto 0" }} />
            </div>

            {/* Form card */}
            <div
              style={{
                borderRadius: 20,
                padding: "clamp(28px, 5vw, 44px)",
                background: "rgba(255,255,255,0.038)",
                border: "1px solid rgba(212,165,32,0.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

                {/* Full Name */}
                <div>
                  <FLabel>Full Name *</FLabel>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    placeholder="e.g., Sunday Anda Okatahi"
                    className={`f-input${errors.fullName ? " has-error" : ""}`}
                  />
                  {errors.fullName && <p style={{ fontSize: 12, color: "#E05252", marginTop: 6 }}>{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <FLabel>Email Address *</FLabel>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="e.g., okatahianda@gmail.com"
                    className={`f-input${errors.email ? " has-error" : ""}`}
                  />
                  {errors.email && <p style={{ fontSize: 12, color: "#E05252", marginTop: 6 }}>{errors.email}</p>}
                </div>

                {/* Address + Phone — 2 col */}
                <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  <div>
                    <FLabel>Contact Address *</FLabel>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={onChange}
                      placeholder="e.g., 48 road 1 Fagun, Ondo City"
                      className={`f-input${errors.address ? " has-error" : ""}`}
                    />
                    {errors.address && <p style={{ fontSize: 12, color: "#E05252", marginTop: 6 }}>{errors.address}</p>}
                  </div>
                  <div>
                    <FLabel>Phone Number *</FLabel>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="e.g., 09066704994"
                      className={`f-input${errors.phone ? " has-error" : ""}`}
                    />
                    {errors.phone && <p style={{ fontSize: 12, color: "#E05252", marginTop: 6 }}>{errors.phone}</p>}
                  </div>
                </div>

                {/* Expectations */}
                <div>
                  <FLabel>Your Expectations *</FLabel>
                  <textarea
                    name="expectations"
                    value={form.expectations}
                    onChange={onChange}
                    placeholder="What do you hope to learn or experience at this conference?"
                    rows={4}
                    className={`f-input${errors.expectations ? " has-error" : ""}`}
                    style={{ resize: "none" }}
                  />
                  {errors.expectations && <p style={{ fontSize: 12, color: "#E05252", marginTop: 6 }}>{errors.expectations}</p>}
                </div>

                {/* Payment Summary */}
                <div
                  style={{
                    borderRadius: 14,
                    padding: "18px 22px",
                    background: "rgba(212,165,32,0.07)",
                    border: "1.5px dashed rgba(212,165,32,0.38)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div>
                    <p className="gmc-cond" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,192,64,0.58)", marginBottom: 6 }}>
                      Registration Fee
                    </p>
                    <p className="gmc-serif" style={{ fontSize: 28, fontWeight: 900, color: gold400, lineHeight: 1 }}>₦2,000</p>
                    <p style={{ fontSize: 11, color: "rgba(250,246,240,0.38)", marginTop: 5 }}>Paystack / Flutterwave secured checkout</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "10px 16px",
                      borderRadius: 10,
                      background: "rgba(212,165,32,0.11)",
                      border: "1px solid rgba(212,165,32,0.25)",
                    }}
                  >
                    <Shield size={16} color={gold500} />
                    <span className="gmc-cond" style={{ fontSize: 12, fontWeight: 700, color: gold500, letterSpacing: "0.08em" }}>SSL Secured</span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="submit-btn"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={20} className="spin" />
                      Processing Payment…
                    </>
                  ) : (
                    <>
                      <Shield size={20} />
                      Proceed to Secure Payment
                    </>
                  )}
                </button>

                {/* Trust note */}
                <p style={{ textAlign: "center", fontSize: 11, color: "rgba(250,246,240,0.3)", lineHeight: 1.7 }}>
                  Your data is protected and will only be used for registration purposes.<br />
                  A confirmation will be sent to your email upon successful payment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            FOOTER
            ════════════════════════════════════ */}
        <footer
          style={{
            background: "#0D0205",
            borderTop: "1px solid rgba(212,165,32,0.14)",
            padding: "44px 24px",
            textAlign: "center",
          }}
        >
          <p className="gmc-serif" style={{ fontSize: 20, fontWeight: 700, color: "rgba(250,246,240,0.7)", marginBottom: 6 }}>
            GMC Men's Conference 2026
          </p>
          <p style={{ fontSize: 13, color: "rgba(250,246,240,0.32)" }}>
            The Making of Kingdom Men · Ondo, Nigeria
          </p>
          <div className="gold-divider" style={{ width: 120, margin: "24px auto 20px" }} />
          <p style={{ fontSize: 11, color: "rgba(250,246,240,0.2)", letterSpacing: "0.1em" }}>
            © 2026 GMC Men's Conference. All rights reserved.
          </p>
        </footer>

        {/* ════════════════════════════════════
            SUCCESS MODAL
            ════════════════════════════════════ */}
        {success && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              background: "rgba(13,2,5,0.92)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="modal-card"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 460,
                borderRadius: 20,
                background: burg900,
                border: "1px solid rgba(212,165,32,0.3)",
                overflow: "hidden",
              }}
            >
              {/* Gold top bar */}
              <div style={{ height: 3, background: `linear-gradient(90deg, #C9941A, ${gold400}, #C9941A)` }} />

              {/* Close */}
              <button
                onClick={() => setSuccess(false)}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "rgba(250,246,240,0.55)",
                }}
              >
                <X size={16} />
              </button>

              <div style={{ padding: "36px 32px 32px", textAlign: "center" }}>

                {/* Animated checkmark */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "rgba(212,165,32,0.1)",
                    border: "2px solid rgba(212,165,32,0.38)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 22px",
                  }}
                >
                  <svg width="44" height="44" viewBox="0 0 50 50" fill="none">
                    <polyline
                      points="10,25 22,38 42,14"
                      stroke={gold500}
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="check-path"
                    />
                  </svg>
                </div>

                {/* Heading */}
                <p className="gmc-cond" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: gold500, marginBottom: 8 }}>
                  Registration Confirmed!
                </p>
                <h3 className="gmc-serif" style={{ fontSize: 26, fontWeight: 800, color: cream, marginBottom: 10 }}>
                  Your Seat is Reserved ✓
                </h3>
                <p style={{ fontSize: 14, color: "rgba(250,246,240,0.52)", marginBottom: 26, lineHeight: 1.65 }}>
                  Welcome, <strong style={{ color: "rgba(250,246,240,0.8)" }}>{form.fullName.split(" ")[0]}</strong>!<br />
                  Your registration for GMC Men's Conference 2026 is now confirmed.
                </p>

                {/* Ticket code */}
                <div
                  style={{
                    borderRadius: 14,
                    padding: "20px 22px",
                    background: "rgba(212,165,32,0.07)",
                    border: "1.5px dashed rgba(212,165,32,0.38)",
                    marginBottom: 20,
                  }}
                >
                  <p className="gmc-cond" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(240,192,64,0.55)", marginBottom: 8 }}>
                    Your Ticket Code
                  </p>
                  <p className="gmc-cond" style={{ fontSize: 26, fontWeight: 700, letterSpacing: "0.18em", color: gold400, marginBottom: 14 }}>
                    {ticket}
                  </p>
                  <button
                    onClick={copyTicket}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "8px 18px",
                      borderRadius: 8,
                      border: `1px solid ${copied ? "rgba(72,187,120,0.4)" : "rgba(212,165,32,0.3)"}`,
                      background: copied ? "rgba(72,187,120,0.12)" : "rgba(212,165,32,0.12)",
                      color: copied ? "#48BB78" : gold500,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      letterSpacing: "0.06em",
                    }}
                  >
                    <Copy size={13} />
                    {copied ? "Copied!" : "Copy Code"}
                  </button>
                </div>

                {/* Event summary */}
                <div
                  style={{
                    borderRadius: 12,
                    padding: "16px 18px",
                    background: "rgba(255,255,255,0.028)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    textAlign: "left",
                    marginBottom: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Calendar size={14} color={gold500} />
                    <span style={{ fontSize: 13, color: "rgba(250,246,240,0.65)" }}>Saturday, 20th June 2026 &nbsp;·&nbsp; 10:00 AM</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <MapPin size={14} color={gold500} />
                    <span style={{ fontSize: 13, color: "rgba(250,246,240,0.65)" }}>Willyvicky Plaza, Ademulegun Rd, Ondo</span>
                  </div>
                </div>

                <p style={{ fontSize: 12, color: "rgba(250,246,240,0.3)", lineHeight: 1.7 }}>
                  A confirmation has been sent to{" "}
                  <span style={{ color: gold500 }}>{form.email}</span>.
                  <br />Present your ticket code at the venue entrance.
                </p>
              </div>

              {/* Gold bottom accent */}
              <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(212,165,32,0.4), transparent)` }} />
            </div>
          </div>
        )}
      </div>
    </>
  );
    }
