// GlobalStyles.tsx
// Estilos globales: fuentes, variables CSS, animaciones, clases utilitarias
// y media queries responsive. Se renderiza UNA sola vez en ShayaCafe.tsx.

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');

    :root {
      --display : 'Libre Baskerville', Georgia, serif;
      --sans    : 'Outfit', sans-serif;
      --cream   : #F9F5EF;
      --ivory   : #F0E9DC;
      --terra   : #C07B52;
      --moss    : #5A8270;
      --espresso: #271409;
      --mocha   : #6B3F22;
      --latte   : #D9C9B0;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html  { scroll-behavior: smooth; }
    body  {
      font-family: var(--sans);
      background: var(--cream);
      color: var(--espresso);
      -webkit-font-smoothing: antialiased;
    }
    ::selection { background: var(--terra); color: #fff; }

    /* ── Nav link underline ──────────────────── */
    .nl {
      position: relative;
      font-family: var(--sans);
      font-size: .78rem; font-weight: 600;
      letter-spacing: .13em; text-transform: uppercase;
      cursor: pointer; text-decoration: none;
      transition: color .3s;
      padding-bottom: 3px;
    }
    .nl::after {
      content: '';
      position: absolute; bottom: 0; left: 0;
      height: 1.5px; width: 0;
      background: var(--terra);
      transition: width .35s cubic-bezier(.4,0,.2,1);
    }
    .nl:hover::after { width: 100%; }

    /* ── Hero animations ─────────────────────── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(44px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .a1 { animation: fadeUp .95s cubic-bezier(.16,1,.3,1) .10s both; }
    .a2 { animation: fadeUp .95s cubic-bezier(.16,1,.3,1) .27s both; }
    .a3 { animation: fadeUp .95s cubic-bezier(.16,1,.3,1) .43s both; }
    .a4 { animation: fadeUp .95s cubic-bezier(.16,1,.3,1) .57s both; }

    /* ── Scroll arrow bounce ─────────────────── */
    @keyframes bounce {
      0%,100% { transform: translateX(-50%) translateY(0); }
      50%      { transform: translateX(-50%) translateY(7px); }
    }
    .arr { animation: bounce 2.2s ease-in-out infinite; }

    /* ── Scroll reveal ───────────────────────── */
    .rev             { transition: opacity .9s ease, transform .9s ease; }
    .rev.off         { opacity: 0; transform: translateY(32px); }
    .rev.on          { opacity: 1; transform: translateY(0); }
    .d1              { transition-delay: .06s !important; }
    .d2              { transition-delay: .20s !important; }
    .d3              { transition-delay: .34s !important; }

    /* ── Mobile menu overlay ─────────────────── */
    .mobile-menu {
      position: fixed; inset: 0; z-index: 400;
      background: var(--cream);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 8px;
      transition: opacity .35s ease, transform .35s ease;
    }
    .mobile-menu.closed {
      opacity: 0; transform: translateY(-12px); pointer-events: none;
    }
    .mobile-menu.open {
      opacity: 1; transform: translateY(0); pointer-events: all;
    }
    .mob-link {
      font-family: var(--display);
      font-size: 2rem; font-weight: 700;
      color: var(--espresso); text-decoration: none; cursor: pointer;
      padding: 12px 0; letter-spacing: -.01em;
      transition: color .25s;
    }
    .mob-link:hover { color: var(--terra); }

    /* ══════════════════════════════════════════
       RESPONSIVE  ≤ 768 px
    ══════════════════════════════════════════ */
    @media (max-width: 768px) {

      /* Navbar */
      .nav-desktop-links { display: none !important; }
      .nav-desktop-cta   { display: none !important; }
      .nav-hamburger     { display: flex !important; }

      /* Hero */
      .hero-eyebrow { font-size: 9px    !important; letter-spacing: .22em !important; }
      .hero-sub     { font-size: 14px   !important; margin-bottom: 32px   !important; }
      .hero-btns    {
        flex-direction: column !important;
        width: 100% !important;
        max-width: 280px;
      }
      .hero-btns button { width: 100% !important; }

      /* Productos */
      .products-row1     { grid-template-columns: 1fr !important; gap: 20px !important; }
      .products-row2-wrap{ width: 100% !important; }

      /* Nosotros */
      .about-inner      { flex-direction: column !important; gap: 48px !important; }
      .about-photo-col  { flex: none !important; width: 100% !important; }
      .about-photo-col img { height: 300px !important; }
      .about-badge      { bottom: -14px !important; right: 16px !important; }
      .about-stats      { gap: 28px !important; flex-wrap: wrap !important; }

      /* Contacto */
      .contact-grid        { grid-template-columns: 1fr !important; gap: 10px !important; }
      .contact-tiktok-wrap { width: 100% !important; }
      .contact-footer      {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 6px !important;
      }
    }

    /* ══════════════════════════════════════════
       RESPONSIVE  ≤ 480 px
    ══════════════════════════════════════════ */
    @media (max-width: 480px) {
      .about-badge            { padding: 12px 16px !important; }
      .about-badge p:first-child { font-size: 26px !important; }
    }
  `}</style>
);

export default GlobalStyles;
