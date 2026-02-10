import React, { useState, useEffect, useRef } from 'react';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; pulse: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.01;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(171, 194, 254, ${currentOpacity})`;
        ctx.fill();

        // Draw connections
        particles.forEach((p2, j) => {
          if (j <= i) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(171, 194, 254, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Mouse glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="coming-soon-page">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="particle-canvas" />

      {/* Mouse glow */}
      <div
        className="mouse-glow"
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      />

      {/* Radial gradient overlays */}
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />

      {/* Content */}
      <div className="content-wrapper">
        {/* Logo / Brand */}
        <div className="brand-section">
          <div className="logo-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="#abc2fe" strokeWidth="2" opacity="0.3" />
              <circle cx="24" cy="24" r="14" stroke="#abc2fe" strokeWidth="2" opacity="0.5" />
              <circle cx="24" cy="24" r="6" fill="#abc2fe" opacity="0.8" />
              {/* Sound wave lines */}
              <path d="M32 18C34 20 35 22 35 24C35 26 34 28 32 30" stroke="#abc2fe" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              <path d="M36 14C39 17 41 20 41 24C41 28 39 31 36 34" stroke="#abc2fe" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            </svg>
          </div>
          <h1 className="brand-name">Voiceptionist</h1>
        </div>

        {/* Main heading */}
        <div className="hero-section">
          <div className="badge">
            <span className="badge-dot" />
            Launching Soon
          </div>
          <h2 className="hero-title">
            Something <span className="gradient-text">extraordinary</span>
            <br />is on the way
          </h2>
          <p className="hero-subtitle">
            We're building the future of AI-powered voice reception.
            <br />
            Intelligent, seamless, always available.
          </p>
        </div>

        {/* Email signup */}
        <div className="signup-section">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email for early access"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="email-input"
                />
                <button type="submit" className="submit-btn">
                  Notify Me
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 6 }}>
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          ) : (
            <div className="success-message">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: 8 }}>
                <circle cx="10" cy="10" r="9" stroke="#abc2fe" strokeWidth="2" />
                <path d="M6 10L9 13L14 7" stroke="#abc2fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              You're on the list! We'll be in touch.
            </div>
          )}
        </div>

        {/* Features preview */}
        <div className="features-preview">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#abc2fe" opacity="0.7" />
              </svg>
            </div>
            <span>24/7 Availability</span>
          </div>
          <div className="feature-divider" />
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V6z" fill="#abc2fe" opacity="0.7" />
                <path d="M17 12c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#abc2fe" opacity="0.7" />
              </svg>
            </div>
            <span>Voice AI</span>
          </div>
          <div className="feature-divider" />
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" fill="#abc2fe" opacity="0.7" />
              </svg>
            </div>
            <span>Smart Routing</span>
          </div>
        </div>

        {/* Footer */}
        <div className="footer-section">
          <p>© 2025 Voiceptionist. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default App;